<template>
    <div>
        <v-toolbar color="teal-accent-3">
            <template v-slot:prepend>
                <div class="text-h5" style="color: white !important;"><img src="/src/assets/logo.png" alt="" width="100"></div>
            </template>
            <v-divider
                class="ms-3"
                inset
                vertical
            ></v-divider>
            <v-toolbar-title style="color: white !important;">Scholarship Activity</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <!-- <v-toolbar-items>
                <v-btn variant="text" style="color: white !important;">Activity</v-btn>
                <v-divider vertical></v-divider>
                <v-btn variant="text" style="color: white !important;">Student</v-btn>
                <v-divider vertical></v-divider>
                <v-btn variant="text" style="color: white !important;">Teacher</v-btn>
            </v-toolbar-items> -->
            <v-divider vertical></v-divider>
            <v-app-bar-nav-icon class="ms-2" color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" temporary location="right">
            <v-list-item prepend-avatar="/src/assets/gur.png" title="Admin"></v-list-item>
            <v-divider></v-divider>
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Activity" value="activity" @click="toActivity"></v-list-item>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Student" value="student" @click="toStudent"></v-list-item>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Teacher" value="teacher" active></v-list-item>
                <v-list-item prepend-icon="mdi-logout-variant" title="Logout" value="logout" @click="logout"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center">
                    <div class="mt-5" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Teacher
                    </div>
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-2 text-caption text-disabled">
                        &copy;Scholarship Activity 2023
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { watchEffect } from 'vue'; 
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter();
        watchEffect(() => {
            const token = localStorage.getItem('token')
            fetch('https://apricot-binturong-kit.cyclic.app/authen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicaion/json',
                    'Authorization': 'Bearer '+token
                },
            })
            .then(response => response.json())
            .then(data => {
                if(data.status == 'ok') {
                    //alert('authen success')
                    console.log('authen success')
                } else {
                    alert('authen failed')
                    localStorage.removeItem('token')
                    //this.$router.push('create');
                    router.push({ path: '/' })
                }
            })
        })
    },
    data () {
      return {
        drawer: null,
      }
    },
    methods: {
        logout() {
            localStorage.removeItem('token')
            this.$router.push('/');
        },
        toActivity() {
            this.$router.push('adminactivity');
        },
        toStudent() {
            this.$router.push('adminstudent');
        },
        toTeacher() {
            this.$router.push('adminteacher');
        },
    },
}
</script>