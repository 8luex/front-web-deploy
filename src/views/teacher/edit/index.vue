<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">แก้ไขกิจกรรม</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <v-card class="mx-auto" max-width="344" title="กิจกรรม">
                      <v-container>
                        <v-text-field v-model="activity.name" color="teal-accent-3" label="ชื่อกิจกรรม" variant="underlined"></v-text-field>
                        <v-textarea v-model="activity.detail" color="teal-accent-3" label="รายละเอียดกิจกรรม"></v-textarea>
                        <v-file-input @change="setFile" accept="image/*" color="teal-accent-3" label="รูปภาพ" variant="filled" prepend-icon="mdi-camera"></v-file-input>
                        <v-text-field v-model="activity.location" color="teal-accent-3" label="สถานที่" variant="underlined"></v-text-field>
                        <v-text-field v-model="activity.eventDate" type="date" color="teal-accent-3" label="วันที่" variant="underlined"></v-text-field>
                        <v-text-field v-model="activity.timeStart" type="time" color="teal-accent-3" label="เวลาเริ่ม" variant="underlined"></v-text-field>
                        <v-text-field v-model="activity.timeEnd" type="time" color="teal-accent-3" label="เวลาสิ้นสุด" variant="underlined"></v-text-field>
                        <v-text-field v-model="activity.hoursToReceive" :min=1 type="number" color="teal-accent-3" label="จำนวนชั่วโมงที่จะได้รับ" variant="underlined"></v-text-field>
                        <v-text-field v-model="activity.max" :min=1 type="number" color="teal-accent-3" label="จำนวนคนที่รับ" variant="underlined"></v-text-field>
                      </v-container>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="back">ยกเลิก</v-btn>
                        <v-btn color="teal-accent-3" @click="editActivity(activity.id, activity.name, activity.detail, activity.location, activity.eventDate, activity.timeStart, activity.timeEnd, activity.hoursToReceive, activity.max)">
                          แก้ไข
                          <v-icon icon="mdi-chevron-right" end></v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                    <!-- start -->
                    <v-dialog v-model="isShowSuccess" max-width="290">
                        <v-card>
                            <v-card-title class="text-h6">
                                Success
                            </v-card-title>
                            <v-card-text>
                                ยืนยันการแก้ไขกิจกรรม, สำเร็จ!
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="grey" text @click="back">ปิด</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- end -->
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
import { ref } from 'vue'
import firebase from 'firebase/app';
import 'firebase/storage';
// "firebase": "^7.16.1",

let iimmgg = ref('');

export default {
    name: 'activityedit',
    components: {
    },
    data () {
        return {
            isShowSuccess: false,
            // name: this.$store.getters.getActivity.name,
            // detail: this.$store.getters.getActivity.detail,
            // image: this.$store.getters.getActivity.image,
            // location: this.$store.getters.getActivity.location,
            // eventDate: this.$store.getters.getActivity.eventDate, //+""+substr(0,10)
            // timeStart: this.$store.getters.getActivity.timeStart,
            // timeEnd: this.$store.getters.getActivity.timeEnd,
            // hoursToReceive: this.$store.getters.getActivity.hoursToReceive,
            // max: this.$store.getters.getActivity.max,
            activity: {
                eventDate: ''
            }
        }
    },
    setup() {

    },
    mounted() {
        fetch('https://apricot-binturong-kit.cyclic.app/teacheredit/'+localStorage.getItem('activityID'))
        .then(res => res.json())
        .then((result) => {
            if(result.status === 'error') {
                alert(JSON.stringify(result))
            } else {
                this.activity = result[0]
                this.activity.eventDate = result[0].eventDate.substr(0,10)
                console.log(result)
            }
        })
    },
    created() {
        // firebase.initializeApp({
        //     apiKey: "AIzaSyDhHIPsVfjKLwfYDkqhBldj4hWwyum6bW4",
        //     authDomain: "firegram-blue.firebaseapp.com",
        //     projectId: "firegram-blue",
        //     storageBucket: "firegram-blue.appspot.com",
        //     messagingSenderId: "105035319032",
        //     appId: "1:105035319032:web:05e49b004c5d161f111d0d"
        // });
        // this.storageRef = firebase.storage().ref();
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
            // localStorage.setItem('activityID', this.$store.getters.getActivity)
            // console.log(localStorage.getItem('activityID'))
            this.$router.go()
        }
    },
    methods: {
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
        editActivity(id, name, detail, location, eventDate, timeStart, timeEnd, hoursToReceive, max) {
            if(iimmgg.value == '') { //not change image
                iimmgg = this.activity.image
                console.log('iimmgg is null : '+this.activity.image)
            } else { //change image
                console.log('iimmgg is not null : '+iimmgg)
            }

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "name": name,
            "detail": detail,
            "location": location,
            "eventDate": eventDate,
            "timeStart": timeStart,
            "timeEnd": timeEnd,
            "hoursToReceive": hoursToReceive,
            "image": iimmgg,
            "max": max,
            "id": id
            });

            var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/editactivity", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status === 'ok') {
                    this.isShowSuccess = true
                } else if(result.message === 'affected Rows is 0') {
                    alert('affected Rows is 0')
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        },
        back() {
            localStorage.removeItem('activityID');
            this.$router.push('created');
        },
    },
    computed: {
        getActivity() {
            return this.$store.getters.getActivity;
        },
    },
}
</script>

<style lang="scss" scoped>
.v-card {
  margin-top: 20px;
}
</style>