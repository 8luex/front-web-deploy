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
                } else if(result.message === 'not yet connected') {
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