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
                <v-list-item prepend-icon="mdi-view-dashboard" title="Student" value="student" active></v-list-item>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Teacher" value="teacher" @click="toTeacher"></v-list-item>
                <v-list-item prepend-icon="mdi-logout-variant" title="Logout" value="logout" @click="logout"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center">
                    <div class="mt-5" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Student
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    type="text" v-model="input" 
                    density="compact"
                    variant="solo"
                    label="Search students..."
                    append-inner-icon="mdi-magnify"
                    single-line
                    hide-details
                    ></v-text-field>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left text-caption">
                                รหัสนักศึกษา
                                </th>
                                <th class="text-left text-caption">
                                ชื่อ-นามสกุล
                                </th>
                                <th class="text-left text-caption">
                                คณะ
                                </th>
                                <th class="text-left text-caption">
                                ชั่วโมงกิจกรรมที่ได้รับ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in filteredItems" :key="i.id">
                                <td class="text-caption bluehover" :act="i" style="cursor: pointer;" @click="openStudent(i.id)">{{ i.id }}</td>
                                <td class="text-caption bluehover" :act="i" style="cursor: pointer;" @click="openStudent(i.id)">{{ i.fname }} {{ i.lname }}</td>
                                <td class="text-caption">{{ i.faculty }}</td>
                                <td v-if="i.sumhours==null" class="text-caption"><v-chip small color="red" class="white--text">0</v-chip></td>
                                <td v-else class="text-caption"><v-chip small color="secondary" class="white--text">{{ i.sumhours }}</v-chip></td>
                            </tr>
                        </tbody>
                    </v-table>
                    <p v-if="input&&!filteredItems.length" class="text-caption text-center mt-2">
                        <v-icon size="large">mdi-file-search-outline</v-icon>No results found!
                    </p>
                    <!-- start dialog -->
                    <v-dialog v-model="isShowDialog" max-width="800" persistent>
                        <v-card>
                            <v-card-title class="text-h6">
                                Student
                            </v-card-title>
                            <v-card-text>
                                Student Show
                                <v-text-field
                                type="text" v-model="inputact" 
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
                                            วันกิจกรรม
                                            </th>
                                            <th class="text-left text-caption">
                                            คณะ
                                            </th>
                                            <th class="text-left text-caption">
                                            ชั่วโมงกิจกรรมที่ได้รับ
                                            </th>
                                            <th class="text-left text-caption">
                                            Enroll
                                            </th>
                                            <th class="text-left text-caption">
                                            Join
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="i in filteredActivitys" :key="i.id">
                                            <td class="text-caption">{{ i.name }}</td>
                                            <td class="text-caption">{{ i.eventDate.substring(0,10) }}</td>
                                            <td class="text-caption">{{ i.faculty }}</td>
                                            <td class="text-caption">{{ i.hoursToReceive }}</td>
                                            <td class="text-caption">{{ i.timeEnroll }}</td>
                                            <td v-if="i.timeJoin==null" class="text-caption">-</td>
                                            <td v-else class="text-caption">{{ i.timeJoin }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                                <p v-if="inputact&&!filteredActivitys.length" class="text-caption text-center mt-2">
                                    <v-icon size="large">mdi-file-search-outline</v-icon>No results found!
                                </p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="grey" text @click="closeStudent">ปิด</v-btn>
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
        fetch('https://apricot-binturong-kit.cyclic.app/students')
        .then(res => res.json())
        .then((result) => {
            if(result.status === 'error') {
                alert(JSON.stringify(result))
            } else {
                this.students = result
                console.log(result)
            }
        })
    },
    data () {
      return {
        isShowDialog: false,
        drawer: null,
        students: [],
        input: '',
        activitys: [],
        inputact: '',
      }
    },
    computed: {
        filteredItems() {
            return this.students.filter(student => {
                return student.fname.toLowerCase().indexOf(this.input.toLowerCase()) > -1
                    || student.lname.toLowerCase().indexOf(this.input.toLowerCase()) > -1
                    || student.faculty.toLowerCase().indexOf(this.input.toLowerCase()) > -1
                    || (student.id.toString().indexOf(this.input.toString()) > -1)
            })
        },
        filteredActivitys() {
            return this.activitys.filter(activity => {
                return activity.name.toLowerCase().indexOf(this.inputact.toLowerCase()) > -1
                    || (activity.createdAt.toString().indexOf(this.inputact.toString()) > -1)
                    || (activity.eventDate.toString().indexOf(this.inputact.toString()) > -1)
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
        openStudent(studentID) {
            fetch('https://apricot-binturong-kit.cyclic.app/activitysalreadyenroll/'+studentID)
            .then(res => res.json())
            .then((resultact) => {
                if(resultact.status === 'error') {
                    alert(JSON.stringify(resultact))
                } else if(resultact.message === 'no activitys enroll') {
                    this.activitys = []
                    console.log(resultact)
                } else {
                    this.activitys = resultact
                    console.log(resultact)
                }
            })
            this.isShowDialog = true
        },
        closeStudent(){
            this.inputact = ''
            this.activitys = []
            this.isShowDialog = false
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