<script>
  import footerLogo from '../inc/footer-logo'
  import drag from '../inc/v-drag'

  export default {
    props: ['card'],
    components: {
      footerLogo
    },
    directives: {
      drag
    },
    data: function() {
      return  {
        color: '#00CFD6',
        fields: {
          title: {
            id: "activityTitle",
            label: 'Activity title',
            type: 'text',
            length: 30,
            value: '',
          },
          description: {
            id: "activityDescription",
            label: 'Activity description',
            type: 'textarea',
            length: 40,
            placeholder: 'activity title goes here',
            value: '',
          },
          date: {
            id: "activityDate",
            label: 'Activity date',
            type: 'text',
            length: 30,
            placeholder: 'e.g. Every Wednesday at 2pm',
            value: '',
          },
          location: {
            id: "activityLocation",
            label: 'Activity location',
            type: 'text',
            length: 30,
            placeholder: 'e.g. St George’s Community Centre',
            value: '',
          },
          price: {
            id: "activityPrice",
            label: 'Activity price',
            type: 'text',
            length: 20,
            placeholder: 'e.g. Free',
            value: '',
          },
          image: {
            id: "activityImage",
            label: 'Activity image',
            type: 'image',
            value: ''
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

      <div v-drag class="card--image-container" :style="`background-image: url('${fields.image.value}')`">
      </div>
      <div class="card--text">
        <div class="card--text--inner">
          <h1 class="card--title">{{ fields.title.value }}</h1>
          <p class="card--description">{{ fields.description.value }}</p>
          <ul class="card--list-items">
            <li v-if="fields.date.value != ''" class="card--list-item card--date"><strong>When?</strong> {{ fields.date.value }}</li>
            <li v-if="fields.location.value != ''" class="card--list-item card--location"><strong>Where?</strong> {{ fields.location.value }}</li>
            <li v-if="fields.price.value" class="card--list-item card--price"><strong>Cost?</strong> {{ fields.price.value }}</li>
          </ul>
        </div>
      </div>
      <div v-if="card.format === 'print'" class="card--text--footer">
        <p class="card--text--footer--text">For more information please call 01924 369 632 or visit stgeorgeslupset.org.uk</p>
        <div class="card--text--footer--logo">
          <footer-logo v-bind:color="color"/>
        </div>
      </div>
    </card-content>
  </div>
</template>
