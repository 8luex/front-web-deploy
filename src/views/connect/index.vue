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
                            v-model="student.studentID"
                            dense
                            label="Username"
                            color="teal-accent-3"                   
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="student.studentPassword"
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
import { computed, ref } from 'vue';
import liff from '@line/liff';
import { useStore } from 'vuex'

const store = useStore();

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
        liff.login(); //Test PC
    }
    liff.getProfile().then(profile => {
        console.log(profile)
        this.store.dispatch('setLine', profile);
        this.isDone();
    })
});
</script>

<script>
export default {
    data() {
        return {
            student: {
                studentID: this.store.getters.getStudent.id,
                studentPassword: this.store.getters.getStudent.pass,
            }
        }
    },
    // setup() {
    //     const store = useStore();

    //     const line = computed(() => store.state.line);
    //     function set() {
    //         store.dispatch('setLine', this.form)
    //     }
    //     return {
    //         note,
    //         set
    //     }
    // },
    mounted() {
    },
    methods: {
        connect() {
            this.$router.push('/connect-done') 
        },
        isDone() {
        },
    },
    computed: {
        // getStudent() {
        //     return this.store.getters.getStudent;
        // },
    },
}
</script>