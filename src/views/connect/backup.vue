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
                            v-model="student.id"
                            dense
                            label="Username"
                            color="teal-accent-3"                   
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="student.pass"
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

<script>
export default {
    data() {
        return {
            student: {
                id: this.$store.getters.getStudent.id,
                fname: this.$store.getters.getStudent.fname,
                lname: this.$store.getters.getStudent.lname,
                pass: this.$store.getters.getStudent.pass,
                faculty: this.$store.getters.getStudent.faculty,
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
        // connect() {
        //     store.dispatch('setStudent', this.student);
        //     var myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");

        //     var raw = JSON.stringify({
        //         "studentID": getStudent.studentID,
        //         "studentPassword": getStudent.studentID,
        //         "lineID": getLine.userId
        //     });

        //     var requestOptions = {
        //         method: 'POST',
        //         headers: myHeaders,
        //         body: raw,
        //         redirect: 'follow'
        //     };

        //     fetch("https://apricot-binturong-kit.cyclic.app/login", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         if(result.status === 'ok') {
        //             this.$router.push('/connect-done') 
        //         } else {
        //             alert(result.message)
        //         }
        //     })
        //     .catch(error => console.log('error', error));
        // },
    },
    computed: {
        getStudent() {
            return this.$store.getters.getStudent;
        },
        getLine() {
            return this.$store.getters.getLine;
        },
    },
}
</script>

<script setup>
import { computed, ref } from 'vue';
import liff from '@line/liff';
import { useStore } from 'vuex'

const store = useStore();

// const connect = () => {
//     this.$router.push('/connect/done')
// }

const connect=() =>{
            // store.dispatch('setStudent', this.student);
            console.log(this.student)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "studentID": getStudent.id,
                "studentPassword": getStudent.pass,
                "lineID": getLine.userId
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
                    this.$router.push('/connect-done') 
                } else {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
        }

// const studentID = ref([])
// const studentPassword = ref([])
// const lineID = ref([])

// function isDone() {
    
// }

liff.init({
    liffId: '1657670230-Jo7GP1Mv', //BLUEZO Event Connect
})
liff.ready.then(() => {
    if(!liff.isLoggedIn()) {
        liff.login(); //Test PC
    }
    liff.getProfile().then(profile => {
        console.log(profile)
        store.dispatch('setLine', profile);
        //this.isDone();
    })
});
</script>

