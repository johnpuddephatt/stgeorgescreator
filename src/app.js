import Vue from 'vue';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import fitty from 'fitty';

const requireComponent = require.context('./scripts/components', true, /.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.replace(/^.*[\\\/]/, '').replace('.vue','');
  Vue.component(
    componentName, componentConfig.default || componentConfig
  );
});


// document.addEventListener('DOMContentLoaded', ()=>{
//   setInterval(
//     function() {
//       fitty('#fittyspan', {
//         minSize: 300,
//         maxSize: 400,
//         multiLine: true
//       });
//       console.log('doing it');
//
//     },
//     200
//   );
// });


Vue.component('card-content', {
  props: ['fields','card'],
  template: `
  <main>
    <div class="card" id="content" :data-cardtemplate="card.template" :data-cardformat="card.format">
      <slot></slot>
    </div>
    <div class="loading-spinner">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"/>
        </path>
      </svg>
    </div>
  </main>
  `
});

Vue.component('card-sidebar', {
  props: ['fields','card'],
  template: `
    <aside class="sidebar">

      <header class="sidebar-header">
        <img src="/images/stgeorges_logo.svg" />
      </header>

      <label for="cardTemplate">Template</label>
      <select v-model="card.template" id="cardTemplate">
        <option :value="template" v-for="template in card.templateNames">
          {{ template }}
        </option>
      </select>

      <p><strong>Format</strong></p>
      <div class="radio-group">
        <div class="radio-group">
          <input type="radio" id="card-size-web" value="web" v-model="card.format">
          <label for="card-size-web">Web</label>
        </div>
        <div class="radio-group">
          <input type="radio" id="card-size-print" value="print" v-model="card.format">
          <label for="card-size-print">Print</label>
        </div>
        <div class="radio-group">
          <input type="radio" id="card-size-tv" value="tv" v-model="card.format">
          <label for="card-size-tv">TV</label>
        </div>
      </div>

      <component
       v-for="field in fields"
       v-bind:is="'input-' + field.type"
       v-bind:field="field"
       :key="field.id">
      </component>

      <button class="button__block button--export" title="Download" id="export" v-on:click="onSave">Save</button>

    </aside>
  `,
  methods: {
    onSave(event) {
      var node = document.getElementById('content');
      node.classList.add('rendering');
      // setTimeout(
        html2canvas(node).then(function(canvas) {
          document.body.appendChild(canvas);
          // Canvas2Image.saveAsJPEG(canvas, 800, 800)
          var dataString = canvas.toDataURL("image/jpeg");
          // Below was card._data.cardFormat
          if (card.card.format == 'print') {
            var doc = new jsPDF('p', 'mm', 'a4', false);
            doc.addImage(dataString, 'JPEG', 0, 0, 210, 297);
            // doc.save(card._data.title.replace(/[^a-zA-Z]/g, "") + '_image.pdf');
            doc.save('image.pdf');
          }
          else {
            var link = document.createElement("a");
            // link.download = card._data.title.replace(/[^a-zA-Z]/g, "") + '_image.jpg';
            link.download = 'image.jpg';
            link.textContent = 'Download';
            link.href = dataString;
            document.getElementsByTagName("BODY")[0].appendChild(link);
            link.click();
            //document.getElementsByTagName("BODY")[0].removeChild(link);
          }

          node.classList.remove('rendering');
        });
        // , 2000);
    }
  }
})

var card = new Vue({
  el: '#app',
  data: {
    card: {
      format: 'web',
      template: 'vacancy',
      templateNames: ['activity','vacancy','course','generic']
    },
  },
})



