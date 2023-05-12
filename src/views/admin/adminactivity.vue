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
            <v-divider vertical></v-divider>
            <v-app-bar-nav-icon class="ms-2" color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" temporary location="right">
            <v-list-item prepend-avatar="/src/assets/gur.png" title="Admin"></v-list-item>
            <v-divider></v-divider>
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Activity" value="activity" active></v-list-item>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Student" value="student" @click="toStudent"></v-list-item>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Teacher" value="teacher" @click="toTeacher"></v-list-item>
                <v-list-item prepend-icon="mdi-logout-variant" title="Logout" value="logout" @click="logout"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center">
                    <div class="mt-5" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Activity
                    </div>
                    <div>
                        <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="mt-5 mb-4" @click="logout">
                          Create
                        </v-btn>
                      </div>
                </v-col>
                <v-col cols="12">
                    <!-- <input type="text" v-model="input" placeholder="Search activities..." /> -->
                    <v-text-field
                    type="text" v-model="input" 
                    density="compact"
                    variant="solo"
                    label="Search activities..."
                    append-inner-icon="mdi-magnify"
                    single-line
                    hide-details
                    ></v-text-field>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left text-caption">
                                กิจกรรม
                                </th>
                                <th class="text-left text-caption">
                                วันที่สร้างกิจกรรม
                                </th>
                                <th class="text-left text-caption">
                                คณะ
                                </th>
                                <th class="text-left text-caption">
                                ชั่วโมงกิจกรรมที่จะได้รับ
                                </th>
                                <th class="text-left text-caption">
                                จำนวนผู้ลงทะเบียน
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in filteredItems" :key="i.id">
                                <td class="text-caption bluehover" :act="i" style="cursor: pointer;" @click="openActivity(i)">{{ i.name }}</td>
                                <td class="text-caption">{{ i.createdAt.substring(0,10) }}</td>
                                <td class="text-caption">{{ i.faculty }}</td>
                                <td class="text-caption"><v-chip small color="secondary" class="white--text">{{ i.hoursToReceive }}</v-chip></td>
                                <td class="text-caption"><v-chip small color="secondary" class="white--text">{{ i.countenroll }}/{{ i.max }}</v-chip></td>
                            </tr>
                        </tbody>
                    </v-table>
                    <p v-if="input&&!filteredItems.length" class="text-caption text-center mt-2">
                        <v-icon size="large">mdi-file-search-outline</v-icon>No results found!
                    </p>
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
import { watchEffect, ref } from 'vue'; 
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter();
        //const activitys = ref([])
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

            // fetch('https://apricot-binturong-kit.cyclic.app/activitys')
            // .then(res => res.json())
            // .then((result) => {
            //     if(result.status === 'error') {
            //         alert(JSON.stringify(result))
            //     } else {
            //         activitys.value = result
            //         console.log(result)
            //     }
            // })
        })

        return {
            // activitys
        }
    },
    mounted() {
        fetch('https://apricot-binturong-kit.cyclic.app/activitys')
        .then(res => res.json())
        .then((result) => {
            if(result.status === 'error') {
                alert(JSON.stringify(result))
            } else {
                this.activitys = result
                console.log(result)
            }
        })
    },
    computed: {
        filteredItems() {
            return this.activitys.filter(activity => {
                return activity.name.toLowerCase().indexOf(this.input.toLowerCase()) > -1
                    || activity.faculty.toLowerCase().indexOf(this.input.toLowerCase()) > -1
                    || (activity.hoursToReceive.toString().indexOf(this.input.toString()) > -1)
            })
        }
    },
    watch: {
        // activitysget() {
        //     fetch('https://apricot-binturong-kit.cyclic.app/activitys')
        //     .then(res => res.json())
        //     .then((result) => {
        //         if(result.status === 'error') {
        //             alert(JSON.stringify(result))
        //         } else {
        //             this.activitys = result
        //             console.log(result)
        //         }
        //     })
        // }
    },
    data() {
      return {
        drawer: null,
        activitys: [],
        input: ''
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
        openActivity(activity) {
            this.$store.dispatch('setActivity', activity); // store
            this.$router.push('theactivity');
        }
    },
}
</script>

<style lang="scss" scoped>
.bluehover:hover {
    text-decoration: underline;
    color: #000;
}
</style>