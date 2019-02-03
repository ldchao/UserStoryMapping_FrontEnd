<template>
  <div>
    <b-card class = "css_story"
            :title="title"
            header-tag="header"
            footer-tag="footer" v-b-modal="'story_modal_'+id">
      <div style="margin-top: 40px;">
        <label style="float:left">{{storyPoint}}</label>
        <b-btn variant="outline-warning" size="sm" style="float:right;" @click="deleteStory">删除
        </b-btn>
        &nbsp;
        <b-btn variant="outline-warning" size="sm" style="float:right;margin-right: 5px" v-b-modal="'story_modal_'+id">编辑 </b-btn>
      </div>
      <!--<p class="card-text">
      Header and footers using slots.</p>-->
    </b-card>
    <!--card with a footer-->
    <b-modal :id="'story_modal_'+id"
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
                    <b-button type="submit" variant="primary"  style="margin-top: 10%;float: left">提交</b-button>
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
</template>

<script>
export default {
  name: 'StoryCard',
  props: {
    id: Number,
    title: String,
    desc: String,
    storyPoint: Number
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      // add_title: '',
      // add_desc: ''

    }
  },
  methods: {
    deleteStory () {
      let param = new URLSearchParams()
      param.append('sid', this.id)
      let self = this

      axios.post(this.baseUrl + '/story/delete_story', param).then((res) => {
        switch (res.data) {
          case 'success':
            // self.$router.go(0)
            console.log('删除成功')
            let index =-1;
            for (let i = 0; i < self.$parent.storyList.length; i++) {
              if (self.$parent.storyList[i].sid == this.id){
                index =i;
                break;
              }
            }
            if (index > -1) {
              self.$parent.storyList.splice(index, 1);
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
  .css_story{
    width:200px;
    height: 130px;
    margin:5px;
    /*float:left;*/
    background-color: lightyellow;

  }
</style>
