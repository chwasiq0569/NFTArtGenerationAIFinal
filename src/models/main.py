import string
import random
import cv2 as cv
from fastapi import FastAPI
import numpy as np
import matplotlib.pyplot as plt
import keras
import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

model = keras.models.load_model('ganmodel.h5', compile=False)
fapp = FastAPI()


origins = ["*"]

fapp.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def saveimages(images):
    hashlist = []
    foldername = random.getrandbits(28)
    os.mkdir(str(foldername))
    for a in range(32):
        hash = random.getrandbits(28)
        hash = str(hash)
        I = (images[a] * 255).round().astype(np.uint8)
        cv.imwrite(f"{foldername}/{hash}.png", I)
        plt.imshow(I, cmap='viridis')
        plt.axis('off')
        plt.savefig(f"{foldername}/{hash}.png")

        hashlist.append(f'{hash}.png')
    return str(foldername), hashlist


@fapp.post('/')
async def app():
    imagesdata = model.predict(np.random.randn(32, 576))
    fname, hList = saveimages(imagesdata)
    return {
        'foldername': fname,
        'imagename': hList
    }

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
