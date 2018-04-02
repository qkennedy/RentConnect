<template>
  <div class="hello" id="applicationForm">
    <h2>Apply to rent property</h2>
    <!-- TODO: include information about the property -->
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" />
      </table>
      <p><input type="submit" value="Register" /></p>
    </form>
  </div>
</template>

<script>
import Components from '@/components/UIComponents'

export default {
  name: 'Register',
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
      ]
    }
  },
  components: {
    Components
  }
}

document.title = 'Apply to rent property'
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
