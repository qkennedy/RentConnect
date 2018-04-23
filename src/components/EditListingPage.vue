<template>
  <div class="hello" id="applicationForm">
    <h2 v-if="$route.params.id==null">Create Listing</h2>
    <h2 v-else>Edit Listing</h2>
    <form class=".form-horizontal auth-form" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:value="element.value" v-bind:key="element.id"
        divclass="form-group" labelclass="control-label auth-label" inputclass="form-control" />
      <p><input class="btn btn-primary" v-if="$route.params.id==null" type="submit" value="Submit Listing" /><input class="btn btn-primary" v-else type="submit" value="Update Listing" /></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Components from '@/components/UIComponents'

export default {
  name: 'CreateEditListing',
  data () {
    return {
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
          name: 'dueDate',
          caption: 'Rent due date (each month)',
          value: ''
        },
        {
          id: 3,
          type: 'number',
          name: 'lateFee',
          caption: 'Rent late fee',
          value: ''
        }
      ],
      myId: 0
    }
  },
  components: {
    Components
  },
  methods: {
    handleSubmit () {
      var formFields = Components.collapse(this.formElements, [])
      formFields.landlordId = this.myId
      if (typeof this.$route.params.id === 'undefined') {
        // creating a property
        axios.post('/rest/property/create',
          formFields
        )
          .then(response => {
            this.$router.push('/MyProperties')
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        // editing a property
        axios.post('/rest/property/' + this.$route.params.id + '/edit',
          formFields
        )
          .then(response => {
            this.$router.push('/LandlordPortal')
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  },
  mounted () {
    document.title = 'Manage Listing'

    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'landlord') {
      this.$router.push('/')
    }
    this.myId = this.$session.get('userId')
    if (typeof this.$route.params.id !== 'undefined') {
      axios.get('/rest/property/' + this.$route.params.id)
        .then(response => {
          this.formElements[0].value = response.data.address
          this.formElements[1].value = response.data.rent
          this.formElements[2].value = response.data.due_date
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
