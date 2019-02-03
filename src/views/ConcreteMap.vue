<template>
  <b-container fluid>
    <Navbar></Navbar>
    <div class="main-wrapper">
      <div class="map_list">
        <ul class="map_list_ul">
          <li v-for="activityItem in activityList" class="map_list_li concreteMap_list_li">
            <acticity-card :id="activityItem.aid" :title="activityItem.title" :desc="activityItem.desc"></acticity-card>
          </li>
          <li class="map_list_li concreteMap_list_li">
            <b-btn href="#" variant="outline-info" class="css_add"  v-b-modal.add_activity>添加activity
            </b-btn>
            <b-modal v-model="show"  centered id="add_activity" title="新建activity" style="text-align : left">
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
                                   v-model="add_des"
                                   :max-rows="6">
                  </b-form-textarea>
                </b-form-group>
              </b-form>
              <div slot="modal-footer" class="w-100">
                <p class="float-left">Modal Footer Content</p>
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
    </div>

  </b-container>
</template>

<script>
import Navbar from '../components/Navbar'
import ActicityCard from '../components/ActivityCard'

export default {
  name: 'ConcreteMap',
  components: { ActicityCard, Navbar },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      add_title: '',
      add_des: '',
      activityList: [],
      show:false
    }
  },
  methods:{
    addActivity(){
      let param = new URLSearchParams()
      param.append('mid', this.$route.params.id)
      param.append('title', this.add_title)
      param.append('desc', this.add_des)
      let self = this
      axios.post(this.baseUrl+'/activity/add_activity', param).then((res) => {
        self.activityList.push(res.data)
        self.show = false
        console.log("添加成功")
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
