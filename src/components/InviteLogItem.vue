<template>
  <div class="inviteLogItem">
    <b-row>
      <b-col cols="6">用户_{{inviteLogItem.inviteeId}}</b-col>
      <b-col cols="3">
        <p v-if="inviteLogItem.state === 'unprocessed'" class="text-secondary">未处理</p>
        <p v-else-if="inviteLogItem.state === 'accept'" class="text-success">已接受</p>
        <p v-else class="text-warning">已拒绝</p>
      </b-col>
      <b-col cols="2">
        <b-btn v-if="inviteLogItem.state === 'accept'" size="sm" class="button" variant="outline-info">踢出</b-btn>
        <b-btn v-else size="sm" class="button" variant="outline-danger">删除</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'InviteLogItem',
  props: {
    inviteLogItem: {
      id: Number,
      inviterId: Number,
      // inviter: String,
      inviteeId: Number,
      // invitee: String,
      mid: Number,
      // mapTitle: String,
      state: String
    }
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      show: true
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .inviteLogItem {
    margin: 5px 0
  }

  .button {
    /*margin-left: 10px;*/
  }
</style>
