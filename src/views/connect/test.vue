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
                            v-model="studentID"
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
                            v-model="studentPassword"
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

        const studentID = ref('')
        const studentPassword = ref('')
        const lineID = ref('')

        const connectx = () => {
            alert(studentID.value);
            alert(studentPassword.value);
            alert(lineID.value);
        }

        const connect = () => {
            //useStore().dispatch('setStudent', this.student);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "studentID": studentID.value,
                "studentPassword": studentPassword.value,
                "lineID": lineID.value
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status === 'ok') {
                    //this.$router.push('/connect-done')
                    router.push({ path: '/connect-done' })
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        }

        return {
            store, router, route,
            studentID, studentPassword, lineID,
            connect, connectx
        }
    },
    data() {
        return {
            // student: {
            //     id: null,
            //     fname: null,
            //     lname: null,
            //     pass: null,
            //     faculty: null,
            // },
            rules: {
                required: value => !!value || 'required.',
            },
            show: false,
            password: 'Password',
        }
    },
    mounted() {
    },
    methods: {
        // back() {

        // },
    },
    computed: {
        // getStudent() {
        //     return this.$store.getters.getStudent;
        // },
        // getLine() {
        //     return this.$store.getters.getLine;
        // },
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