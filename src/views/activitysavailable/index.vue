<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">กิจกรรม</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <Card v-for="item in items" :key="item.id" :act="item" v-on:moreDetail="moreDetail(item)" />
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
                        <p>วันที่: {{ dialog.eventDate.substring(0, 10) }}</p>
                        <p>เวลา: {{ dialog.timeStart }}-{{ dialog.timeEnd }}</p>
                        <p>สถานที่: {{ dialog.location }}</p>
                        <p>ชั่วโมงกิจกรรมที่จะได้รับ: {{ dialog.hoursToReceive }}</p>
                        <p>จำนวนผู้ลงทะเบียน: {{ dialog.countenroll }}/{{ dialog.max }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="isShowDialog = false">ยกเลิก</v-btn>
                        <v-btn color="teal-accent-3" text
                            @click="activityEnroll(dialog.id, dialog.name, stID, dialog.eventDate, dialog.timeStart, dialog.location)">ลงทะเบียน</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>



<script>
import Card from '@/components/Card.vue'
import { ref } from 'vue';
import liff from '@line/liff';

// const items = ref([])

export default {
    name: 'activitysavailable',
    components: {
        Card
    },
    data() {
        return {
            isShowDialog: false,
            dialog: {
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

            fetch("https://apricot-binturong-kit.cyclic.app/studentdisconnectcheck", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.message === 'already connected') {
                        console.log(result)//Test
                        //this.getactivitysavailable(result.line[0].studentID);
                        stID.value = result.line[0].studentID // add on
                        getactivitysavailable(result.line[0].studentID);
                    } else if (result.message === 'not yet connected') {
                        alert('ยังไม่ได้เชื่อมโยงบัญชี')
                    } else {
                        alert(JSON.stringify(result))
                    }
                })
                .catch(error => console.log('error', error));
        };
        const getactivitysavailable = (studentID) => {
            fetch('https://apricot-binturong-kit.cyclic.app/activitysavailable/' + studentID)
                .then(res => res.json())
                .then((resultact) => {
                    if (resultact.status === 'error') {
                        alert(JSON.stringify(resultact))
                    } else if (resultact.message === 'no activitys available') {
                        console.log(resultact)
                    } else {
                        //alert(JSON.stringify(resultact))
                        //this.items = resultact
                        items.value = resultact
                        console.log(resultact)
                    }
                })
        };

        liff.init({
            liffId: '1657670230-kRRQZ1nN', //BLUEZO Event Activitys Available
        })
        liff.ready.then(() => {
            if (!liff.isLoggedIn()) {
                liff.login(); //Test PC
            }
            liff.getProfile().then(profile => {
                console.log(profile)
                //this.lineID = profile.lineID;
                //this.$store.dispatch('setLine', profile);
                //this.getconnect();
                getconnect(profile.userId);
                //this.isDone();
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
        moreDetail(item) {
            this.isShowDialog = true
            this.dialog = item
        },
        activityEnroll(activityID, name, studentID, eventDate, timeStart, location) {
            console.log(activityID, name, studentID, eventDate, timeStart, location)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "activityID": activityID,
                "studentID": studentID
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/activityenroll", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'ok') {
                        //router.push({ path: '/connect-done' })
                        // console.log('activity enroll successfully')
                        // this.isShowDialog = false
                        // this.$router.push('activitysavailable-done');
                        //window.location.reload()

                        ///////////////////////
                        fetch('https://apricot-binturong-kit.cyclic.app/getlineid/' + studentID)
                            .then(res => res.json())
                            .then((result) => {
                                if (result.length > 0) {
                                    console.log(result[0].lineID)
                                    var lmyHeaders = new Headers();
                                    lmyHeaders.append("Content-Type", "application/json");
                                    var lraw = JSON.stringify({
                                        "name": name,
                                        "eventDate": eventDate,
                                        "timeStart": timeStart,
                                        "location": location
                                    });

                                    var lrequestOptions = {
                                        method: 'POST',
                                        headers: lmyHeaders,
                                        body: lraw,
                                        redirect: 'follow'
                                    };

                                    fetch("https://apricot-binturong-kit.cyclic.app/lineenroll", lrequestOptions)
                                        .then(response => response.json())
                                        .then(result => {
                                            console.log(result)
                                        })
                                        .catch(error => console.log('error', error));
                                    console.log('activity enroll successfully')
                                    this.isShowDialog = false
                                    this.$router.push('activitysavailable-done');
                                } else {
                                    alert('ไม่พบบัญชีที่เชื่อมต่อ')
                                }
                            })
                    } else {
                        alert(JSON.stringify(result))
                    }
                })
                .catch(error => console.log('error', error));
        },
        // getconnect() {

        // },
        // getactivitysavailable(studentID) {

        // }
    }
}
</script>


<style lang="scss" scoped>
.dialog-card {
    p {
        margin-bottom: 0;
    }

    .v-card__text {
        padding-bottom: 0;
    }

    .detail {
        margin: 10px 0;
    }
}
</style>