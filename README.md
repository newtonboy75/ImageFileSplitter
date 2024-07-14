Project: Image Grid Splitter
Author: Newton Tugadi

Front End:

    1. Vite React

Back End:

    1. NodeJS/Express
    2. Sharp 
    3. Multer

Setup (For testing purposes only):

    1. Clone this repository: open your terminal and type: git clone git@github.com:newtonboy75/image-splitter.git
    2. cd to image-splitter/backend, type: npm install, please wait for all dependencies to be installed
    3. type: npm run dev
    4. cd to image-splitter/frontend, type: npm install
    5. type: npm run build
    6. type: npm run preview
    7. on your browser, go to http://localhost:4173/

Usage:
    1. Click on Upload Image File button 
    2. When the image is loaded, set the number of colums and rows by changing the columns and rows number input.
    3. Click Split Image button to start processing the file. 
    4. Click the Tile Image toggle to preview splitted files.

About the project:

    My objective is to develop a web app that can be used to split ian image file into several pieces so that can use them in their project. I've used React-vite for front end and NodeJS with Express for back end. When the user loaded a file into the preview container, behind the scence the image is being uploaded to the server and put it in the uploads directory. Once the user changes the number of colums and rows, the backend starts to split the image. The challenge that I've faced with this kind of approach is that node sometimes referenced to the user directory (local dev machine) and not the server directory which sometimes throw an error of not directory not found. I have only tested it on local dev machine and still yet to test it on production. I've set the timeout to 6 seconds for the split file request due to large files taking time to complete the split process (will figure out other options). I've limited the rows and colums value to 10 each because the server started to slow down when processing large image for more than 100 splits (still have to figure out the way to do this). All functionalities tested on my 2018 MacBook Pro with core i7, 16 gigs of ram and 256 storage. 

Demo: 

   Link to the screen recording: https://drive.google.com/file/d/1y_doQOPLhiXjnMlmmG77jqIYeqFnK6c2/view?usp=sharing


Thank you and looking forward to talking to you!!!
    