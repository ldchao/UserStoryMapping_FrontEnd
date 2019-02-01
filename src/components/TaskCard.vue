<template>
  <div>
    <div>
      <b-card class="css_task"
              :title="title"
              header-tag="header"
              footer-tag="footer" v-b-modal="'task_modal_'+id">
        <div style="margin-top: 40px;">
          <label style="float:left">{{storyPoint}}</label>
          <b-button href="#" variant="outline-success" size="sm" style="float:right;">删除
          </b-button>
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
                                    v-model="form.title"
                                    required
                                    placeholder="Enter title">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group label="描述:"
                                  label-for="desc">
                      <b-form-textarea placeholder="Enter some description"
                                       v-model="form.desc"
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
    <div v-for="storyItem in form.storyList">
      <story-card :id="storyItem.id" :title="storyItem.title" :story-point="storyItem.storyPoint"></story-card>
    </div>
    <b-button href="#" variant="outline-warning" class="css_add_story">添加story
      </b-button>
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
    storyPoint: Number
  },
  data () {
    return {
      form: {
        title: '',
        desc: '',
        storyList: [
          { id:this.id*3+1, title: 'Hello World', storyPoint: 19 },
          { id:this.id*3+2, title: 'Hello World', storyPoint: 19 },
          { id:this.id*3+3, title: 'Hello World', storyPoint: 19 }
        ]
      }
    }
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
