<script>
  import footerLogo from '../inc/footer-logo'

  export default {
    props: ['card'],
    components: {
      footerLogo
    },
    data: function() {
      return  {
        color: '#FFFFFF',
        fields: {
          title: {
            id: "genericTitle",
            label: 'Title',
            type: 'text',
            length: 30,
            placeholder: 'e.g. We’re closed for Christmas',
            value: ''
          },
          description: {
            id: "genericDescription",
            label: 'Generic description',
            type: 'textarea',
            length: 80,
            value: '',
            placeholder: 'e.g. But we’ll be back soon.'
          }
        }
      }
    }
  }
</script>

<template>
  <div>

    <card-sidebar
      v-bind:fields="fields" v-bind:card="card">
    </card-sidebar>

    <card-content v-bind:fields="fields" v-bind:card="card">
      <div class="card--text">
        <div class="card--text--inner">
          <h1 class="card--title">{{fields.title.value}}</h1>
          <p class="card--description">{{fields.description.value}}</p>
        </div>
      </div>
      <div v-if="card.format === 'print'" class="card--text--footer">
        <div class="card--text--footer--logo">
          <footer-logo v-bind:color="color"/>
        </div>
      </div>
    </card-content>

  </div>
</template>

<style scoped>
</style>