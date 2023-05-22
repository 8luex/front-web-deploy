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
                        <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="mt-5 mb-4" @click="create">
                            Create
                        </v-btn>
                    </div>
                </v-col>
                <v-col cols="12">
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
                    <!-- start dialog -->
                    <v-dialog v-model="isShowDialog" max-width="500" persistent>
                        <v-card class="dialog-card">
                            <v-card-title class="text-h6">
                                สร้างกิจกรรม
                            </v-card-title>
                            <v-card-text>
                                <v-text-field v-model="toCreate.names" color="teal-accent-3" label="ชื่อกิจกรรม" variant="underlined"></v-text-field>
                                <v-textarea v-model="toCreate.detail" color="teal-accent-3" label="รายละเอียดกิจกรรม"></v-textarea>
                                <v-file-input @change="setFile" accept="image/*" color="teal-accent-3" label="รูปภาพ" variant="filled" prepend-icon="mdi-camera"></v-file-input>
                                <v-text-field v-model="toCreate.location" color="teal-accent-3" label="สถานที่" variant="underlined"></v-text-field>
                                <v-text-field v-model="toCreate.eventDate" :min="new Date().toISOString().substr(0, 10)" type="date" color="teal-accent-3" label="วันที่" variant="underlined"></v-text-field>
                                <v-text-field v-model="toCreate.timeStart" type="time" color="teal-accent-3" label="เวลาเริ่ม" variant="underlined"></v-text-field>
                                <v-text-field v-model="toCreate.timeEnd" type="time" color="teal-accent-3" label="เวลาสิ้นสุด" variant="underlined"></v-text-field>
                                <v-text-field v-model="toCreate.hoursToReceive" :min=1 type="number" color="teal-accent-3" label="จำนวนชั่วโมงที่จะได้รับ" variant="underlined"></v-text-field>
                                <v-text-field v-model="toCreate.max" :min=1 type="number" color="teal-accent-3" label="จำนวนคนที่รับ" variant="underlined"></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="grey" text @click="isShowDialog = false">ปิด</v-btn>
                                <v-btn color="teal-accent-3"  @click="createActivity(toCreate.names, toCreate.location, toCreate.detail, toCreate.eventDate, toCreate.timeStart, toCreate.timeEnd, toCreate.hoursToReceive, toCreate.max)">
                                    สร้าง<v-icon icon="mdi-chevron-right" end></v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="isShowSuccess" max-width="290">
                        <v-card>
                            <v-card-title class="text-h6">
                                Success
                            </v-card-title>
                            <v-card-text>
                                ยืนยันการสร้างกิจกรรม, สำเร็จ!
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="grey" text @click="refreshDialog">ปิด</v-btn>
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
import { watchEffect, ref } from 'vue'; 
import { useRouter } from 'vue-router'
import firebase from 'firebase/app';
import 'firebase/storage';
// "firebase": "^7.16.1",

let iimmgg = ref('');

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

        return {
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

    },
    created() {
        try {
            firebase.initializeApp({
            apiKey: "AIzaSyDhHIPsVfjKLwfYDkqhBldj4hWwyum6bW4",
            authDomain: "firegram-blue.firebaseapp.com",
            projectId: "firegram-blue",
            storageBucket: "firegram-blue.appspot.com",
            messagingSenderId: "105035319032",
            appId: "1:105035319032:web:05e49b004c5d161f111d0d"
            });
            this.storageRef = firebase.storage().ref();
            console.log('firebase here')
        } catch (error) {
            console.log(error)
            // this.$router.push('adminactivity');
            this.$router.go()
        }
    },
    data() {
      return {
        isShowDialog: false,
        isShowSuccess: false,
        drawer: null,
        activitys: [],
        input: '',
        toCreate: {
            names: null,
            detail: null,
            location: null,
            eventDate: null,
            timeStart: null,
            timeEnd: null,
            hoursToReceive: null,
            max: null,
        },
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
            localStorage.setItem('activityID', activity.id)
            this.$router.push('theactivity');
        },
        setFile(event) {
            const d = new Date();
            let time = d.getTime();
            this.file = event.target.files[0];
            const fileRef = this.storageRef.child(`images/${time}${this.file.name}`);
            fileRef.put(this.file)
            .then((snapshot) => {
                this.imageurl = snapshot.ref.getDownloadURL();
                // console.log(imageurl); // Promise { <pending> }
                this.imageurl.then(function(result) {
                    // console.log(result) // "Some User token"
                    iimmgg = result;
                    console.log('File uploaded successfully! '+iimmgg);
                })
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
        },
        create() {
            this.isShowDialog = true
        },
        createActivity(names, location, detail, eventDate, timeStart, timeEnd, hoursToReceive, max) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "creator": "0",
                "name": names,
                "detail": detail,
                "location": location,
                "eventDate": eventDate,
                "timeStart": timeStart,
                "timeEnd": timeEnd,
                "hoursToReceive": hoursToReceive,
                "image": iimmgg,
                "year": "2566",
                "semester": "2",
                "max": max
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
          
            fetch("https://apricot-binturong-kit.cyclic.app/activitycreate", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.isShowSuccess = true
            })
            .catch(error => console.log('error', error));
        },
        refreshDialog() {
            this.isShowSuccess = false
            this.isShowDialog = false
            // reload page
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
    },
}
</script>

<style lang="scss" scoped>
.bluehover:hover {
    text-decoration: underline;
    color: #000;
}
</style>