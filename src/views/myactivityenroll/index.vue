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
                    :act="item"/>
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
import CardEnroll from '@/components/CardEnroll.vue'
import { ref } from 'vue';
import liff from '@line/liff';

// const items = ref([])

export default {
    name: 'myactivityenroll',
    components: {
        CardEnroll
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
            items, stID,
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
            this.dialog= item
        }
    }
}
</script>


<style lang="scss" scoped>
</style>