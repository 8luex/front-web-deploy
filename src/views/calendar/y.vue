<template>
    <div>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center pb-0 pt-10">
                    <div class="mt-12" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Calendar
                    </div>
                </v-col>
                <v-col cols="12" class="text-center">

                </v-col>
                <v-col cols="12" class="text-center pl-10 pr-10">
                    <v-btn variant="flat" rounded color="deep-orange-accent-4" style="color: white !important;"
                        class="w-100 mt-2" @click="close">
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
    data() {
        return {
            items: [],
            activitys: [],
            studenthour: [],
        }
    },
    mounted() {
        this.getActivity(6300195);
    },
    methods: {
        close() {
            //liff.closeWindow();
        },
        getActivity(studentID) {
            fetch('https://apricot-binturong-kit.cyclic.app/activitysalreadyenroll/' + studentID)
                .then(res => res.json())
                .then((resultact) => {
                    if (resultact.status === 'error') {
                        alert(JSON.stringify(resultact))
                    } else if (resultact.message === 'no activitys enroll') {
                        this.activitys = []
                        console.log(resultact)
                    } else {
                        this.activitys = resultact
                        console.log(resultact)
                    }
                })
        },
    },
    computed: {
    },
    components: {
    },
}
</script>