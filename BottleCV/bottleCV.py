import cv2 as cv
import numpy as np
import os
from matplotlib import pyplot as plt

path = r'C:\Users\cami_\OneDrive\Escritorio\termomorado.jpg'

print("¿La imagen existe?:", os.path.exists(path))

if not os.path.exists(path):
    raise FileNotFoundError(f"No se encontró la imagen en la ruta: {path}")

img = cv.imread(path, cv.IMREAD_GRAYSCALE)

if img is None:
    raise ValueError("OpenCV no pudo abrir la imagen. "
                    "Verifica que no esté en la nube de OneDrive "
                    "y que sea una imagen válida (.jpg, .png, etc.)")

edges = cv.Canny(img, 100, 200)

plt.figure(figsize=(10,5))
plt.subplot(1, 2, 1)
plt.imshow(img, cmap='gray')
plt.title('Original Image')
plt.xticks([]), plt.yticks([])
plt.subplot(1, 2, 2)
plt.imshow(edges, cmap='gray')
plt.title('Edge Image')
plt.xticks([]), plt.yticks([])
plt.tight_layout()
plt.show()