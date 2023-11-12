import torchvision.datasets as dset
import torchvision.transforms as transforms

transform = transforms.Compose([
        transforms.Resize(32),
        transforms.CenterCrop(32),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
    ])

trainset1 = dset.CIFAR10(root='./data', train=True, download=True)#, transform=transform)
trainset1
