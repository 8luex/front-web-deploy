<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">บัญชี</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center">
                    <v-avatar size="155px" class="mt-5">
                        <img :src="account.pictureUrl" alt="" width="155">
                    </v-avatar>
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-1" style="font-size: 18px;">
                        {{ account.studentID }}
                    </div>
                    <div class="mt-1" style="font-size: 18px;">
                        {{ account.fname }} {{ account.lname }}
                    </div>
                    <div class="mt-1" style="font-size: 18px;">
                        {{ account.faculty }}
                    </div>
                </v-col>
                <v-col cols="12" class="text-center pl-10 pr-10">
                    <v-btn variant="flat" rounded color="deep-orange-accent-4" style="color: white !important;" class="w-100 mt-2" @click="close">
                        Disconnect Account
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
import { computed, ref } from 'vue';
import liff from '@line/liff';

export default {
    setup() {
        return {
            line: [],
            account: [],
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
                this.line = profile;
                console.log(this.line)
                console.log(this.line.userId)
                // this.$store.dispatch('setLine', profile);
                // this.getconnect();
            })
        });

        // var myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");

        //     var raw = JSON.stringify({
        //         "lineID": this.line.userId
        //     });

        //     var requestOptions = {
        //         method: 'POST',
        //         headers: myHeaders,
        //         body: raw,
        //         redirect: 'follow'
        //     };

        //     fetch("https://apricot-binturong-kit.cyclic.app/studentdisconnectcheck", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         if(result.message === 'already connected') {
        //             this.account.value = result.line[0]
        //             console.log(this.account) // Test
        //         } else if(result.message === 'not yet connected') {
        //             alert('ยังไม่ได้เชื่อมโยงบัญชี')
        //         } else {
        //             alert(JSON.stringify(result))
        //         }
        //     })
        //     .catch(error => console.log('error', error));
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "lineID": this.line.userId.value
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
                    // this.account = result.line[0].studentID;
                    this.account = result.line[0];
                    console.log(this.account)
                    // getactivitysalreadyenroll(result.line[0].studentID);
                } else if(result.message === 'not yet connected') {
                    alert('ยังไม่ได้เชื่อมโยงบัญชี')
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
    },
    methods: {
        close() {console.log("close")},
    },
}
</script>