<template>
  <div>
    <b-card class = "css_story"
            :title="title"
            header-tag="header"
            footer-tag="footer" v-b-modal="'story_modal_'+id">
      <div style="margin-top: 40px;">
        <label style="float:left">{{storyPoint}}</label>
        <b-button href="#" variant="outline-warning" size="sm" style="float:right;">删除
        </b-button>
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
    storyPoint: Number
  },
  data () {
    return {
      form: {
        title: '',
        desc: ''
      }
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
