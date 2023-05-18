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
                        <v-text-field v-model="name" color="teal-accent-3" label="ชื่อกิจกรรม" variant="underlined"></v-text-field>
                        <v-textarea v-model="detail" color="teal-accent-3" label="รายละเอียดกิจกรรม"></v-textarea>
                        <v-file-input @change="setFile" accept="image/*" color="teal-accent-3" label="รูปภาพ" variant="filled" prepend-icon="mdi-camera"></v-file-input>
                        <v-text-field v-model="location" color="teal-accent-3" label="สถานที่" variant="underlined"></v-text-field>
                        <v-text-field v-model="eventDate" :min="new Date().toISOString().substr(0, 10)" type="date" color="teal-accent-3" label="วันที่" variant="underlined"></v-text-field>
                        <v-text-field v-model="timeStart" type="time" color="teal-accent-3" label="เวลาเริ่ม" variant="underlined"></v-text-field>
                        <v-text-field v-model="timeEnd" type="time" color="teal-accent-3" label="เวลาสิ้นสุด" variant="underlined"></v-text-field>
                        <v-text-field v-model="hoursToReceive" :min=1 type="number" color="teal-accent-3" label="จำนวนชั่วโมงที่จะได้รับ" variant="underlined"></v-text-field>
                        <v-text-field v-model="max" :min=1 type="number" color="teal-accent-3" label="จำนวนคนที่รับ" variant="underlined"></v-text-field>
                      </v-container>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="back">ยกเลิก</v-btn>
                        <v-btn color="teal-accent-3" @click="editActivity(tcID, names, location, detail, eventDate, timeStart, timeEnd, hoursToReceive, max, image)">
                          แก้ไข
                          <v-icon icon="mdi-chevron-right" end></v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
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

let setDate = this.$store.getters.getActivity.eventDate+"";

let iimmgg = ref('');

export default {
    name: 'activityedit',
    components: {
    },
    data () {
        return {
            name: this.$store.getters.getActivity.name,
            detail: this.$store.getters.getActivity.detail,
            image: this.$store.getters.getActivity.image,
            location: this.$store.getters.getActivity.location,
            eventDate: this.setDate.substr(0,10),
            timeStart: this.$store.getters.getActivity.timeStart,
            timeEnd: this.$store.getters.getActivity.timeEnd,
            hoursToReceive: this.$store.getters.getActivity.hoursToReceive,
            max: this.$store.getters.getActivity.max,
        }
    },
    setup() {
        
    },
    mounted() {

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
            this.$store.dispatch('setActivity', this.$store.getters.getActivity);
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
        editActivity(tcID, names, location, detail, eventDate, timeStart, timeEnd, hoursToReceive, max, image) {
        
        },
        back() {
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