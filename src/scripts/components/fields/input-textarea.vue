<template>
  <div class="input-group">
    <label :for="field.id">{{ field.label }} <span v-if="field.length" class="remaining-chars" v-text="(field.length - field.value.length)"></span></label>
    <textarea :id="field.id" v-model="field.value" :placeholder="field.placeholder" :maxlength="field.length"></textarea>
  </div>
</template>

<script>
  export default {
    props: ['field'],
  }
</script>

<style scoped>

</style>