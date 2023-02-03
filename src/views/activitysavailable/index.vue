<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">กิจกรรม</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <div
                    v-for="item in items"
                    :key="item.id">
                    {{ item.id }}
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>



<script>
import Card from '@/components/Card.vue'
import { ref } from 'vue';
import liff from '@line/liff';

const items = ref([])

export default {
    name: 'activity',
    components: {
        Card
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
    mounted() {
        liff.init({
            liffId: '1657670230-kRRQZ1nN', //BLUEZO Event Activitys Available
        })
        liff.ready.then(() => {
            if(!liff.isLoggedIn()) {
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
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        },
    },
    methods: {
        moreDetail(item) {
            this.isShowDialog = true
            this.dialog= item
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
                    console.log(result)//Test
                    this.getactivitysavailable(result.line[0].studentID);
                } else if(result.message === 'not yet connected') {
                    alert('ยังไม่ได้เชื่อมโยงบัญชี')
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        },
        getactivitysavailable(studentID) {
            fetch('https://apricot-binturong-kit.cyclic.app/activitysavailable/'+studentID)
            .then(res => res.json())
            .then((resultact) => {
                if(resultact.status === 'error') {
                    alert(JSON.stringify(resultact))
                } else if(resultact.message === 'no activitys available') {
                    console.log(resultact)
                } else {
                    //alert(JSON.stringify(resultact))
                    //this.items = resultact
                    items.value = resultact
                    console.log(items.value)
                }
            })
        }
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