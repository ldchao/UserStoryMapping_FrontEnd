<template>
  <div>
    <div>
      <b-card class="css_task"
              :title="title"
              header-tag="header"
              footer-tag="footer" v-b-modal="'task_modal_'+id">
        <div style="margin-top: 40px;">
          <label style="float:left">{{storyPoint}}</label>
          <b-btn variant="outline-success" size="sm" style="float:right;" @click="deleteTask">删除
          </b-btn>
          &nbsp;
          <b-btn variant="outline-success" size="sm" style="float:right;margin-right: 5px" v-b-modal="'task_modal_'+id">编辑 </b-btn>
        </div>
        <!--<p class="card-text">
        Header and footers using slots.</p>-->
      </b-card>
      <!--card with a footer-->
      <b-modal :id="'task_modal_'+id"
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
    </div>
    <hr>
    <div v-for="storyItem in storyList">
      <story-card :id="storyItem.sid" :title="storyItem.title" :desc="storyItem.desc" :story-point="storyItem.points" :state="storyItem.state"></story-card>
    </div>
    <b-btn variant="outline-warning" class="css_add_story" v-b-modal="'add_story'+id">添加story
      </b-btn>
    <b-modal v-model="modal_show"  centered :id="'add_story'+id" title="新建story" style="text-align : left">
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
        <b-form-group label="故事点:"
                      label-for="points">
          <b-form-input type="text"
                        v-model="add_points"
                        required
                        placeholder="Enter story points">
          </b-form-input>
        </b-form-group>
      </b-form>
      <div slot="modal-footer" class="w-100">
        <p class="float-left"></p>
        <b-btn size="sm" class="float-right" variant="primary"  @click="addStory">
          OK
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>

import StoryCard from './StoryCard'

export default {
  name: 'TaskCard',
  components: { StoryCard },
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
      add_points: '',
      rid: 4,
      storyList: []
    }
  },
  computed: {
    // 计算属性的 getter
    storyPoint: function () {
      // `this` 指向 vm 实例
      let points = 0;
      for( let i of this.storyList){
        points+=i.points
      }
      return points
    }
  },
  methods: {
    deleteTask () {
      let param = new URLSearchParams()
      param.append('tid', this.id)
      let self = this

      axios.post(this.baseUrl + '/task/delete_task', param).then((res) => {
        switch (res.data) {
          case 'success':
            // self.$router.go(0)
            console.log('删除成功')
            let index =-1;
            for (let i = 0; i < self.$parent.taskList.length; i++) {
              if (self.$parent.taskList[i].tid == this.id){
                index =i;
                break;
              }
            }
            if (index > -1) {
              self.$parent.taskList.splice(index, 1);
            }
            break
          case 'fail':
            console.log('删除失败!!!!!!')
            break
        }
      })
      console.log('delete success')
    },
    addStory(){
      let param = new URLSearchParams()
      param.append('tid', this.id)
      param.append('rid', this.rid)
      param.append('title', this.add_title)
      param.append('desc', this.add_desc)
      param.append("points",this.add_points)
      let self = this
      axios.post(this.baseUrl+'/story/add_story', param).then((res) => {
        self.storyList.push(res.data)
        self.modal_show = false
        console.log("添加成功")
        this.add_title = ''
        this.add_desc = ''
        this.add_points = ''
      })
    }
  },
  mounted () {
    let self = this
    axios.get(this.baseUrl + '/story/get_story_task', {
      params: {
        tid: self.id
      }
    }).then((res) => {
      self.storyList = res.data
    })
  }
}
</script>

<style scoped lang="scss">
  .css_task {
    width: 200px;
    height: 130px;
    margin: 5px;
    /*float:left;*/
    background-color: lightgreen;
  }
  .css_add_story {
    width: 200px;
    height: 130px;
    margin-top: 5px;
    line-height:116px;
  }
</style>
