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
                <v-col cols="12" class="text-center pl-10 pr-10">
                    <v-btn variant="flat" rounded color="deep-orange-accent-4" style="color: white !important;"
                        class="w-100 mt-2" @click="close">
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

<script setup>
// const items = ref([])

// fetch('https://apricot-binturong-kit.cyclic.app/studentgetconnectcheck/'+getLine.userId.value)
// .then(res => res.json())
// .then((result) => {
//   items.value = result
//   console.log(result)
// })
</script>

<script>
import { computed, ref } from 'vue';
import liff from '@line/liff';
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

//const store = useStore();
const items = ref([])

export default {
    setup() {
        // const store = useStore();
        // const lineID = computed(() => store.getters.getLine.userId);
        // const items = ref([])

        // const getconnect = () => {
        //     var myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");

        //     var raw = JSON.stringify({
        //         "lineID": lineID.value
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
        //             items.value = result.line
        //         } else if(result.message === 'not yet connected') {
        //             alert('ยังไม่ได้เชื่อมโยงบัญชี')
        //         } else {
        //             alert(JSON.stringify(result))
        //         }
        //     })
        //     .catch(error => console.log('error', error));
        // }

        return {
            // store, 
            // lineID,
            // items,
            // getconnect
        }
    },
    mounted() {
        liff.init({
            liffId: '1657670230-mPD2o50K', //BLUEZO Event Disconnect
        })
        liff.ready.then(() => {
            if (!liff.isLoggedIn()) {
                liff.login(); //Test PC
            }
            liff.getProfile().then(profile => {
                console.log(profile)
                //this.lineID = profile.lineID;
                this.$store.dispatch('setLine', profile); //try
                this.getconnect();
                //this.isDone();
            })
        });
    },
    methods: {
        close() {
            fetch('https://apricot-binturong-kit.cyclic.app/unlink-richmenu/' + this.$store.getters.getLine.userId)
                .then(res => res.json())
                .then((result) => {
                    liff.closeWindow();
                    items.value = result
                    console.log(result)
                })
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
                    if (result.message === 'already connected') {
                        items.value = result.line[0]
                        console.log(result)//Test
                    } else if (result.message === 'not yet connected') {
                        alert('ยังไม่ได้เชื่อมโยงบัญชี')
                    } else {
                        alert(JSON.stringify(result))
                    }
                })
                .catch(error => console.log('error', error));
        }
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        },
    },
}
</script>