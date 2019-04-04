<template>
  <div>
    <Navbar></Navbar>
    <div class="main-wrapper">
      <b-row>
        <b-col cols="2"/>
        <b-col cols="8">
          <div style="text-align: center;margin-top: 20px">
            <h1>我的Map列表</h1>
          </div>
          <div style="height: 50px">
            <b-btn class="add_button" variant="outline-success" v-b-modal.add_map >添加</b-btn>
            <b-btn class="search_button" variant="outline-info" @click="searchMap">搜索</b-btn>
            <b-input class="search_input" placeholder="查找map" v-model="search_key"></b-input>
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
      allMapList: [],
      add_title: '',
      add_des: '',
      search_key:'',
      show:false
    }
  },
  computed: {
    mapList () {
      let lists = []
      this.allMapList.forEach(item => {
        if(item.mapTitle.indexOf(this.search_key) !== -1){
          lists.push(item)
        }
      })
      return lists
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
        self.allMapList.push(res.data)
        self.show = false
        console.log("添加成功")
      })
    },
    searchMap(){
      this.mapList=[]
      this.allMapList.forEach(item => {
        if(item.mapTitle.indexOf(this.search_key) !== -1){
          this.mapList.push(item)
        }
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
      self.allMapList = res.data
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
  .search_button {
    float: right;
    display: inline-block;
    margin-top: 15px;
    margin-right: 15px;
  }
  .search_input {
    float: right;
    display: inline-block;
    width: 200px;
    margin-top: 15px;
    margin-right: 5px;
  }
  .main-wrapper {
    margin-top: 64px;
  }
</style>
