<template>
  <div class="mapItem">
    <b-card :title=mapItem.mapTitle :id="'mapItem'+mapItem.id" v-show="show">
      <p class="card-text">
        {{mapItem.mapDesc}}
      </p>
      <b-link :to="'concreteMap/'+mapItem.id"
              class="card-link">查看map
      </b-link>
      <b-link href="#"
              class="card-link" @click="deleteMap">删除Map
      </b-link>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'MapItem',
  props: {
    mapItem: {
      id: Number,
      mapTitle: String,
      mapDesc: String
    }
  },
  data(){
    return{
      baseUrl: process.env.VUE_APP_URL,
      show:true
    }
  },
  methods: {
    deleteMap () {
      let param = new URLSearchParams()
      param.append('mapId', this.mapItem.id)
      let self = this

      axios.post(this.baseUrl+'/map/delete_map',param).then((res)=>{
        switch (res.data) {
          case 'success':
            this.show = false
            console.log('删除成功')
            break;
          case 'fail':
            console.log('删除失败!!!!!!')
            break;
        }
        })
      console.log('delete success')
    }
  },
  mounted () {

    console.log('mapItem id:      ' + this.mapItem.id)
  }
}
</script>

<style scoped>
  .mapItem {
    margin: 10px 0
  }
</style>
