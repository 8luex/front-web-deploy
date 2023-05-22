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
                <v-col cols="12">
                    <v-text-field
                    type="text" v-model="input" 
                    density="compact"
                    variant="solo"
                    label="Search teachers..."
                    append-inner-icon="mdi-magnify"
                    single-line
                    hide-details
                    ></v-text-field>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left text-caption">
                                ID
                                </th>
                                <th class="text-left text-caption">
                                ชื่อ-นามสกุล
                                </th>
                                <th class="text-left text-caption">
                                คณะ
                                </th>
                                <th class="text-left text-caption">
                                กิจกรรมที่สร้าง
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in filteredItems" :key="i.id">
                                <td class="text-caption bluehover" :act="i" style="cursor: pointer;" @click="openTeacher(i)">{{ i.id }}</td>
                                <td v-if="i.fname=='admin'" class="text-caption bluehover" :act="i" style="cursor: pointer;" @click="openTeacher(i)">ศูนย์นักศึกษาทุนแห่งมหาวิทยาลัยรังสิต</td>
                                <td v-else class="text-caption bluehover" :act="i" style="cursor: pointer;" @click="openTeacher(i)">{{ i.fname }} {{ i.lname }}</td>
                                <td class="text-caption">{{ i.faculty }}</td>
                                <td class="text-caption"><v-chip small color="secondary" class="white--text">{{ i.countactivity }}</v-chip></td>
                            </tr>
                        </tbody>
                    </v-table>
                    <p v-if="input&&!filteredItems.length" class="text-caption text-center mt-2">
                        <v-icon size="large">mdi-file-search-outline</v-icon>No results found!
                    </p>
                    <!-- start dialog -->
                    <v-dialog v-model="isShowDialog" max-width="500" persistent>
                        <v-card>
                            <v-card-title class="text-h6">
                                Teacher
                            </v-card-title>
                            <v-card-text>
                                Teacher Show
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="grey" text @click="isShowDialog = false">ปิด</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- end dialog -->
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
    mounted() {
        fetch('https://apricot-binturong-kit.cyclic.app/teachers')
        .then(res => res.json())
        .then((result) => {
            if(result.status === 'error') {
                alert(JSON.stringify(result))
            } else {
                this.teachers = result
                console.log(result)
            }
        })
    },
    data () {
      return {
        isShowDialog: false,
        drawer: null,
        teachers: [],
        input: '',
      }
    },
    computed: {
        filteredItems() {
            return this.teachers.filter(teacher => {
                return teacher.fname.toLowerCase().indexOf(this.input.toLowerCase()) > -1
                    || teacher.lname.toLowerCase().indexOf(this.input.toLowerCase()) > -1
                    || teacher.faculty.toLowerCase().indexOf(this.input.toLowerCase()) > -1
                    || (teacher.id.toString().indexOf(this.input.toString()) > -1)
                    || (teacher.countactivity.toString().indexOf(this.input.toString()) > -1)
            })
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
        openTeacher(teacher) {
            this.isShowDialog = true
            // this.$store.dispatch('setActivity', activity); // store
            // localStorage.setItem('activityID', activity.id)
            // this.$router.push('theactivity');
        },
    },
}
</script>

<style lang="scss" scoped>
.bluehover:hover {
    text-decoration: underline;
    color: #000;
}
</style>