<template>
    <div>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center pb-0 pt-10">
                    <v-avatar size="155px" class="mt-12">
                        <img :src="getLine.pictureUrl" alt="" width="155">
                    </v-avatar>
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-5" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Welcome, 
                    </div>
                    <div class="mt-1" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Connected Successfully!
                    </div>
                </v-col>
                <v-col cols="12" class="text-center pl-10 pr-10">
                    <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="w-100 mt-2" @click="close">
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

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
// const connect = () => {
//     this.$router.push('/connect/done')
// }
const teacherID = ref([])
const teacherPassword = ref([])
const lineID = ref([])
</script>

<script>
export default {
    methods: {
        close() {
            //this.$router.push('/connect')
            liff.closeWindow();
        }
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        },
    },
}
</script>