<template>
  <div class="hello" id="applicationForm">
    <h2>Finances</h2>
    <h3>Pay Rent</h3>
    <table border="0px" style="width: 100%">
      <tr>
        <td style="width:50%">
          <!-- TODO: populate due date -->
          <b>Due date: </b> March 31, 2018
        </td>
        <td style="width:50%">
          <!-- populate as necessary -->
          Amount due: $1000.00<br />
          Pay amount: $<input type="text" name="rentamt" value="1000.00" />
          <input type="submit" value="Pay" />
        </Td>
      </tr>
    </table>
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
      <rent-row v-for="rentEvent in rentHistory" v-bind:date="rentEvent.date" v-bind:amount="rentEvent.amount" v-bind:receiptLink="rentEvent.receiptLink" v-bind:late="rentEvent.late" v-bind:key="rentEvent.id"></rent-row>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import Components from '@/components/UIComponents'

export default {
  name: 'Register',
  data () {
    return {
      // TODO: populate this with the values from the rent history
      rentHistory: [
        {
          id: 0,
          date: 'July 4, 1776',
          amount: '$1000.00',
          receiptLink: '<a href="#/">Receipt</a>'
        },
        {
          id: 1,
          date: 'December 7, 1941',
          amount: '$1000.00',
          receiptLink: '<a href="#/">Receipt</a>'
        },
        {
          id: 2,
          date: 'April 1, 2017',
          amount: '$1000.00',
          receiptLink: '<a href="#/">Receipt</a>',
          late: true
        }
      ]
    }
  },
  components: {
    Components
  }
}

Vue.component('rent-row', {
  props: ['date', 'amount', 'receiptLink', 'late'],
  template: '<tr><td>{{ date }} <span v-if="late" style="color:#F00; font-weight:bold">LATE</span></td><td>{{ amount }}</td><td v-html="receiptLink"></td></tr>'
})

document.title = 'Finances'
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
