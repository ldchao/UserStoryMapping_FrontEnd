<template>
<div>
  <b-row>
    <b-col cols="2"/>
    <b-col cols="8">
      <div v-for="inviteItem in inviteList">
        <invite-item :invite-item="inviteItem"></invite-item>
      </div>
    </b-col>
    <b-col cols="2"/>
  </b-row>
</div>
</template>

<script>
import InviteItem from '../components/InviteItem'
import { getCookie } from '../assets/Cookie'

export default {
  name: 'InviteUnhandleList',
  components: { InviteItem},
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      inviteList: []
    }
  },
  mounted () {
    let self = this
    axios.get(this.baseUrl + '/invite/check_invited',{
      params: {
        uid: getCookie('userId')
      }
    }).then((res) => {
      console.log(res.data)
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].state !== 'unprocessed') {
          self.inviteList.push(res.data[i])
        }
      }
    })
  }
}
</script>

<style scoped>

</style>
