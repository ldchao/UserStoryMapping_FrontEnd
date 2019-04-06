<template>
  <div class="editItem">
    <b-row>
      <b-col cols="5">操作用户：<span class="text-info">{{editItem.uid}}</span></b-col>
      <b-col cols="6">操作对象：<span class="text-info">{{editItem.type}}_{{editItem.itemId}}</span>
      </b-col>
    </b-row>
    <div>
    <span>操作描述：<span class="text-info">{{editItem.desc}}</span></span>
    </div>
    <div>
    <span>操作时间：<span class="text-info">{{editItem.time | formatDate}}</span></span>
    </div>
  </div>
</template>
<script>
import {formatDate} from '../assets/js/date.js';
export default {
  name: 'EditItem',
  props: {
    editItem: {
      id: Number,
      uid: Number,
      mid: Number,
      type: String,
      itemId: Number,
      desc: String,
      time: String,
      code: Number
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      show: true
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .editItem {
    margin: 5px 10px 5px 0;
    padding: 10px;
    text-align: left;
    border: 1px solid lightblue;
  }

  .button {
    /*margin-left: 10px;*/
  }
</style>
