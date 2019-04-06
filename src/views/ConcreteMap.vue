<template>
  <b-container fluid>
    <Navbar :is-map="true"></Navbar>
    <div class="main-wrapper">
      <b-row>
        <b-col cols="1">
          <div class="release_style">
            <hr>
            <div v-show="has_release">
              <br>
              <h4>release1</h4>
              <br>
              <p>开始时间：</p>
              <p>{{releaseList[0].startAt | formatDate}}</p>
              <p>结束时间：</p>
              <p>{{releaseList[0].endAt | formatDate}}</p>
              <br>
              <b-btn v-b-modal.chart @click="get_burn_down" variant="outline-success">查看燃尽图</b-btn>
              <b-modal id="chart" size="lg" centered title="燃尽图">
                <b-row>
                  <b-col cols="1"></b-col>
                  <b-col cols="10">
                    <div>
                      <e-charts :options="burn_down_chart">this is a echart</e-charts>
                    </div>
                  </b-col>
                  <b-col cols="1"></b-col>
                </b-row>
              </b-modal>
            </div>

            <div v-show="!has_release">
              <b-btn v-b-modal.add_release variant="outline-success">添加release</b-btn>
              <b-modal id="add_release" centered title="添加release">
                <b-form-group label="开始时间:"
                              label-for="title">
                  <b-form-input class="time_input" type="datetime-local" v-model="startAt"></b-form-input>
                </b-form-group>
                <b-form-group label="结束时间:"
                              label-for="title">
                  <b-form-input class="time_input" type="datetime-local" v-model="endAt"></b-form-input>
                </b-form-group>
                <div slot="modal-footer" class="w-100">
                  <b-button style="float: right" variant="primary" @click="add_release">添加</b-button>
                </div>
              </b-modal>
            </div>
          </div>
        </b-col>
        <b-col cols="11">
          <div class="map_list">
            <ul class="map_list_ul">
              <li v-for="activityItem in activityList" class="map_list_li concreteMap_list_li">
                <acticity-card :id="activityItem.aid" :title="activityItem.title"
                               :desc="activityItem.desc"></acticity-card>
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
        </b-col>
      </b-row>
      <b-modal centered id="invite_people" title="邀请成员" style="text-align : left">
        <b-form>
          <b-form-group label="邀请成员:"
                        label-for="invite_input">
            <b-row>
              <b-col cols="10">

                <b-form-input id="invite_input" list="invite-list-id" placeholder="邀请人" v-model="invitee_id"/>
                <datalist id="invite-list-id">
                  <option v-for="invite in invite_list" v-bind:value="invite.id">{{ invite.username }}</option>
                </datalist>
              </b-col>
              <b-col cols="2">
                <b-btn variant="primary" @click="invite_people" style="margin-left: -10px">邀请</b-btn>
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
        <div style="height:400px; overflow-y:scroll;">
          <edit-item v-for="editItem in editList" :edit-item="editItem"></edit-item>
        </div>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import Navbar from '../components/Navbar'
import ActicityCard from '../components/ActivityCard'
import InviteLogItem from '../components/InviteLogItem'
import EditItem from '../components/EditItem'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { getCookie } from '../assets/Cookie'
import { formatDate } from '../assets/js/date.js'

export default {
  name: 'ConcreteMap',
  components: { ECharts, EditItem, ActicityCard, Navbar, InviteLogItem },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      add_title: '',
      invitee_id: '',
      add_desc: '',
      startAt: '',
      endAt: '',
      activityList: [],
      invite_list: [],
      show: false,
      inviteLogList: [],
      editList: [],
      releaseList: [],
      l_data: [],
      l_date: []
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  computed: {
    // 计算属性的 getter
    has_release: function () {
      return this.releaseList.length > 0
    },
    startTimeStamp: function () {
      return new Date(this.startAt).getTime()
    },
    endTimeStamp: function () {
      return new Date(this.endAt).getTime()
    },
    burn_down_chart: function () {
      return {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.l_date
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.l_data,
          type: 'line',
          areaStyle: {}
        }]
      }
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
    },
    invite_people () {
      let param = new URLSearchParams()
      param.append('mapId', this.$route.params.id)
      param.append('inviteeId', this.invitee_id)
      param.append('inviterId', getCookie('userId'))
      let self = this
      axios.post(this.baseUrl + '/invite/invite_user', param).then((res) => {
        self.inviteLogList.push(res.data)
        console.log('邀请成功')
        this.invitee_id = ''
      })
    },
    add_release () {
      let param = new URLSearchParams()
      param.append('mid', this.$route.params.id)
      param.append('startAt', this.startTimeStamp)
      param.append('endAt', this.endTimeStamp)
      let self = this
      axios.post(this.baseUrl + '/release/add_release', param).then((res) => {
        self.releaseList.push(res.data)
        console.log('添加成功')
      })
    },
    get_burn_down () {
      let self = this
      axios.get(this.baseUrl + '/release/burn_down_chart', {
        params: {
          rid: self.releaseList[0].rid
        }
      }).then((res) => {
        console.log(self.releaseList[0].rid +" "+res.data)
        self.l_data = []
        self.l_date = []
        for (let key in res.data) { // 遍历Map
          self.l_date.push(key)
          self.l_data.push(res.data[key])
        }
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

    axios.get(this.baseUrl + '/release/get_release', {
      params: {
        mid: self.$route.params.id
      }
    }).then((res) => {
      self.releaseList = res.data
    })

    axios.get(this.baseUrl + '/user/search_user', {
      params: {
        name: ''
      }
    }).then((res) => {
      self.invite_list = res.data
    })

    axios.get(this.baseUrl + '/editlog/get_editlog_map', {
      params: {
        mid: self.$route.params.id
      }
    }).then((res) => {
      self.editList = res.data
    })

    axios.get(this.baseUrl + '/invite/check_invite', {
      params: {
        uid: getCookie('userId')
      }
    }).then((res) => {
      self.inviteLogList = res.data
    })
  }
}
</script>

<style scoped>
  @import "../assets/css/map.css";

  .concreteMap_list_li {
    border-left: 1px solid #D3D3D3;
    padding-left: 10px;
    padding-right: 10px;
  }

  /*高度>0*/
  .release_style {
    margin-top: 287px;
  }

  .time_input {
    margin-top: 5px;
  }

</style>
