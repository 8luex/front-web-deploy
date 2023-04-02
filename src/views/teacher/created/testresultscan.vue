<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">กิจกรรมที่สร้าง</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="w-100 mt-2" @click="scan()">
                <v-icon size="large">mdi-line-scan</v-icon>Scan to check
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import liff from '@line/liff';
export default {
    name: 'myactivityenroll',
    setup() {
        liff.init({
            liffId: '1657670230-PG7QLNZ4', //BLUEZO Event Activitys Created
        })
        liff.ready.then(() => {
            if(!liff.isLoggedIn()) {
                liff.login(); //Test PC
            }       
            liff.getProfile().then(profile => {
                console.log(profile)
            })
        });
        return {
        }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
        scan() {
            liff.scanCodeV2().then(result => {
                // alert(JSON.stringify(result.value))
                alert(result.value);
            })
            .catch(e => alert(e))
        },
    }
}
</script>