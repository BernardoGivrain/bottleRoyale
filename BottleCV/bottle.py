import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
from PIL import Image

# Transformaciones para preparar las imágenes
transform = transforms.Compose([
    transforms.Resize((224, 224)),           
    transforms.ToTensor(),                    
    transforms.Normalize((0.5,), (0.5,))      
])

# Carga tu dataset de botellas 
train_data = datasets.ImageFolder(root='./data/train', transform=transform)
test_data = datasets.ImageFolder(root='./data/test', transform=transform)

train_loader = DataLoader(train_data, batch_size=32, shuffle=True)
test_loader = DataLoader(test_data, batch_size=32, shuffle=False)

print(f"Clases detectadas: {train_data.classes}")
# Ejemplo: ['0', '10', '20', ..., '100']

# Carga un modelo preentrenado (ResNet18)
model = models.resnet18(pretrained=True)

# Cambia la última capa para que tenga el número correcto de clases
num_classes = len(train_data.classes)
model.fc = nn.Linear(model.fc.in_features, num_classes)

# Configura pérdida y optimizador
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.0001)

# Entrenamiento
epochs = 5  # Puedes aumentar a 10 o más si tienes tiempo

for epoch in range(epochs):
    running_loss = 0.0
    model.train()
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    print(f"Época {epoch+1}/{epochs} - Pérdida: {running_loss/len(train_loader):.4f}")

print("✅ Entrenamiento completado")

# Evaluación del modelo
correct = 0
total = 0
model.eval()
with torch.no_grad():
    for images, labels in test_loader:
        outputs = model(images)
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

accuracy = 100 * correct / total
print(f"📊 Precisión en test: {accuracy:.2f}%")

# Probar una imagen individual
def predecir_imagen(ruta_imagen):
    img = Image.open(ruta_imagen).convert('RGB')
    img = transform(img).unsqueeze(0)
    model.eval()
    with torch.no_grad():
        output = model(img)
        _, pred = torch.max(output, 1)
        clase = train_data.classes[pred.item()]
        print(f"🧠 Predicción: {clase}% de llenado")

# predecir_imagen('data/test/70/bottle_70_test1.jpg')