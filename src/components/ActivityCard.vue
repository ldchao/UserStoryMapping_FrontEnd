<template>
  <div>
    <b-row>
      <b-col cols="3">
        <b-card :title="title"
                header-tag="header"
                footer-tag="footer" v-b-modal.model_demo>
          <em slot="footer">
            <label style="float:left">{{storyPoint}}</label>
            <b-button href="#"
                      variant="primary" style="float:right;font-weight: bold">-
            </b-button>
          </em>
          <p class="card-text">Header and footers using slots.</p>
        </b-card>
        <!--card with a footer-->
        <b-modal v-model="show" id="model_demo"
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
                      <b-form-group id="exampleInputGroup1"
                                    label="标题:"
                                    label-for="title">
                        <b-form-input id="title"
                                      type="text"
                                      v-model="form.title"
                                      required
                                      placeholder="Enter title">
                        </b-form-input>
                      </b-form-group>
                      <b-form-group id="exampleInputGroup2"
                                    label="描述:"
                                    label-for="desc">
                        <b-form-textarea id="desc"
                                         placeholder="Enter some description"
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

      </b-col>
    </b-row>
    <!-- modal-variant-1.vue -->
  </div>
</template>

<script>
export default {
  name: 'ActivityCard',
  props: {
    id: String,
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

<style scoped>
</style>
