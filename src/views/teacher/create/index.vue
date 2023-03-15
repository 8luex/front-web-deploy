<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">สร้างกิจกรรม</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <v-card class="mx-auto" max-width="344" title="กิจกรรม">
                      <v-container>
                        <v-text-field v-model="names" color="teal-accent-3" label="ชื่อกิจกรรม" variant="underlined"></v-text-field>
                        <v-textarea v-model="detail" color="teal-accent-3" label="รายละเอียดกิจกรรม"></v-textarea>
                        <v-text-field v-model="location" color="teal-accent-3" label="สถานที่" variant="underlined"></v-text-field>
                        <v-text-field v-model="eventDate" :min="new Date().toISOString().substr(0, 10)" type="date" color="teal-accent-3" label="วันที่" variant="underlined"></v-text-field>
                        <v-text-field v-model="timeStart" type="time" color="teal-accent-3" label="เวลาเริ่ม" variant="underlined"></v-text-field>
                        <v-text-field v-model="timeEnd" type="time" color="teal-accent-3" label="เวลาสิ้นสุด" variant="underlined"></v-text-field>
                        <v-text-field v-model="hoursToReceive" :min=1 type="number" color="teal-accent-3" label="จำนวนชั่วโมงที่จะได้รับ" variant="underlined"></v-text-field>
                        <v-text-field v-model="max" :min=1 type="number" color="teal-accent-3" label="จำนวนคนที่รับ" variant="underlined"></v-text-field>
                        <v-file-input @change="upload" accept="image/*" color="teal-accent-3" label="รูปภาพ" variant="filled" prepend-icon="mdi-camera"></v-file-input>
                      </v-container>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="teal-accent-3"  @click="createActivity(tcID, names, location, detail, eventDate, timeStart, timeEnd, hoursToReceive, max)">
                          สร้าง
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

export default {
    name: 'activitycreate',
    components: {
    },
    data () {
        return {
            dialog : {
                names: '',
                //createdAt: '',
                location: '',
                //creator: '',
                //faculty: '',
                detail: '',
                eventDate: '',
                timeStart: '',
                timeEnd: '',
                hoursToReceive: '',
                max: '',
                image: ''
            }
        }
    },
    created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDhHIPsVfjKLwfYDkqhBldj4hWwyum6bW4",
      authDomain: "firegram-blue.firebaseapp.com",
      projectId: "firegram-blue",
      storageBucket: "firegram-blue.appspot.com",
      messagingSenderId: "105035319032",
      appId: "1:105035319032:web:05e49b004c5d161f111d0d"
    });
    this.storageRef = firebase.storage().ref();
  },
    setup() {
        // const items = ref([])
        const tcID = ref('')
        const names = ref('')
        const location = ref('')
        const detail = ref('')
        const eventDate = ref('')
        const timeStart = ref('')
        const timeEnd = ref('')
        const hoursToReceive = ref('')
        const max = ref('')
        const image = ref('')

        const getconnect = (lineID) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "lineID": lineID
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/teacherdisconnectcheck", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.message === 'already connected') {
                    console.log(result)//Test
                    tcID.value = result.line[0].teacherID
                    //getactivitysavailable(result.line[0].teacherID);
                } else if(result.message === 'not yet connected') {
                    alert('ยังไม่ได้เชื่อมโยงบัญชี')
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        };
        // const getactivitysavailable = (studentID) => {
        //     fetch('https://apricot-binturong-kit.cyclic.app/activitysavailable/'+studentID)
        //     .then(res => res.json())
        //     .then((resultact) => {
        //         if(resultact.status === 'error') {
        //             alert(JSON.stringify(resultact))
        //         } else if(resultact.message === 'no activitys available') {
        //             console.log(resultact)
        //         } else {
        //             items.value = resultact
        //             console.log(resultact)
        //         }
        //     })
        // };
        
        liff.init({
            liffId: '1657670230-lMr69DP0', //BLUEZO Event Activity Create
        })
        liff.ready.then(() => {
            if(!liff.isLoggedIn()) {
                liff.login(); //Test PC
            }       
            liff.getProfile().then(profile => {
                console.log(profile)
                getconnect(profile.userId);
            })
        });

        return {
            //items, stID,
            tcID,
            names, location, detail, eventDate, timeStart, timeEnd, hoursToReceive, max, image
        }
        
    },
    methods: {
    //   setFile(event) {
    //       this.file = event.target.files[0];
    //       this.upload();
    //   },
      upload(event) {
        this.file = event.target.files[0];
        const fileRef = this.storageRef.child(`images/${this.file.name}`);
        fileRef.put(this.file)
          .then((snapshot) => {
            this.imageurl = snapshot.ref.getDownloadURL();
            // console.log(imageurl); // Promise { <pending> }
            this.imageurl.then(function(result) {
              console.log(result) // "Some User token"
              this.dialog.image.value = result+""; // add new
            })
            console.log('File uploaded successfully!');
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
      },
      moreDetail(item) {
          this.dialog = item
      },
      createActivity(tcID, names, location, detail, eventDate, timeStart, timeEnd, hoursToReceive, max) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "creator": tcID,
          "name": names,
          "detail": detail,
          "location": location,
          "eventDate": eventDate,
          "timeStart": timeStart,
          "timeEnd": timeEnd,
          "hoursToReceive": hoursToReceive,
          "image": this.dialog.image.value,
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
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
    }
}
</script>

<style lang="scss" scoped>
.v-card {
  margin-top: 20px;
}
</style>