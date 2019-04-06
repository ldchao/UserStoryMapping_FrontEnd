<template>
  <div>
    <b-card class="css_story"
            :title="title"
            header-tag="header"
            footer-tag="footer" v-b-modal="'story_modal_'+id">

      <div v-bind:class="state">
        <label>{{state}}</label>
      </div>
      <div style="margin-top: 40px;">
        <label style="float:left">{{storyPoint}}</label>
        <b-btn variant="outline-warning" size="sm" style="float:right;" @click="deleteStory">删除
        </b-btn>
        &nbsp;
        <b-btn variant="outline-warning" size="sm" style="float:right;margin-right: 5px" v-b-modal="'story_modal_'+id">
          编辑
        </b-btn>
      </div>
      <!--<p class="card-text">
      Header and footers using slots.</p>-->
    </b-card>
    <!--card with a footer-->
    <b-modal v-model="modal_show" :id="'story_modal_'+id"
             centered
             hide-footer
             title="Modal Variants"
             headerBgVariant="info"
             headerTextVariant="light"
             bodyBgVariant="light"
             bodyTextVariant="dark">
      <b-container fluid>
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
                                 :rows="4"
                                 v-model="desc"
                                 :max-rows="6">
                </b-form-textarea>
              </b-form-group>
              <b-form-group label="故事点:"
                            label-for="points">
                <b-form-input type="text"
                              v-model="storyPoint"
                              required
                              placeholder="Enter story points">
                </b-form-input>
              </b-form-group>
              <b-form-group label="故事状态:"
                            label-for="points">
                <b-form-select
                  v-model="state"
                  :options="states"
                ></b-form-select>
              </b-form-group>
              <b-form-group>
                <b-button variant="primary" style="margin-top: 10%;float: right" @click="updateStory">提交</b-button>
              </b-form-group>
            </b-form>
          </div>
        </template>
      </b-container>
    </b-modal>

    <!-- modal-variant-1.vue -->
  </div>
</template>

<script>
export default {
  name: 'StoryCard',
  props: {
    id: Number,
    title: String,
    desc: String,
    storyPoint: Number,
    state: String
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      states:['undo','doing','done'],
      modal_show:false
      // add_title: '',
      // add_desc: ''

    }
  },
  methods: {
    updateStory(){
      let param = new URLSearchParams()
      param.append('sid', this.id)
      param.append('state', this.state)
      param.append('title', this.title)
      param.append('desc', this.desc)
      param.append("points",this.storyPoint)
      let self = this
      axios.post(this.baseUrl+'/story/update_story', param).then((res) => {
        self.modal_show = false
        console.log("添加成功")
      })
    },
    deleteStory () {
      let param = new URLSearchParams()
      param.append('sid', this.id)
      let self = this

      axios.post(this.baseUrl + '/story/delete_story', param).then((res) => {
        switch (res.data) {
          case 'success':
            // self.$router.go(0)
            console.log('删除成功')
            let index = -1
            for (let i = 0; i < self.$parent.storyList.length; i++) {
              if (self.$parent.storyList[i].sid == this.id) {
                index = i
                break
              }
            }
            if (index > -1) {
              self.$parent.storyList.splice(index, 1)
            }
            break
          case 'fail':
            console.log('删除失败!!!!!!')
            break
        }
      })
      console.log('delete success')
    }
  }
}
</script>

<style scoped lang="scss">
  .css_story {
    width: 200px;
    height: 130px;
    margin: 5px;
    /*float:left;*/
    background-color: lightyellow;

  }

  .undo {
    position: absolute;
    width: 50px;
    background-color: lightgray;
    height: 25px;
    /*border:1px solid red;*/
    right: 5px;
    top: 0;
    z-index: 100;
  }

  .doing {
    position: absolute;
    width: 50px;
    background-color: gold;
    height: 25px;
    /*border:1px solid red;*/
    right: 5px;
    top: 0;
    z-index: 100;
  }

  .done {
    position: absolute;
    width: 50px;
    background-color: #4FC1E9;
    height: 25px;
    /*border:1px solid red;*/
    right: 5px;
    top: 0;
    z-index: 100;
  }
</style>
