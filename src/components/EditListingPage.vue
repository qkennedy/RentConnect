<template>
  <div class="hello" id="applicationForm">
    <h2 v-if="$route.params.id==null">Create Listing</h2>
    <h2 v-else>Edit Listing</h2>
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:value="element.value" v-bind:key="element.id" />
      </table>
      <p><input type="submit" value="Register" /></p>
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
      // TODO: if editing a listing, get these values from the backend
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'address',
          caption: 'Address',
          value: ''
        },
        {
          id: 1,
          type: 'text',
          name: 'rent',
          caption: 'Rent (monthly)',
          value: ''
        },
        {
          id: 2,
          type: 'number',
          name: 'rentdue',
          caption: 'Rent due date (each month)',
          value: ''
        },
        {
          id: 3,
          type: 'number',
          name: 'latefee',
          caption: 'Rent late fee',
          value: ''
        }
      ]
    }
  },
  components: {
    Components
  },
  methods: {
    handleSubmit () {
      // TODO: add REST API endpoint
      axios.post('/rest/',
        Components.collapse(this.formElements, [''])
      )
        .then(response => {
          // TODO: explain that listing was created or updated
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    if (this.$route.params.id != null) {
      axios.get('/rest/property/' + this.$route.params.id)
        .then(response => {
          console.log(JSON.stringify(response))
          this.formElements[0].value = response.data.address
          this.formElements[1].value = response.data.rent
          this.formElements[3].value = response.data.late_fee
        })
        .catch(e => {
          if (typeof e.status !== 'undefined' && e.status === 404) {
            this.$router.push('/404')
          } else {
            console.log(e)
          }
        })
    }
  }
}

document.title = 'Manage Listing'
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
