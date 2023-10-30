// BEGIN: ed8c6549bwf9
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
                    <VCalendar :initial-page="{ month: new Date().getMonth() + 1, year: new Date().getFullYear() }"
                        :attributes="attributes" />
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

export default {
    name: 'CalendarView',
    setup() {
        return {
        }
    },
    data() {
        return {
            items: [],
            activitys: [],
            studenthour: [],
            attributes: ref([
                {
                    dot: {
                        style: {
                            backgroundColor: '#DD2C00',
                        },
                    },
                    dates: [
                        // new Date(2023, 9, 12),
                        // new Date(2023, 3, 26),
                        // new Date(2023, 5, 15),
                        // new Date(2023, 6, 15),
                    ],
                },
            ])
        }
    },
    mounted() {
        //  this.getActivity(6300195);
        fetch('https://apricot-binturong-kit.cyclic.app/activitys')
            .then(res => res.json())
            .then((result) => {
                if (result.status === 'error') {
                    alert(JSON.stringify(result))
                } else {
                    this.activitys = result
                    console.log(result)
                    const fetchedDates = result.map(activity => new Date(activity.eventDate));

                    // Update the dates inside the attributes object
                    this.attributes[0].dates = fetchedDates;
                }
            })
        console.log('งงView')
        console.log(JSON.stringify(this.attributes[0].dates))
    },
    methods: {
        close() {
            liff.closeWindow();
        },
        // getActivity(studentID) {
        //     fetch('https://apricot-binturong-kit.cyclic.app/activitysalreadyenroll/'+studentID)
        //     .then(res => res.json())
        //     .then((resultact) => {
        //         if(resultact.status === 'error') {
        //             alert(JSON.stringify(resultact))
        //         } else if(resultact.message === 'no activitys enroll') {
        //             this.activitys = []
        //             console.log(resultact)
        //         } else {
        //             this.activitys = resultact
        //             console.log(resultact)
        //         }
        //     })
    }
}
// END: ed8c6549bwf9
