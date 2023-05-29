<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">บัญชี</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
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

export default {
    setup() {
        return {
            
        }
    },
    mounted() {
        liff.init({
            liffId: '1657670230-K8J8zq7n', //BLUEZO Event Account
        })
        liff.ready.then(() => {
            if(!liff.isLoggedIn()) {
                liff.login(); //Test PC
            }       
            liff.getProfile().then(profile => {
                console.log(profile)
                // this.lineID = profile.lineID;
                // this.$store.dispatch('setLine', profile);
                // this.getconnect();
            })
        });
    },
    methods: {

    },
}
</script>