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
                            label="Username"
                            color="teal-accent-3"                   
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="studentPassword"
                            dense
                            label="Password"
                            color="teal-accent-3"
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

<script setup>
import { ref } from 'vue';
import liff from '@line/liff';
// const connect = () => {
//     this.$router.push('/connect/done')
// }
const studentID = ref([])
const studentPassword = ref([])
const lineID = ref([])

liff.init({
    liffId: '1657670230-Jo7GP1Mv', //BLUEZO Event Connect
})
liff.ready.then(() => {
    if(!liff.isLoggedIn()) {
        liff.login();
    }
    liff.getProfile().then(profile => {
        console.log(profile)
    })
});
</script>

<script>
export default {
    mounted() {
    },
    methods: {
        connect() {
            this.$router.push('/connect-done') 
        }
    }
}
</script>