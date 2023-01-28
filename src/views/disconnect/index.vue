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
                        <img :src="line.pictureUrl" alt="" width="155">
                    </v-avatar>
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-1" style="font-size: 18px;">
                        6300000
                    </div>
                    <div class="mt-1" style="font-size: 18px;">
                        ชื่อ นามสกุล
                    </div>
                    <div class="mt-1" style="font-size: 18px;">
                        วิทยาลัย
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

<script setup>
</script>

<script>
export default {
    setup() {
        const store = useStore();
        const router = useRouter()
        const route = useRoute()

        const studentID = ref('')
        const studentPassword = ref('')
        const line = computed(() => store.getters.getLine);
        //const lineID = computed(() => store.getters.getLine.userId);

        return {
            store, router, route,
            studentID, studentPassword, line,
        }
    },
    mounted() {
        liff.init({
            liffId: '1657670230-mPD2o50K', //BLUEZO Event Disconnect
        })
        liff.ready.then(() => {
            if(!liff.isLoggedIn()) {
                liff.login(); //Test PC
            }       
            liff.getProfile().then(profile => {
                console.log(profile)
                //this.lineID = profile.lineID;
                this.$store.dispatch('setLine', profile); //try
                //this.isDone();
            })
        });
    },
    methods: {
    },
    computed: {
    },
}
</script>