<template>
  <div class="hello" id="applicationForm">
    <h2>Finances</h2>
    <div v-if="role==='tenant'">
      <h3>Pay Rent</h3>
      <form @submit.prevent="handleSubmit">
        <table border="0px" style="width: 100%">
          <tr>
            <td style="width:50%">
              <b>Due date: </b> {{ dueDate }}
            </td>
            <td style="width:50%">
              <!-- populate as necessary -->
              Amount due: ${{rentAmt}}<br />
              Pay amount: $<input type="text" ref="rentamt" v-bind:value="rentAmt" />
              <input type="submit" value="Pay" />
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div v-if="role==='landlord'">
      <h3>Property Information</h3>
      <table class="standardTable">
        <tr>
          <th>
            Address
          </th>
          <td>
            {{ address }}
          </td>
        </tr>
        <tr>
          <th>
            Tenant
          </th>
          <td>
            {{ tenant }}
          </td>
        </tr>
      </table>
    </div>
    <h3>Past Receipts</h3>
    <table border="0px" style="width:100%">
      <tr>
        <th style="width:33%">
          Date
        </th>
        <th style="width:33%">
          Amount
        </th>
        <th style="width:33%">
          File
        </th>
      </tr>
      <rent-row v-for="rentEvent in rentHistory" v-bind:date="rentEvent.payment_date" v-bind:amount="rentEvent.payment_amount" v-bind:receiptLink="rentEvent.receiptLink" v-bind:late="!rentEvent.on_time" v-bind:key="rentEvent.id"></rent-row>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Components from '@/components/UIComponents'

export default {
  name: 'Register',
  data () {
    return {
      rentHistory: [

      ],
      // TODO: populate property information from the database
      role: 'tenant',
      address: '',
      tenant: '',
      dueDate: 'March 31, 2018',
      rentAmt: 'TODO',
      propId: 0,
      myId: 0
    }
  },
  methods: {
    handleSubmit () {
      var rentToPay = this.$refs.rentamt.value
      axios.post('/rest/renthistory/createentry/',
        {
          payerId: this.myId,
          propertyId: this.propId,
          paymentAmount: rentToPay,
          onTime: true // TODO: make this dependent on the due date
        }
      )
        .then(response => {
          this.updateEntries()
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateEntries () {
      axios.get('/rest/property/' + this.propId + '/entries')
        .then(response => {
          this.rentHistory = response.data
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Finances'
    axios.get('/rest/whoAmI')
      .then(response => {
        this.role = response.data.role
        this.myId = response.data.id
        if (this.role === 'tenant') {
          this.propId = response.data.property_id
        } else if (this.role === 'landlord') {
          if (typeof this.$route.params.id === 'undefined') {
            // we're a landlord but didn't specify which property
            this.$router.push('/')
          }
          this.propId = this.$route.params.id
        }
        axios.get('/rest/property/' + this.propId)
          .then(response => {
            this.address = response.data.address
            this.rentAmt = response.data.rent
            this.updateEntries()
          })
          .catch(e => {
            console.log(e)
          })
      })
      .catch(e => {
        console.log(e)
      })
  }
}

Vue.component('rent-row', {
  props: ['date', 'amount', 'receiptLink', 'late'],
  template: '<tr><td>{{ date }} <span v-if="late" style="color:#F00; font-weight:bold">LATE</span></td><td>{{ amount }}</td><td v-html="receiptLink"></td></tr>'
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
