<template>
    <div>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center pb-0 pt-10">
                    <v-avatar size="155px" class="mt-12">
                        <img src="@/assets/gur.png" alt="" width="155">
                    </v-avatar>
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-5" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Please sign in
                    </div>
                </v-col>
                <v-col cols="12" class="text-center pl-10 pr-10">
                    <v-form>
                        <v-text-field
                            v-model="teacherID"
                            dense
                            :rules="[rules.required]"
                            label="Username"
                            color="teal-accent-3"                   
                        >
                        </v-text-field>
                        <v-text-field
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                            v-model="teacherPassword"
                            dense
                            :rules="[rules.required]"
                            label="Password"
                            color="teal-accent-3"
                            class="set-eye"
                        >
                        </v-text-field>
                        <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="w-100 mt-2" @click="connect">
                            Sign in
                        </v-btn>
                    </v-form>
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
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
    setup() {
        const store = useStore();
        const router = useRouter()
        const route = useRoute()

        const teacherID = ref('')
        const teacherPassword = ref('')
        const lineID = computed(() => store.getters.getLine.userId);


        const lineinsert = () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "teacherID": teacherID.value,
                "lineID": lineID.value
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/teacherlineinsert", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.message === 'insert complete') {
                    router.push({ path: '/connect-done-teacher' })
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        }

        const lineupdate = () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "teacherID": teacherID.value,
                "lineID": lineID.value
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/teacherlineupdate", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.message === 'update complete') {
                    router.push({ path: '/connect-done-teacher' })
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        }

        const connectx = () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "lineID": lineID.value
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/teacherconnectcheck", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.message === 'already connected') {
                    lineupdate();
                } else if(result.message === 'not yet connected') {
                    lineinsert();
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        }

        const connect = () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "teacherID": teacherID.value,
                "teacherPassword": teacherPassword.value,
                "lineID": lineID.value
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/teacherlogin", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status === 'ok') {
                    connectx();
                } else if(result.message === 'connected failed') {
                    alert('Username หรือ Password ไม่ถูกต้อง')
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        }

        return {
            store, router, route,
            teacherID, teacherPassword, lineID,
            connect, connectx, lineinsert, lineupdate
        }
    },
    data() {
        return {
            rules: {
                required: value => !!value || 'required.',
            },
            show: false,
            password: 'Password',
        }
    },
    mounted() {
        liff.init({
            liffId: '1657670230-qz54A01E', //BLUEZO Event Connect Teacher
        })
        liff.ready.then(() => {
            if(!liff.isLoggedIn()) {
                liff.login(); //Test PC
            }       
            liff.getProfile().then(profile => {
                console.log(profile)
                this.$store.dispatch('setLine', profile); //try
            })
        });
    },
    methods: {
    },
    computed: {
    },
}
</script>

<style lang="scss" scoped>
::v-deep .v-messages__message {
    text-align: left;
}

.set-eye {
    position: relative;
    ::v-deep .v-input__append {
    position: absolute;
    right: 10px;
}
}
</style>