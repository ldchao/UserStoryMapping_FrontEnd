<template>
  <b-container>
    <b-row>
      <b-col cols="3"></b-col>
      <b-col cols="6" class="login_card">
        <b-card img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Card image"
                img-top>
          <b-form>
            <p v-if="showHint" variant="info" style="font-size: large;color:red">{{hint}}</p>
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
            <b-row>
              <b-col cols="3"><label class="card-text">确认密码：</label></b-col>
              <b-col cols="9">
                <b-form-input type="password"
                              v-model="form.confirmPassword"
                              required
                              placeholder="confirm your password">
                </b-form-input>
              </b-col>
            </b-row>

            <b-row class="buttons">
              <b-col cols="6"></b-col>
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

export default {
  name: 'register',
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      form: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      hint: '注册',
      showHint: true,
    }
  },
  methods: {
    register () {
      // console.log(this.form.username)
      // console.log(this.form.password)
      if (!(this.form.username&&this.form.password&&this.form.confirmPassword)) {
        this.showHint = true
        this.hint = '请输入完整'
      } else if (this.form.password != this.form.confirmPassword) {
        this.showHint = true
        this.hint = '两次输入密码不一致'
      } else {
        let param = new URLSearchParams()
        param.append('username', this.form.username)
        param.append('password', this.form.password)
        let self = this

        axios.post(this.baseUrl + '/user/register', param).then((res) => {
          switch (res.data) {
            case 'success':
              self.showHint = true
              self.hint = '注册成功'
              console.log('注册成功')
              self.$router.push('/')
              break
            case 'username_existed':
              self.showHint = true
              self.hint = '用户名已存在'
              console.log('注册失败,用户名已存在')
              break
          }
        })

      }
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
