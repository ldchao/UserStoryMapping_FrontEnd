<template>
  <b-container fluid>
    <Navbar :is-map="true"></Navbar>
    <div class="main-wrapper">
      <div class="map_list">
        <ul class="map_list_ul">
          <li v-for="activityItem in activityList" class="map_list_li concreteMap_list_li">
            <acticity-card :id="activityItem.aid" :title="activityItem.title" :desc="activityItem.desc"></acticity-card>
          </li>
          <li class="map_list_li concreteMap_list_li">
            <b-btn href="#" variant="outline-info" class="css_add" v-b-modal.add_activity>添加activity
            </b-btn>
            <b-modal v-model="show" centered id="add_activity" title="新建activity" style="text-align : left">
              <b-form>
                <b-form-group label="标题:"
                              label-for="title">
                  <b-form-input type="text"
                                v-model="add_title"
                                required
                                placeholder="Enter title">
                  </b-form-input>
                </b-form-group>
                <b-form-group label="描述:"
                              label-for="desc">
                  <b-form-textarea placeholder="Enter some description"
                                   :rows="4"
                                   v-model="add_desc"
                                   :max-rows="6">
                  </b-form-textarea>
                </b-form-group>
              </b-form>
              <div slot="modal-footer" class="w-100">
                <p class="float-left"></p>
                <b-btn size="sm" class="float-right" variant="primary" @click="addActivity">
                  OK
                </b-btn>
              </div>
            </b-modal>
            <div class="css_add" style="visibility: hidden"></div>
            <hr>
          </li>
        </ul>
      </div>
      <b-modal centered id="invite_people" title="邀请成员" style="text-align : left">
        <b-form>
          <b-form-group label="邀请成员:"
                        label-for="invite_input">
            <b-row>
              <b-col cols="10">
                <b-form-input id="invite_input" list="invite-list-id" placeholder="邀请人"/>
                <datalist id="invite-list-id">
                  <option v-for="invite in invite_list">{{ invite }}</option>
                </datalist>
              </b-col>
              <b-col cols="2">
                <b-btn variant="primary" @click="" style="margin-left: -10px">邀请</b-btn>
              </b-col>
            </b-row>
          </b-form-group>
          <label>邀请记录：</label>
          <div>
            <invite-log-item v-for="inviteLogItem in inviteLogList" :invite-log-item="inviteLogItem"></invite-log-item>
          </div>
        </b-form>
        <div slot="modal-footer" class="w-100">
          <p class="float-left"></p>
          <b-btn size="sm" class="float-right" variant="primary" @click="">
            OK
          </b-btn>
        </div>
      </b-modal>

      <b-modal id="edit_log" centered title="编辑记录">
        <div style="height:400px; overflow-y:scroll;" >
          <p class="my-4" v-for="i in 20" :key="i">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
        </div>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import Navbar from '../components/Navbar'
import ActicityCard from '../components/ActivityCard'
import InviteLogItem from '../components/InviteLogItem'

export default {
  name: 'ConcreteMap',
  components: { ActicityCard, Navbar, InviteLogItem },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      add_title: '',
      add_desc: '',
      activityList: [],
      invite_list: ['abc', 'a2bc', 'dbc', 'abdc', 'absc', 'aabc'],
      show: false,
      inviteLogList: [
        {
          id: 1,
          inviterId: 3,
          inviter: 'ldchao',
          inviteeId: 1,
          invitee: '海龙',
          mid: 2,
          mapTitle: '测试',
          state: 'accept'
        },
        {
          id: 2,
          inviterId: 3,
          inviter: 'ldchao',
          inviteeId: 1,
          invitee: '海龙',
          mid: 2,
          mapTitle: '测试',
          state: 'refuse'
        },
        {
          id: 3,
          inviterId: 3,
          inviter: 'ldchao',
          inviteeId: 1,
          invitee: '海龙',
          mid: 2,
          mapTitle: '测试',
          state: 'unprocessed'
        },
        {
          id: 4,
          inviterId: 3,
          inviter: 'ldchao',
          inviteeId: 1,
          invitee: '海龙',
          mid: 2,
          mapTitle: '测试',
          state: 'unprocessed'
        }
      ]
    }
  },
  methods: {
    addActivity () {
      let param = new URLSearchParams()
      param.append('mid', this.$route.params.id)
      param.append('title', this.add_title)
      param.append('desc', this.add_desc)
      let self = this
      axios.post(this.baseUrl + '/activity/add_activity', param).then((res) => {
        self.activityList.push(res.data)
        self.show = false
        console.log('添加成功')
        this.add_title = ''
        this.add_desc = ''
      })
    }
  },
  mounted () {
    let self = this
    axios.get(this.baseUrl + '/activity/get_activity', {
      params: {
        mid: self.$route.params.id
      }
    }).then((res) => {
      self.activityList = res.data
    })
  }
}
</script>

<style scoped>
  .concreteMap_list_li {
    border-left: 1px solid #D3D3D3;
    padding-left: 10px;
    padding-right: 10px;
  }

  @import "../assets/css/map.css";
</style>
