<template>
  <div class="hello" id="applicationForm">
    <h2>Process application</h2>
    <!-- TODO: include information about the property -->
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <table border="0px" id="loginTable">
        <leftright-static-display v-for="element in pageElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" />
      </table>
      <p><input type="submit" name="accept" value="Accept" /><input type="submit" value="Reject" /><input type="submit" value="Ignore" /></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Components from '@/components/UIComponents'

export default {
  name: 'Register',
  data () {
    return {
      // TODO: populate this with the values from the application
      pageElements: [
        {
          id: 0,
          type: 'text',
          name: 'name',
          caption: 'Your name',
          value: 'John Smith'
        },
        {
          id: 1,
          type: 'text',
          name: 'ssn',
          caption: 'Your Social Security number',
          value: '123-45-6789'
        },
        {
          id: 2,
          type: 'text',
          name: 'dln',
          caption: 'Your driver\'s license number',
          value: 'AAAAAA111111'
        },
        {
          id: 3,
          type: 'text',
          name: 'othernames',
          caption: 'Other names used in the past 5 years (if applicable)',
          value: 'N/A'
        },
        {
          id: 4,
          type: 'text',
          name: 'phone',
          caption: 'Cell phone number',
          value: '1-800-411-PAIN'
        },
        {
          id: 5,
          type: 'email',
          name: 'email',
          caption: 'Your email address',
          value: 'myemail@gmail.com'
        },
        {
          id: 6,
          type: 'text',
          name: 'address',
          caption: 'Your current address',
          value: '123 Sesame Street'
        },
        {
          id: 7,
          type: 'text',
          name: 'city',
          caption: 'Your current city',
          value: 'New York City'
        },
        {
          id: 8,
          type: 'text',
          name: 'state',
          caption: 'Your current state',
          value: 'New York'
        },
        {
          id: 9,
          type: 'text',
          name: 'zip',
          caption: 'Your current ZIP code',
          value: '12345'
        },
        {
          id: 10,
          type: 'date',
          name: 'birthday',
          caption: 'Your birth date',
          value: '1/1/1990'
        },
        {
          id: 11,
          type: 'text',
          name: 'employer',
          caption: 'Your current employer',
          value: 'FutureSight Technologies'
        },
        {
          id: 12,
          type: 'text',
          name: 'jobtitle',
          caption: 'Your current job title',
          value: 'Executive director or whatever'
        },
        {
          // TODO: make this a link
          id: 13,
          type: 'file',
          name: 'proofofincome',
          caption: 'Proof of income'
        },
        {
          id: 14,
          type: 'yesno',
          name: 'felony',
          caption: 'Have you ever been convicted of a felony?',
          value: false
        }
      ]
    }
  },
  methods: {
    handleSubmit () {
      var dummy = false
      if (dummy) {
        // TODO: make it so that if accepted, it adds the tenant to the property
        axios.post('/rest/property/' + 1 /* property ID */ + '/addTenant/' + 1 /* tenant ID */,
          Components.collapse(this.formElements, [''])
        )
          .then(response => {
            // TODO: explain that the action was successful
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        // TODO: reject application
      }
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Process Property Application'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'landlord') {
      this.$router.push('/')
    }
    // TODO: get everything from the backend
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
