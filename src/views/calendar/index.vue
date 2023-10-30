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
                    <!-- <VCalendar :initial-page="{ month: new Date().getMonth() + 1, year: new Date().getFullYear() }"
                        :attributes="attributes" @change="handleDayClick"/> -->
                    <VCalendar :initial-page="initialPage" :attributes="attributes" ref="calendar"
                        @click="handleGetSelectedMonth" />
                </v-col>
                <v-col cols="12">
                    <v-timeline side="end" align="start">
                        <v-timeline-item v-for="i in selectedActivitys" :key="i.id" dot-color="#DD2C00" size="small">
                            <div class="d-flex">
                                <!-- <strong v-if="i.name.length<20" class="me-4">{{ i.name }}</strong>
                                <strong v-else class="me-4">{{ i.name.substring(0,20)+".." }}</strong> -->
                                <div>
                                    <strong>{{ i.name }}</strong>
                                    <div class="text-caption mb-2">
                                        วันที่ {{ i.eventDate.substring(0, 10) }} เวลา {{ i.timeStart }}
                                    </div>
                                </div>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
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
import { ref, isProxy, toRaw } from 'vue';
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
            initialPage: ref([{ month: new Date().getMonth() + 1, year: new Date().getFullYear() }]),
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
            ]),
            groupedByMonth: [],
            selectedActivitys: []
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

                    const currentDate = new Date();
                    const monthCurrently = currentDate.getMonth() + 1
                    const yearCurrently = currentDate.getFullYear();
                    console.log(monthCurrently);
                    console.log(yearCurrently);

                    const filteredData = this.activitys.filter(item => {
                        const eventDate = new Date(item.eventDate);
                        return eventDate.getMonth() + 1 === monthCurrently && eventDate.getFullYear() === yearCurrently;
                    });

                    this.selectedActivitys = filteredData;
                }
            })
        console.log(JSON.stringify(this.attributes[0].dates))
    },
    methods: {
        close() {
            liff.closeWindow();
        },
        handleGetSelectedMonth() {
            const proxy = { ...this.$refs.calendar }
            console.log(proxy);
            const proxyPages = { ...proxy.pages }
            const proxyPagesCurrently = { ...proxyPages[0] }
            const monthCurrently = proxyPagesCurrently.month
            const yearCurrently = proxyPagesCurrently.year
            console.log(monthCurrently);
            console.log(yearCurrently);

            const filteredData = this.activitys.filter(item => {
                const eventDate = new Date(item.eventDate);
                return eventDate.getMonth() + 1 === monthCurrently && eventDate.getFullYear() === yearCurrently;
            });

            this.selectedActivitys = filteredData;
        },
        handleDayClick() {
            // calendar.value.moveBy(-1);
            // console.log(this.$refs.calendar.value);
            // console.log(this.initialPage[0].month);
            // // Get the selected month from the clicked date
            // const selectedMonth = date.getMonth() + 1; // Months are 0-based, so add 1 to get the actual month
            // console.log("Selected Month:", selectedMonth);

            // // Update the selectedMonth data property if needed
            // this.selectedMonth = selectedMonth;

            // // แบ่งข้อมูลตามเดือนโดยใช้ reduce
            // this.groupedByMonth = this.activitys.reduce((acc, activity) => {
            //     const activityDate = new Date(activity.eventDate);
            //     const month = activityDate.getMonth();
            //     if (!acc[month]) {
            //         acc[month] = [];
            //     }
            //     acc[month].push(activity);
            //     return acc;
            // });
            // console.log(this.groupedByMonth);
            // console.log(this.groupedByMonth[9]);
        },
    },
    computed: {
    },
    components: {
    },
}
</script>
<style>
.vc-container .vc-weekday-1,
.vc-container .vc-weekday-7 {
    color: #6366f1;
}
</style>