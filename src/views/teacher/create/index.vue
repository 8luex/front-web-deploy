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
                        <v-text-field
                          color="teal-accent-3"
                          label="ชื่อกิจกรรม"
                          variant="underlined"
                        ></v-text-field>
                        <v-textarea
                          color="teal-accent-3"
                          label="รายละเอียดกิจกรรม"
                        ></v-textarea>
                        <v-text-field
                          color="teal-accent-3"
                          label="สถานที่"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                          color="teal-accent-3"
                          label="วันที่"
                          placeholder="2022-12-08"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                          color="teal-accent-3"
                          label="เวลาเริ่ม"
                          placeholder="08:30:00"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                          color="teal-accent-3"
                          label="เวลาสิ้นสุด"
                          placeholder="12:30:00"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                          :min=1
                          type="number"
                          color="teal-accent-3"
                          label="จำนวนชั่วโมงที่จะได้รับ"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                          :min=1
                          type="number"
                          color="teal-accent-3"
                          label="จำนวนคนที่รับ"
                          variant="underlined"
                        ></v-text-field>
                        <v-file-input
                          color="teal-accent-3"
                          label="รูปภาพ"
                          variant="filled"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                      </v-container>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="teal-accent-3"  @click="createActivity">
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
export default {
    name: 'activitycreate',
    components: {
    },
    data () {
        return {
            dialog : {
                name: '',
                createdAt: '',
                location: '',
                creator: '',
                //faculty: '',
                detail: '',
                eventDate: '',
                timeStart: '',
                timeEnd: '',
                hoursToReceive: '',
                image: ''
            }
        }
    },
    setup() {
        const items = ref([])
        const stID = ref('')

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
                    stID.value = result.line[0].studentID // add on
                    getactivitysavailable(result.line[0].studentID);
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
            items, stID,
        }
        
    },
    methods: {
      moreDetail(item) {
          this.dialog = item
      },
      createActivity() {

      }
    }
}
</script>

<style lang="scss" scoped>
.v-card {
  margin-top: 20px;
}
</style>