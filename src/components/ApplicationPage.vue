<template>
  <div class="hello" id="applicationPage">
    <h2>Apply to rent property</h2>
    <h3>Property Information</h3>
    <div class=".form-horizontal auth-form">
      <div class="form-group">
        <label class="control-label auth-label" for="address">Address</label>
        <p id="address">
          {{ address }}
        </p>
      </div>
    </div>
    <h3>Submit Application</h3>
    <form class=".form-horizontal auth-form" id="applicationForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name"
          v-bind:key="element.id" divclass="form-group" labelclass="control-label auth-label" inputclass="form-control" />
      </table>
      <p><input class="btn btn-primary" type="submit" value="Register" /></p>
    </form>
  </div>
</template>

<script>
import Components from '@/components/UIComponents'
import axios from 'axios'

export default {
  name: 'Apply',
  data () {
    return {
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'name',
          caption: 'Your name'
        },
        {
          id: 1,
          type: 'text',
          name: 'ssn',
          caption: 'Your Social Security number'
        },
        {
          id: 2,
          type: 'text',
          name: 'dln',
          caption: 'Your driver\'s license number'
        },
        {
          id: 3,
          type: 'text',
          name: 'othernames',
          caption: 'Other names used in the past 5 years (if applicable)'
        },
        {
          id: 4,
          type: 'text',
          name: 'phone',
          caption: 'Cell phone number'
        },
        {
          id: 5,
          type: 'email',
          name: 'email',
          caption: 'Your email address'
        },
        {
          id: 6,
          type: 'text',
          name: 'address',
          caption: 'Your current address'
        },
        {
          id: 7,
          type: 'text',
          name: 'city',
          caption: 'Your current city'
        },
        {
          id: 8,
          type: 'text',
          name: 'state',
          caption: 'Your current state'
        },
        {
          id: 9,
          type: 'text',
          name: 'zip',
          caption: 'Your current ZIP code'
        },
        {
          id: 10,
          type: 'date',
          name: 'birthday',
          caption: 'Your birth date'
        },
        {
          id: 11,
          type: 'text',
          name: 'employer',
          caption: 'Your current employer'
        },
        {
          id: 12,
          type: 'text',
          name: 'jobtitle',
          caption: 'Your current job title'
        },
        {
          id: 13,
          type: 'file',
          name: 'proofofincome',
          caption: 'Proof of income'
        },
        {
          id: 14,
          type: 'yesno',
          name: 'felony',
          caption: 'Have you ever been convicted of a felony?'
        }
      ],
      address: ''
    }
  },
  components: {
    Components
  },
  methods: {
    handleSubmit () {
      // TODO: make this submit to the appropriate endpoint
      axios.post('/rest/',
        Components.collapse(this.formElements, [])
      )
        .then(response => {
          alert('Application submitted!')
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    document.title = 'Apply to Rent Property'

    // TODO: if property already rented or does not exist, "evict" user from this page

    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'tenant') {
      // not a tenant, shouldn't be submitting an application
      this.$router.push('/')
    }
    axios.get('/rest/property/' + this.$route.params.id)
      .then(response => {
        this.address = response.data.address
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

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
.auth-form {
    width: 340px;
    margin: 0 auto;
}
.form-group {
  text-align: left;
}
</style>
