<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">กิจกรรมที่ลงทะเบียนไว้</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <CardEnroll
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
                        <VueQrcode
                            v-bind:value="qrValue"
                            v-bind:color="qrColor"
                            v-bind:type="qrType"
                            v-bind:errorCorrectionLevel="correctionLevel"
                        />
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
import VueQrcode from 'vue-qrcode'
import CardEnroll from '@/components/CardEnroll.vue';
import { ref } from 'vue';
import liff from '@line/liff';

export default {
    name: 'myactivityenroll',
    components: {
        CardEnroll,
        VueQrcode,
    },
    data() {
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
            },
            qrValue: '',
            qrColor: {
                dark:"#1DE9B6",
                light:"#FFFFFF"
            },
            qrType: "image/png",
            correctionLevel: "H",
        }
    },
    setup() {
        const items = ref([])
        const stID = ref('');

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

            fetch("https://apricot-binturong-kit.cyclic.app/studentdisconnectcheck", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.message === 'already connected') {
                    console.log(result)//Test
                    stID = result.line[0].studentID;
                    getactivitysalreadyenroll(result.line[0].studentID);
                } else if(result.message === 'not yet connected') {
                    alert('ยังไม่ได้เชื่อมโยงบัญชี')
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        };
        const getactivitysalreadyenroll = (studentID) => {
            fetch('https://apricot-binturong-kit.cyclic.app/activitysalreadyenroll/'+studentID)
            .then(res => res.json())
            .then((resultact) => {
                if(resultact.status === 'error') {
                    alert(JSON.stringify(resultact))
                } else if(resultact.message === 'no activitys enroll') {
                    console.log(resultact)
                } else {
                    items.value = resultact
                    console.log(resultact)
                }
            })
        };
        
        liff.init({
            liffId: '1657670230-Mp0gNae5', //BLUEZO Event Activitys Enroll
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
            items, stID
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
            // qr
            this.qrValue = this.stID.value.concat(item.id);
            console.log("text: "+qrValue);
        },
    }
}
</script>


<style lang="scss" scoped>
</style>