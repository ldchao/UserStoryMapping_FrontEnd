<template>
  <b-container>
    <b-row>
      <b-col cols="3"></b-col>
      <b-col cols="6" class="login_card">
        <b-card img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Card image"
                img-top>
          <b-form>
            <p variant="info" v-if="showHint" style="font-size: large;color:red">{{hint}}</p>
            <b-row>
              <b-col cols="3"><label class="card-text">用户名:</label></b-col>
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
              <b-col cols="3"><label class="card-text">密码：</label></b-col>
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
                <b-button  variant="primary" @click="submit">登录</b-button>
              </b-col>
              <b-col cols="6">
                <b-button variant="primary" @click="register">注册</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {setCookie,getCookie} from '../assets/Cookie'

export default {
  name: 'login',
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      form: {
        username: '',
        password: ''
      },
      hint: 'initial',
      showHint: false
    }
  },
  methods: {
    submit () {
      console.log(this.form.username)
      console.log(this.form.password)
      let param = new URLSearchParams()
      param.append('username', this.form.username)
      param.append('password', this.form.password)

      let self = this
      axios.post(this.baseUrl+'/user/login', param).then((res) => {
        switch (res.data.loginMessage) {
          case 'success':
            self.showHint = true
            self.hint = '登录成功'
            console.log("登录成功")
            setCookie('username',self.form.username)
            setCookie('userId',res.data.id)

            setTimeout(function(){
              self.$router.push('/mapList')
            }.bind(this),1000)
            break;
          case 'no_user':
            self.showHint = true
            self.hint = '用户名不存在'
            console.log("用户名不存在")
            break;
          case 'wrong_password':
            self.showHint = true
            self.hint = '密码错误'
            console.log("密码错误")
            break;
        }
      })
    },
    register(){
      this.$router.push('/register')
    }
  },
  mounted(){
    if (getCookie('username')){
      this.$router.push('/mapList')
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

  .card-text {
    font-size: 18px;
    /*font-weight: bold;*/
  }
</style>
