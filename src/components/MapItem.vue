<template>
  <div>
    <b-card no-body
            bg-variant="default"
            style="max-width: 20rem;"
            img-src="https://placekitten.com/380/200"
            img-alt="Image"
            img-top>
      <h4 slot="header">{{mapName}}</h4>
      <b-card-body>
        <p class="card-text">
          {{mapInfo}}
        </p>
      </b-card-body>
      <b-list-group>
        <b-list-group-item>创建者：卢海龙</b-list-group-item>
        <b-list-group-item>创建时间：2017/1/28</b-list-group-item>
        <b-list-group-item>最后修改时间：2017/1/28</b-list-group-item>
      </b-list-group>
      <b-card-body>
        <a href="#"
           class="card-link">Card link</a>
      </b-card-body>
    </b-card>
  </div>

  <!-- card-kitchen-1.vue -->
</template>

<script>
export default {
  name: 'MapItem',
  props: {
    mapName: String,
    mapInfo: String
  }
}
</script>

<style scoped>

</style>
