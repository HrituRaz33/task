const modal = document.getElementById("myModal");


const btn = document.getElementById("openModal");


const span = document.getElementsByClassName("btn-close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const fileList = document.getElementById("fileList");
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function() {
  fileList.innerHTML = "";
  for (let i = 0; i < fileInput.files.length; i++) {
    const li = document.createElement("li");
    li.textContent = fileInput.files[i].name + " (" + fileInput.files[i].type + ")";
    fileList.appendChild(li);
  }
});


















const express = require("express");
const multer = require("multer");
const path = require("path");

// File upload folder
const UPLOADS_FOLDER = "./uploads/";

// var upload = multer({ dest: UPLOADS_FOLDER });

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault(); // stop the form submission

  // get the selected file(s)
  const fileInput = document.querySelector('input[name="avatar"]');
  const files = fileInput.files;

  // create a new FormData object and append the file(s) to it
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    console.log(files);
    formData.append('avatar', files[i]);
  }

  // make a POST request to upload the file(s)
  axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    // handle response from the server
    console.log(response.data);
  }).catch(error => {
    // handle error
    console.error(error);
  });
});
