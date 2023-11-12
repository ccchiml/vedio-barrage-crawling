from base import Generator, Discriminator
import torch.nn as nn
import torch
import torch.optim as optim
import torchvision.transforms as transforms
import torchvision.datasets as dset
from ddpm import image_generate_within_ddpm

if __name__ == "__main__":

    transform = transforms.Compose([
        transforms.Resize(32),
        transforms.CenterCrop(32),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
    ])

    trainset = dset.CIFAR10(root='./data', train=True, download=True, transform=transform)
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=64, shuffle=True, num_workers=2)

    # 初始化生成器和判别器
    netG = Generator()
    netD = Discriminator()

    # 设置损失函数和优化器
    criterion = nn.BCELoss()
    optimizerD = optim.Adam(netD.parameters(), lr=0.0002, betas=(0.5, 0.999))
    optimizerG = optim.Adam(netG.parameters(), lr=0.0002, betas=(0.5, 0.999))

    # 训练模型
    num_epochs = 10

    for epoch in range(num_epochs):
        for i, data in enumerate(trainloader, 0):

            # ===== 更新判别器
            netD.zero_grad()
            real, _ = data # 获取真实样本图片
            real = real.float()
            batch_size = real.size(0)
            label = torch.full((batch_size,), 1).float()
            output = netD(real) # 真实样本图片过判别器，得到每张图片的类别判断
            errD_real = criterion(output, label) # 真实图片类别误差损失计算
            errD_real.backward()

            gen_type = 2
            if gen_type == 1:
                # 融合方式一：串联gan的生成器和ddpm
                noise = torch.randn(batch_size, 100, 1, 1)
                fake = netG(noise)
                noise_1 = torch.randn_like(fake)
                fake = image_generate_within_ddpm(fake, noise_1)
            elif gen_type == 2:
                # 融合方式二：替代原生成器
                noise = torch.randn_like(real)
                fake = image_generate_within_ddpm(real, noise)

            label.fill_(0)
            output = netD(fake.detach())
            errD_fake = criterion(output, label)
            errD_fake.backward()
            errD = errD_real + errD_fake
            optimizerD.step()

            # 更新生成器
            netG.zero_grad()
            label.fill_(1)
            output = netD(fake)
            errG = criterion(output, label)
            errG.backward()
            optimizerG.step()

            if i%5==0:
               # 打印损失值
               print('[%d/%d][%d/%d] Loss_D: %.4f Loss_G: %.4f' % (epoch, num_epochs, i, len(trainloader), errD.item(), errG.item()))

    import matplotlib.pyplot as plt
    import numpy as np
    import torchvision
    import torch
    from torch.autograd import Variable
    def imshow(img):
        img = img / 2 + 0.5
        npimg = img.numpy()
        plt.imshow(np.transpose(npimg, (1, 2, 0)))
        plt.show()

    noise = torch.randn(64, 100, 1, 1)
    fake = netG(noise)
    imshow(torchvision.utils.make_grid(fake.detach()))
