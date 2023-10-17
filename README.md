## Overview

I have made a web app which can generate images by styling one image with another image(a paint), thus generating a new styled image which will also be saved for user reference.It also have feature for image super resolution which also be saved for user reference.Overall,its features are:-

- User can create accounts by signup
- After logging in, the information of User will be stored in local Storage so that:-
  - information of user can be kept safe
  - User dont have to login even after closing the website or browser
- User will have to submit two images to server,
  - one upon whom style has to be done
  - another image of which its styles will be extracted
- the resultant image will be shown after 5-10 seconds
- The user can view all the images generated in saved images page whose button is in pop up menu
- Super resolution of image input is also added
- the image output by Super resolution can be viewed in another page dedicated to it whose button is in pop up menu
- User can also generate Monet Style images by inputting an image thus producing an monet styles image
- User can also view the generated monet images in another page dedicated to it whose button is in pop up menu
- then user can logout thus destorying its information kept in local storage

## Tech Stack

- TensorFlow
- CycleGANs(you can view the notebook on which the model was made [here](https://github.com/jgyfutub/Kaggle-competitons-notebooks/blob/main/aipainter.ipynb))
- Flask
- Express.js
- MongoDB
- Mongoose
- Cascading Style Sheets (CSS) 
- Nodejs 
- JavaScript
- React.js
- Python
- Tensorflow Hub ( link for neural style transfer model: [Click here](https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2) and link for Image Super Resolution using ESRGAN: [Click Here](https://tfhub.dev/captain-pool/esrgan-tf2/1) )
- HTML

### Video Link: [Click Here](https://youtu.be/rEmhwUOeez4)

## Installation Guide:

- First git clone the project using command ` git clone https://github.com/jgyfutub/aigenerator.git `
- Then open the cloned folder on Visual Studio Code
- Split the terminal so that each terminal can work for backend and frontend
  
#### For Nodejs:

- open terminal in VS code and go into imagegenerator folder if you are not there
- write ` cd back ` to enter backend files
- write ` npm i ` to download all backend modules
- write ` node index1.js ` to start server
- vists http://localhost:8080/ for get requests of backend
  
#### For Reactjs:

- open terminal in VS code and go into imagegenerator folder if you are not there
- write ` cd front ` to enter frontend files
- write ` npm i ` for all frontend modules to be downloaded
- write ` npm start ` to start the frontend server
- go to http://localhost:3000/ to use app

#### For FLask

- Open Command prompt of your system
- ensure that virtual enviroment and python is installed in system
- write ` python -m venv venv ` to enter a virtual enviroment
- write ` venv\Scripts\activate ` to activate it
- now cd to pybackend to access flask file
- install dependencies ` pip install flask tensorflow tensorflow-hub numpy pillow `
- now write ` python flaskmain.py ` to start server at http://localhost:8000/

#### Note:
- download the photomodel file from [here](https://www.kaggle.com/code/vedant2003pandey/aipainter/output).Rename it to photomodel (1).h5
- If any bug occurs plz let me know about it.I will be grateful for it.

## Made with ❤️ by
- [Vedant Pandey](https://github.com/jgyfutub)
