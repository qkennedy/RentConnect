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
              Amount due: ${{rentAmt}}<br />
              Pay amount: $<input type="number" ref="rentamt" v-bind:value="rentAmt" />
              <input type="submit" value="Pay" class="btn btn-primary" />
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div v-if="role==='landlord'">
      <h3>Property Information</h3>
      <fieldset>
        <dl>
          <dt>
            Address
          </dt>
          <dd>
            {{ address }}
          </dd>
        </dl>
      </fieldset>
    </div>
    <h3>Past Receipts</h3>
    <table v-if="rentHistory.length > 0" class="table" id="financesTable" style="width:100%">
      <thead>
        <tr>
          <th style="width:50%">
            Date
          </th>
          <th style="width:50%">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <rent-row v-for="rentEvent in rentHistory" v-bind:date="rentEvent.payment_date" v-bind:amount="rentEvent.payment_amount" v-bind:late="!rentEvent.on_time" v-bind:key="rentEvent.id"></rent-row>
      </tbody>
    </table>
    <p v-if="rentHistory.length === 0">
      No receipts to view at this time.
    </p>
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
      role: 'tenant',
      address: '',
      tenant: '',
      dueDate: '',
      rentMonthDay: 0,
      rentAmt: '',
      propId: 0,
      myId: 0
    }
  },
  methods: {
    handleSubmit () {
      var rentToPay = this.$refs.rentamt.value
      axios.post('/rest/renthistory/entry/create',
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
      axios.get('/rest/renthistory/entries/property/' + this.propId)
        .then(response => {
          // turn the rent due date into a usable string
          var rentHistory = response.data

          this.rentHistory = rentHistory

          var nextDueDate = new Date()
          nextDueDate.setDate(this.rentMonthDay)
          if (nextDueDate < new Date()) {
            nextDueDate.setMonth(nextDueDate.getMonth() + 1)
          }
          var i
          for (i = 0; i < response.data.length; i++) {
            rentHistory[i].payment_date = new Date(rentHistory[i].payment_date).toLocaleDateString()
          }

          this.dueDate = nextDueDate.toLocaleDateString()
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
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1) {
      this.$router.push('/')
    }
    this.role = this.$session.get('userRole')
    this.myId = this.$session.get('userId')
    if (this.role === 'landlord') {
      if (typeof this.$route.params.id === 'undefined') {
        // we're a landlord but didn't specify which property
        this.$router.push('/')
      }
      this.propId = this.$route.params.id
    }
    axios.get('/rest/user/' + this.$session.get('userId') + '/' + this.$session.get('authToken'))
      .then(response => {
        if (this.$session.get('userRole') === 'tenant') {
          this.propId = response.data.property_id
        }
        if (this.propId === null) {
          this.$router.push('/')
        } else {
          axios.get('/rest/property/' + this.propId)
            .then(response => {
              this.address = response.data.address
              this.rentAmt = response.data.rent
              this.rentMonthDay = response.data.due_date
              this.updateEntries()
            })
            .catch(e => {
              console.log(e)
            })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}

Vue.component('rent-row', {
  props: ['date', 'amount', 'late'],
  template: '<tr><td>{{ date }} <span v-if="late" style="color:#F00; font-weight:bold">LATE</span></td><td>{{ amount }}</td></tr>'
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
#financesTable {
  text-align: left
}
</style>
