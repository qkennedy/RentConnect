<template>
  <div class="hello" id="applicationForm">
    <h2>Process application</h2>
    <h3>Property Information</h3>
    <dl style="text-align:center">
      <dt>
        Address
      </dt>
      <dd>
        {{ address }}
      </dd>
    </dl>
    <h3>Application</h3>
    <div>
      <dl style="text-align:center">
        <app-entry v-for="e in pageElements" v-bind:key="e.id" v-bind:caption="e.caption" v-bind:value="e.value"></app-entry>
      </dl>
      <p>
        <input type="submit" name="accept" value="Accept" v-on:click.stop="handleAccept" />
        <input type="submit" value="Reject" v-on:click.stop="handleReject" />
        <input type="submit" value="Ignore" v-on:click.stop="handleIgnore" />
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Components from '@/components/UIComponents'
import Vue from 'vue'

export default {
  name: 'Register',
  data () {
    return {
      pageElements: [
        {
          id: 0,
          type: 'text',
          name: 'name',
          caption: 'Your name',
          value: ''
        },
        {
          id: 1,
          type: 'text',
          name: 'ssn',
          caption: 'Your Social Security number',
          value: ''
        },
        {
          id: 2,
          type: 'text',
          name: 'dln',
          caption: 'Your driver\'s license number',
          value: ''
        },
        {
          id: 3,
          type: 'text',
          name: 'othernames',
          caption: 'Other names used in the past 5 years (if applicable)',
          value: ''
        },
        {
          id: 4,
          type: 'text',
          name: 'phone',
          caption: 'Cell phone number',
          value: ''
        },
        {
          id: 5,
          type: 'email',
          name: 'email',
          caption: 'Your email address',
          value: ''
        },
        {
          id: 6,
          type: 'text',
          name: 'address',
          caption: 'Your current address',
          value: ''
        },
        {
          id: 7,
          type: 'text',
          name: 'city',
          caption: 'Your current city',
          value: ''
        },
        {
          id: 8,
          type: 'text',
          name: 'state',
          caption: 'Your current state',
          value: ''
        },
        {
          id: 9,
          type: 'text',
          name: 'zip',
          caption: 'Your current ZIP code',
          value: ''
        },
        {
          id: 10,
          type: 'date',
          name: 'birthday',
          caption: 'Your birth date',
          value: ''
        },
        {
          id: 11,
          type: 'text',
          name: 'employer',
          caption: 'Your current employer',
          value: ''
        },
        {
          id: 12,
          type: 'text',
          name: 'jobtitle',
          caption: 'Your current job title',
          value: ''
        },
        {
          // TODO: make this a link
          id: 13,
          type: 'file',
          name: 'proofofincome',
          caption: ''
        },
        {
          id: 14,
          type: 'yesno',
          name: 'felony',
          caption: 'Have you ever been convicted of a felony?',
          value: ''
        }
      ],
      address: '',
      applicantId: 0,
      propertyId: 0
    }
  },
  methods: {
    handleAccept () {
      axios.put('/rest/property/' + this.propertyId + '/addTenant/' + this.applicantId)
        .then(response => {
          this.$router.push('/LandlordPortal')
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleReject () {
      axios.put('/rest/property/application/' + this.$route.params.id + '/reject')
        .then(response => {
          this.$router.push('/LandlordPortal')
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleIgnore () {
      this.$router.push('/LandlordPortal')
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
    axios.get('/rest/application/' + this.$route.params.id)
      .then(response => {
        this.applicantId = response.data.applicantId
        this.propertyId = response.data.propertyId
        for (var prop in response.data.application) {
          if (response.data.application.hasOwnProperty(prop)) {
            var i
            for (i = 0; i < this.pageElements.length; i++) {
              if (this.pageElements[i].name === prop) {
                this.pageElements[i].value = response.data.application[prop]
                break
              }
            }
          }
        }
        axios.get('/rest/property/' + response.data.propertyId)
          .then(response => {
            this.address = response.data.address
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.$router.push('/404')
        } else {
          console.log(error)
        }
      })
  }
}

Vue.component('app-entry', {
  props: ['caption', 'value'],
  template: `
  <div>
    <dt>
      {{ caption }}
    </dt>
    <dd>
      {{ value }}
    </dd>
  </div>
    `
})
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
