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

export default {
  name: 'InviteUnhandleList',
  components: { InviteItem},
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      inviteList: [
        { id: 1,
          inviterId: 3,
          inviter: "ldchao",
          inviteeId: 1,
          invitee: "海龙",
          mid: 2,
          mapTitle: "测试",
          state: "accept"},
        { id: 2,
          inviterId: 3,
          inviter: "ldchao",
          inviteeId: 1,
          invitee: "海龙",
          mid: 2,
          mapTitle: "测试",
          state: "refuse"}
      ]
    }
  }
}
</script>

<style scoped>

</style>
