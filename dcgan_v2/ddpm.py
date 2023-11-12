import torch
from unet import UNet
from denoise import DenoiseDiffusion
import torch.optim as optim

n_steps = 3 # 1000
image_channels = 3
n_channels = 64
channel_multipliers = [1, 2, 2, 4]
n_samples = 64
is_attention = [False, False, False, True]

eps_model = UNet(
            image_channels=image_channels,
            n_channels=n_channels,
            ch_mults=channel_multipliers,
            is_attn=is_attention,
        )

diffusion = DenoiseDiffusion(
            eps_model=eps_model,
            n_steps=n_steps
        )

optimizerDif = optim.Adam(eps_model.parameters(), lr=0.0002, betas=(0.5, 0.999))


def image_generate_within_ddpm(real, noise):
    batch_size = real.shape[0]
    t = torch.randint(0, n_steps, (batch_size,), dtype=torch.long)
    if noise is None:
        noise = torch.randn_like(real)
    x = diffusion.q_sample(real, t, eps=noise)
    for t_ in range(n_steps):
        t = n_steps - t_ - 1
        x = diffusion.p_sample(x, x.new_full((n_samples,), t, dtype=torch.long))
    return x