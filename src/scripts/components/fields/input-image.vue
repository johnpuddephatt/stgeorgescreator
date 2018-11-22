<template>

  <form class="input-group" enctype="multipart/form-data" novalidate>
    <label for="imageUpload">Upload image</label>
    <div class="dropbox">
      <input id="imageUpload" class="input-file" type="file" accept="image/*" @change="onFileChanged">
      <p v-if="isInitial">
          Drag your image here to begin or click to browse
      </p>
      <p v-else>
        Image selected
      </p>
    </div>
    <a class="button" href="/flickr/album.php?photoset_id=72157699588908032&amp;json=true" target="popup" onclick="window.open('/flickr/album.php?photoset_id=72157699588908032&amp;json=true','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
      Open Flickr in Popup
    </a>
    <input id="imageFlickr" type="hidden" @input="onFlickrChanged">

  </form>
</template>

<script>
  export default {
    props: ['field'],
    selectedImage: '',
    computed: {
      isInitial() {
        return !Boolean(this.field.value);
      },
    },
    methods: {
      onFileChanged(event) {
        let self = this;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function(theFile) {
          var dummyImage = new Image();
          dummyImage.onload = function() {
            if(this.width < 600) {
              alert('Selected image is very small. Please find a larger image.')
            }
            else if (this.width < 1200) {
              alert('Selected image is small. It may be okay for screen use but will appear fuzzy when printed. Please find a larger image if possible.')
            }
          };
          dummyImage.src = theFile.target.result;
          self.field.value = theFile.target.result;

        }
        if (file) {
          reader.readAsDataURL(file); //reads the data as a URL
        } else {
          this.value = "";
        }
      },
      onFlickrChanged(event) {
        console.log('here he is');
        let self = this;
        self.field.value = event.target.value;
      }
    }
  }
</script>

<style scoped>

</style>