<template>
  <div>
    <v-container fill-height fluid class="bluesetcenterrrr">
      <v-layout row wrap class="bluesetcenter">
        <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12 mb-5">
                  <v-row >
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center">เข้าสู่ระบบ</h1>
                        <h4 class="text-center mt-1 mb-4 text-disabled">Management System</h4>
                        <v-form>
                      <v-text-field
                          v-model="admin.user"
                          dense
                          :rules="[rules.required]"
                          label="Username"
                          color="teal-accent-3"                   
                      >
                      </v-text-field>
                      <v-text-field
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                          v-model="admin.pass"
                          dense
                          :rules="[rules.required]"
                          label="Password"
                          color="teal-accent-3"
                          class="set-eye"
                      >
                      </v-text-field>
                      <div class="text-center">
                        <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="mb-5" @click="login">
                          Login
                        </v-btn>
                      </div>
                      </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="wall">
                      <v-card-text class="mt-12" style="color: white !important;">
                        <h1 class="text-center">Hello, Friend!</h1>
                        <h1 class="text-center">♡</h1>
                      </v-card-text>
                    </v-col>
                  </v-row>
            </v-card>
            <div class="mt-10 text-caption text-disabled text-center">
              &copy;Scholarship Activity 2023
            </div>
          </v-col>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
//import HelloWorld from '@/components/HelloWorld.vue'
export default {
  setup() {
    return {
    }
  },
  data() {
    return {
      admin: {
        user: this.$store.getters.getAdmin.user,
        pass: this.$store.getters.getAdmin.pass,
      },
      rules: {
        required: value => !!value || 'required.',
      },
      show: false,
      password: 'Password',
      }
  },
  mounted() {
  },
  methods: {
    login() {
      this.$store.dispatch('setAdmin', this.admin)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "user": this.$store.getters.getAdmin.user,
          "pass": this.$store.getters.getAdmin.pass,
      });

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch("https://apricot-binturong-kit.cyclic.app/adminlogin", requestOptions)
      .then(response => response.json())
      .then(result => {
          if(result.status === 'ok') {
            console.log(result)
            this.$router.push('adminactivity');
          } else if(result.message === 'login failed') {
              alert('Username หรือ Password ไม่ถูกต้อง')
          } else {
              alert(JSON.stringify(result))
          }
      })
      .catch(error => console.log('error', error));
    }
  },
  computed: {
  },
}
</script>

<style lang="scss" scoped>
.wall {
  background-image: url('../assets/wallp.png');
}
.bluesetcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.bluesetcenterrrr {
  position: fixed; /* or absolute fixed*/
  top: 15%;
  //left: 50%;
}
@media only screen and (max-width: 600px) {
  .bluesetcenterrrr {
    position: fixed;
    top: 5%;
  }
}
</style>