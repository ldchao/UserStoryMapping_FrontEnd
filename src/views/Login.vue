<template>
  <b-container>
    <b-row>
      <b-col cols="3"></b-col>
      <b-col cols="6" class="login_card">
        <b-card img-src="https://placekitten.com/1000/300"
                img-alt="Card image"
                img-top>
          <b-form @submit="onSubmit" v-if="show">
            <b-row>
              <b-col cols="3"><label for="exampleInput1" class="card-text">用户名:</label></b-col>
              <b-col cols="9">
                <b-form-input id="exampleInput1"
                              type="text"
                              v-model="form.username"
                              required
                              placeholder="username">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"><label for="exampleInput2" class="card-text">密码：</label></b-col>
              <b-col cols="9">
                <b-form-input id="exampleInput2"
                              type="password"
                              v-model="form.password"
                              required
                              placeholder="password">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row class="buttons">
              <b-col cols="6">
                <b-button type="submit" variant="primary">登录</b-button>
              </b-col>
              <b-col cols="6">
                <b-button type="submit" variant="primary">注册</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#009688')
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', '')
  }
}
</script>

<!-- b-form-1.vue -->
<style scoped>

  .buttons {
    margin-top: 5%;
  }

  .login_card {
    margin-top: 15%;
  }
  .card-text{
    font-size: 18px;
    /*font-weight: bold;*/
  }
</style>
