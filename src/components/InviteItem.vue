<template>
  <div class="inviteItem">
    <b-card :title="'用户_'+inviteItem.inviterId+'邀请您:'" v-show="show">
      <p class="card-text">
        参与StoryMapping “map_{{inviteItem.mid}}” 的开发
      </p>
      <div style="display: inline-block" v-if="inviteItem.state === 'unprocessed'">
        <b-btn size="sm" class="button" variant="outline-success" @click="handleInvite('accept')">接受</b-btn>
        <b-btn size="sm" class="button" variant="outline-warning" @click="handleInvite('reject')">拒绝</b-btn>
      </div>
      <div style="display: inline-block;margin-right: 10px" v-else-if="inviteItem.state === 'accept'">
        <p class="text-success">邀请已接受</p>
      </div>
      <div style="display: inline-block;margin-right: 10px" v-else>
        <p class="text-warning">邀请已拒绝</p>
      </div>
      <b-btn size="sm" class="button" variant="outline-danger">删除</b-btn>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'InviteItem',
  props: {
    inviteItem: {
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
  methods: {
    handleInvite(state){
      console.log(state)
    },



    deleteInvite () {
      // let param = new URLSearchParams()
      // param.append('userId',getCookie('userId'))
      // param.append('mapId', this.mapItem.id)
      //
      // axios.post(this.baseUrl+'/map/delete_map',param).then((res)=>{
      //   switch (res.data) {
      //     case 'success':
      //       this.show = false
      //       console.log('删除成功')
      //       break;
      //     case 'fail':
      //       console.log('删除失败!!!!!!')
      //       break;
      //   }
      //   })
      // console.log('delete success')
    }
  },
  mounted () {
    console.log('inviteItem id:      ' + this.inviteItem.id)
  }
}
</script>

<style scoped lang="scss">
  .inviteItem {
    margin: 10px 0
  }

  .button {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
