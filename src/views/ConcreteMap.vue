<template>
  <b-container fluid>
    <Navbar></Navbar>
    <acticity-card   :title="title" :story-point="storyPoint"></acticity-card>
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
      title: 'Hello World',
      storyPoint: 19
    }
  }
}
</script>

<style scoped>

</style>
