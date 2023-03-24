<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">กิจกรรมที่สร้าง</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <CardCreated
                    v-for="item in items"
                    :key="item.id"
                    :act="item"
                    v-on:viewTicket="viewTicket(item)"
                    />
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-2 text-caption text-disabled">
                        &copy;Scholarship Activity 2023
                    </div>
                </v-col>
            </v-row>
            <v-dialog v-model="isShowDialog" max-width="290">
                <v-card class="dialog-card">
                    <v-img cover class="white--text align-end" height="200px" :src="dialog.image"></v-img>
                    <v-card-title class="text-h6">
                        {{ dialog.name }}
                    </v-card-title>
                    <v-card-text>
                        <p class="text-caption text-disabled">{{ dialog.createdAt }}</p>
                        <p>ผู้สร้างกิจกรรม: {{ dialog.teacherfname }} {{ dialog.teacherlname }}</p>
                        <p>{{ dialog.faculty }}</p>
                        <p class="detail">รายละเอียดกิจกรรม: {{ dialog.detail }}</p>
                        <p>วันที่: {{ dialog.eventDate.substring(0,10) }}</p>
                        <p>เวลา: {{ dialog.timeStart }}-{{ dialog.timeEnd }}</p>
                        <p>สถานที่: {{ dialog.location }}</p>
                        <p>ชั่วโมงกิจกรรมที่จะได้รับ: {{ dialog.hoursToReceive }}</p>
                        <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="w-100 mt-2" @click="scan(dialog.id)">
                            <v-icon size="large">mdi-line-scan</v-icon>Scan to check
                        </v-btn>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="isShowDialog = false">ปิด</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import CardCreated from '@/components/CardCreated.vue'
import { ref } from 'vue';
import liff from '@line/liff';

// const items = ref([])

export default {
    name: 'myactivityenroll',
    components: {
        CardCreated
    },
    data () {
        return {
            isShowDialog: false,
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
        const tcID = ref('')

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
                    tcID.value = result.line[0].teacherID // add on
                    getactivitysalreadyenroll(result.line[0].teacherID);
                } else if(result.message === 'not yet connected') {
                    alert('ยังไม่ได้เชื่อมโยงบัญชี')
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        };
        const getactivitysalreadyenroll = (teacherID) => {
            fetch('https://apricot-binturong-kit.cyclic.app/teachercreated/'+teacherID)
            .then(res => res.json())
            .then((resultact) => {
                if(resultact.status === 'error') {
                    alert(JSON.stringify(resultact))
                } else if(resultact.message === 'no activitys created') {
                    console.log(resultact)
                } else {
                    items.value = resultact
                    console.log(resultact)
                }
            })
        };
        
        liff.init({
            liffId: '1657670230-PG7QLNZ4', //BLUEZO Event Activitys Created
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
            items, tcID,
        }
        
    },
    mounted() {
        
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        },
    },
    methods: {
        viewTicket(item) {
            this.isShowDialog = true
            this.dialog= item
        },
        scan(id) {
                // let stID = result.substr(0,7);
                // let actID = result.substr(7);
                // if(actID === id) {
                // } else {
                //     alert("error!, pls try again");
                // }  
            liff.scanCodeV2().then((result) => { //ios
                let stID = result.substr(0,7);
                let actID = result.substr(7);
                alert.log(result)
                //alert(result);
            }).catch((error) => {
                // alert("error", error);
                alert.log(error)
            });
        },
        setactivitystatustrue(activityID, studentID) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "activityID": activityID,
                "studentID": studentID
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/setactivitystatustrue", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.message === 'update activity true complete') {
                    //router.push({ path: '/connect-done' })
                    alert("ยืนยันการทำกิจกรรม สำเร็จ!")
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        }
    }
}
</script>


<style lang="scss" scoped>
</style>