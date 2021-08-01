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
        color: '#FF2030',
        fields: {
          title: {
            id: "courseTitle",
            label: 'Course title',
            type: 'text',
            length: 30,
            placeholder: 'e.g. Computerised Accounting',
            value: ''
          },
          qualification: {
            id: "courseQualification",
            label: 'Course qualification',
            type: 'text',
            length: 30,
            placeholder: 'e.g. AAT Level 1',
            value: ''
          },
          date: {
            id: "courseDate",
            label: 'Course date',
            type: 'text',
            length: 30,
            value: '',
            placeholder: 'e.g. 10th March at 2pm'
          },
          duration: {
            id: "courseDuration",
            label: 'Course duration',
            type: 'text',
            length: 30,
            value: '',
            placeholder: 'e.g. 8 weeks'
          },
          induction: {
            id: "courseInduction",
            label: 'Induction date',
            type: 'text',
            length: 30,
            value: '',
            placeholder: 'e.g. 10th March'
          },
          image: {
            id: "courseImage",
            label: 'Course image',
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
          <h1 class="card--title">{{fields.title.value}}</h1>
          <ul class="card--list-items">
            <li v-if="fields.qualification.value != ''" class="card--list-item card--location"><strong>Qualification: </strong><span>{{fields.qualification.value}}</span></li>
            <li v-if="fields.date.value != ''" class="card--list-item card--date"><strong>Date: </strong><span>{{fields.date.value}}</span></li>
            <li v-if="fields.duration.value != ''" class="card--list-item card--location"><strong>Duration: </strong><span>{{fields.duration.value}}</span></li>
            <li v-if="fields.induction.value != ''" class="card--list-item card--induction"><strong>Induction: </strong><span>{{fields.induction.value}}</span></li>
          </ul>
        </div>
      </div>
      <div v-if="card.format === 'print'" class="card--text--footer">
        <p class="card--text--footer--text">
          {{ card.footer }}
        </p>
        <div class="card--text--footer--logo">
          <footer-logo v-bind:color="color"/>
        </div>
      </div>
    </card-content>
  </div>
</template>
