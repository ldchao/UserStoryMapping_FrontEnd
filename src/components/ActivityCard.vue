<template>
  <div>
    <div>
      <b-card class="css_activity"
              :title="title"
              header-tag="header"
              footer-tag="footer" >
        <div style="margin-top: 40px;">
          <!--<label style="float:left">{{storyPoint}}</label>-->
          <b-btn variant="outline-info" size="sm" style="float:right;" @click="deleteActivity">删除</b-btn>
          &nbsp;
          <b-btn variant="outline-info" size="sm" style="float:right;margin-right: 5px" v-b-modal="'activity_modal_'+id">编辑 </b-btn>


        </div>
        <!--<p class="card-text">
        Header and footers using slots.</p>-->
      </b-card>

      <b-modal :id="'activity_modal_'+id"
               centered
               hide-footer
               title="Modal Variants"
               headerBgVariant="info"
               headerTextVariant="light"
               bodyBgVariant="light"
               bodyTextVariant="dark">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <b-col cols="9">
              <template>
                <div>
                  <b-form>
                    <b-form-group label="标题:"
                                  label-for="title">
                      <b-form-input type="text"
                                    v-model="title"
                                    required
                                    placeholder="Enter title">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group label="描述:"
                                  label-for="desc">
                      <b-form-textarea placeholder="Enter some description"
                                       v-model="desc"
                                       :rows="4"
                                       :max-rows="6">
                      </b-form-textarea>
                      <b-button type="submit" variant="primary" style="margin-top: 10%;float: left">提交</b-button>
                    </b-form-group>
                  </b-form>
                </div>
              </template>
            </b-col>
            <b-col cols="3">
              <ul>
                <li>crated by ldchao</li>
                <li>Created about a month ago</li>
              </ul>
            </b-col>
          </b-row>
        </b-container>
      </b-modal>

      <!-- modal-variant-1.vue -->
    </div>
    <ul class="map_list_ul">
      <li v-for="taskItem in taskList" class="map_list_li">
        <task-card :ref="taskItem.tid" :id="taskItem.tid" :title="taskItem.title" :desc="taskItem.desc"></task-card>
      </li>
      <li class="map_list_li">
        <b-btn variant="outline-success" class="css_add" v-b-modal="'add_task'+id">添加task
        </b-btn>
        <b-modal v-model="modal_show"  centered :id="'add_task'+id" title="新建task" style="text-align : left">
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
            <p class="float-left">Modal Footer Content</p>
            <b-btn size="sm" class="float-right" variant="primary" @click="addTask">
              OK
            </b-btn>
          </div>
        </b-modal>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>

import TaskCard from './TaskCard'

export default {
  name: 'ActivityCard',
  components: { TaskCard },
  props: {
    id: Number,
    title: String,
    desc: String
  },
  data () {
    return {

      baseUrl: process.env.VUE_APP_URL,
      modal_show:false,
      add_title: '',
      add_desc: '',
      taskList: [],
    }
  },
  computed: {
    // // 计算属性的 getter
    // storyPoint: function () {
    //   // `this` 指向 vm 实例
    //   let points = 0;
    //   // for( let i of this.taskList){
    //   //   points+=this.$refs.'(i.tid)'.storyPoint
    //   // }
    //   return points
    // }
  },
  methods: {
    deleteActivity () {
      let param = new URLSearchParams()
      param.append('aid', this.id)
      let self = this

      axios.post(this.baseUrl + '/activity/delete_activity', param).then((res) => {
        switch (res.data) {
          case 'success':
            console.log('删除成功')
            let index =-1;
            for (let i = 0; i < self.$parent.activityList.length; i++) {
              if (self.$parent.activityList[i].aid == this.id){
                index =i;
                break;
              }
            }
            if (index > -1) {
              self.$parent.activityList.splice(index, 1);
            }
            break
          case 'fail':
            console.log('删除失败!!!!!!')
            break
        }
      })
      console.log('delete success')
    },
    addTask(){
      let param = new URLSearchParams()
      param.append('aid', this.id)
      param.append('title', this.add_title)
      param.append('desc', this.add_desc)
      let self = this
      axios.post(this.baseUrl+'/task/add_task', param).then((res) => {
        self.taskList.push(res.data)
        self.modal_show = false
        console.log("添加成功")
        this.add_title = ''
        this.add_desc = ''
      })
    }
  },
  mounted () {
    let self = this
    axios.get(this.baseUrl + '/task/get_task', {
      params: {
        aid: self.id
      }
    }).then((res) => {
      self.taskList = res.data
    })
  }
}
</script>

<style scoped lang="scss">
  .css_activity {
    width: 200px;
    height: 130px;
    margin-left: 5px;
    margin-top: 5px;
    float: top;
    background-color: lightblue;

  }

  @import "../assets/css/map.css";
</style>
