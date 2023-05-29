<template>
    <div>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center pb-0 pt-10">
                    <div class="mt-12" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Your Profile
                    </div>
                </v-col>
                <v-col cols="12" class="text-center">
                    <v-avatar size="155px" class="mt-5">
                        <img :src="getLine.pictureUrl" alt="" width="155">
                    </v-avatar>
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-1" style="font-size: 18px;">
                        {{ items.studentID }}
                    </div>
                    <div class="mt-1" style="font-size: 18px;">
                        {{ items.fname }} {{ items.lname }}
                    </div>
                    <div class="mt-1" style="font-size: 18px;">
                        {{ items.faculty }}
                    </div>
                </v-col>
                <v-col cols="12" >
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
                            <tr v-for="i in activitys" :key="i.id">
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
                </v-col>
                <v-col cols="12" class="text-center pl-10 pr-10">
                    <v-btn variant="flat" rounded color="deep-orange-accent-4" style="color: white !important;" class="w-100 mt-2" @click="close">
                        Close
                    </v-btn>
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
import { ref } from 'vue';
import liff from '@line/liff';

// const items = ref([])

export default {
    setup() {
        return {
        }
    },
    data () {
      return {
        items: [],
        activitys: []
      }
    },
    mounted() {
        liff.init({
            liffId: '1657670230-K8J8zq7n', //BLUEZO Event Account
        })
        liff.ready.then(() => {
            if(!liff.isLoggedIn()) {
                liff.login(); //Test PC
            }       
            liff.getProfile().then(profile => {
                console.log(profile)
                this.$store.dispatch('setLine', profile); //try
                this.getconnect();
            })
        });
    },
    methods: {
        close() {
            liff.closeWindow();
        },
        getconnect() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "lineID": this.$store.getters.getLine.userId
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
                    // items.value = result.line[0]
                    // console.log(items.value)
                    this.items = result.line[0]
                    console.log(this.items)
                    this.getActivity(this.items.studentID)
                } else if(result.message === 'not yet connected') {
                    alert('ยังไม่ได้เชื่อมโยงบัญชี')
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        },
        getActivity(studentID) {
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
        }
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        },
    },
}
</script>