import html2canvas from 'html2canvas';
import Vue from 'vue';
import jsPDF from 'jspdf';
// import fitty from 'fitty';


// document.addEventListener('DOMContentLoaded', ()=>{
//   console.log('did it');
//   fitty('#fittyspan', {
//     minSize: 120,
//     maxSize: 200,
//     multiLine: true
//   });
// });




var card = new Vue({
  el: '#app',
  data: {
    title: 'Paediatric first aid',
    titleLength: '50',
    description: 'Sat 14th & Sat 21st July',
    descriptionLength: '50',
    description2: '9am - 5pm',
    cardFormat: 'web',
    cardTemplate: 'vacancy',
    selectedImage: '',
  },
  computed: {
    isInitial() {
      return !Boolean(this.selectedImage);
    }
  },
  methods: {
    onFileChanged(event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        card._data.selectedImage = reader.result;
      }
      if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
      } else {
        this.selectedImage = "";
      }
    },
    onUpload() {
      // upload file, get it from this.selectedFile
    }
  }
})




var node = document.getElementById('content');
var exportButton = document.getElementById('export');

exportButton.addEventListener('click', function() {
  saveImage();
});


function saveImage(format) {
  node.classList.add('rendering');
  // setTimeout(
    html2canvas(node).then(function(canvas) {
      document.body.appendChild(canvas);
      // Canvas2Image.saveAsJPEG(canvas, 800, 800)

      var dataString = canvas.toDataURL("image/jpeg");
      if (card._data.cardFormat == 'print') {
        var doc = new jsPDF('p', 'mm', 'a4', false);
        doc.addImage(dataString, 'JPEG', 0, 0, 210, 297);
        doc.save(card._data.title.replace(/[^a-zA-Z]/g, "") + '_image.pdf');
      }
      else {
        var link = document.createElement("a");
        link.download = card._data.title.replace(/[^a-zA-Z]/g, "") + '_image.jpg';
        link.textContent = 'Download';
        link.href = dataString;
        link.click();
      }

      node.classList.remove('rendering');
    });
    // , 2000);
};
