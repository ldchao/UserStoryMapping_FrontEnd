<template>
  <div class="mapItem">
    <b-card :title=mapItem.mapTitle>
      <p class="card-text">
        {{mapItem.mapDesc}}
      </p>
      <b-link :to="'concreteMap/'+mapItem.id"
              class="card-link">Card link
      </b-link>
      <b-link href="#"
              class="card-link">删除Map
      </b-link>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'MapItem',
  props: {
    mapItem: {
      id: String,
      mapTitle: String,
      mapDesc: String
    }
  }
}
</script>

<style scoped>
.mapItem{
  margin:10px 0
}
</style>
