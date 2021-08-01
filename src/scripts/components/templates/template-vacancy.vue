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
        color: '#F5B501',
        fields: {
          title: {
            id: "vacancyTitle",
            label: 'Vacancy title',
            type: 'text',
            length: 40,
            value: '',
            placeholder: 'e.g. Early years practitioners'
          },
          subtitle: {
            id: "vacancySubtitle",
            label: 'Vacancy subtitle',
            type: 'text',
            length: 30,
            value: '',
            placeholder: 'e.g. Must be level 2 qualified'
          },
          hours: {
            id: "vacancyHours",
            label: 'Vacancy hours',
            type: 'text',
            length: 20,
            value: '',
            placeholder: 'e.g. Full time, or 37.5'
          },
          pay: {
            id: "vacancyPay",
            label: 'Vacancy pay',
            type: 'text',
            length: 20,
            value: '',
            placeholder: 'e.g. £16,000 per annum'
          },
          contract: {
            id: "vacancyContract",
            label: 'Vacancy contract',
            type: 'text',
            length: 20,
            value: '',
            placeholder: 'e.g. Permanent'
          },
          image: {
            id: "vacancyImage",
            label: 'Vacancy image',
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

          <p v-if="fields.title.value != ''" class="card--pre-title">We’re looking for:</p>
          <h1 class="card--title">{{fields.title.value}}</h1>
          <p v-if="fields.subtitle.value" class="card--description">{{fields.subtitle.value}}</p>
          <ul class="card--list-items">
            <li v-if="fields.hours.value != ''" class="card--list-item card--hours"><strong>Hours:</strong> {{fields.hours.value}}</li>
            <li v-if="fields.pay.value != ''" class="card--list-item card--pay"><strong>Pay:</strong> {{fields.pay.value}}</li>
            <li v-if="fields.contract.value != ''" class="card--list-item card--contract"><strong>Contract:</strong> {{fields.contract.value}}</li>
          </ul>
        </div>
      </div>
      <div v-if="card.format === 'print'" class="card--text--footer">
        <p class="card--text--footer--text">
          {{card.footer}}
        </p>
        <div class="card--text--footer--logo">
          <footer-logo v-bind:color="color"/>
        </div>
      </div>
    </card-content>

  </div>
</template>

<style scoped>
</style>