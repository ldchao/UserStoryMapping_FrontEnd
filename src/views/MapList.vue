<template>
  <div>
    <Navbar></Navbar>
    <div class="main-wrapper">
      <b-row>
        <b-col cols="2"/>
        <b-col cols="8">
          <div style="text-align: center;margin-top: 20px">
            <h1 style="display: inline-block">我的Map列表</h1>
            <b-btn class="add_button" variant="outline-success" v-b-modal.add_map >添加</b-btn>
            <b-modal v-model="show" centered id="add_map" title="新建Map" style="text-align : left">
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
                <p class="float-left"></p>
                <b-btn size="sm" class="float-right" variant="primary" @click="addMap">
                  OK
                </b-btn>
              </div>
            </b-modal>
          </div>
          <div v-for="mapItem in mapList" :key="mapItem.id">
            <map-item :map-item="mapItem"></map-item>
          </div>
        </b-col>
        <b-col cols="2"/>
      </b-row>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import Navbar from '../components/Navbar'
import MapItem from '../components/MapItem'
import { getCookie } from '../assets/Cookie'
export default {
  name: 'MapList',
  components: { MapItem, Navbar },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      mapList: [],
      add_title: '',
      add_des: '',
      show:false
    }
  },
  methods:{
    addMap(){
      let param = new URLSearchParams()
      param.append('userId', getCookie('userId'))
      param.append('mapTitle', this.add_title)
      param.append('mapDesc', this.add_des)
      let self = this
      axios.post(this.baseUrl+'/map/add_map', param).then((res) => {
        self.mapList.push(res.data)
        self.show = false
        console.log("添加成功")
      })
    }
  },
  mounted () {
    let self = this
    axios.get(this.baseUrl + '/map/map_list', {
      params: {
        userId: getCookie('userId')
      }
    }).then((res) => {
      self.mapList = res.data
      console.log(self.mapList)
    })
  }
}
</script>

<style scoped lang="scss">
  .add_button {
    float: right;
    display: inline-block;
    margin-top: 15px;
  }

  .main-wrapper {
    margin-top: 64px;
  }
</style>
