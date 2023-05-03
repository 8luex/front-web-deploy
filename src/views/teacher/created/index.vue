<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">กิจกรรมที่สร้าง</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <CardCreated
                    v-for="item in items"
                    :key="item.id"
                    :act="item"
                    v-on:viewTicket="viewTicket(item)"
                    />
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-2 text-caption text-disabled">
                        &copy;Scholarship Activity 2023
                    </div>
                </v-col>
            </v-row>
            <v-dialog v-model="isShowDialog" max-width="290">
                <v-card class="dialog-card">
                    <v-img cover class="white--text align-end" height="200px" :src="dialog.image"></v-img>
                    <v-card-title class="text-h6">
                        {{ dialog.name }}
                    </v-card-title>
                    <v-card-text>
                        <p class="text-caption text-disabled">{{ dialog.createdAt }}</p>
                        <p>ผู้สร้างกิจกรรม: {{ dialog.teacherfname }} {{ dialog.teacherlname }}</p>
                        <p>{{ dialog.faculty }}</p>
                        <p class="detail">รายละเอียดกิจกรรม: {{ dialog.detail }}</p>
                        <p>วันที่: {{ dialog.eventDate.substring(0,10) }}</p>
                        <p>เวลา: {{ dialog.timeStart }}-{{ dialog.timeEnd }}</p>
                        <p>สถานที่: {{ dialog.location }}</p>
                        <p>ชั่วโมงกิจกรรมที่จะได้รับ: {{ dialog.hoursToReceive }}</p>
                        <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="w-100 mt-2 mb-2" @click="scan()">
                            <v-icon size="large">mdi-line-scan</v-icon>Scan to check
                        </v-btn>
                        <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="w-100 mb-2" @click="downloadPDF()">
                            <v-icon size="large">mdi-arrow-collapse-down</v-icon>Download Report
                        </v-btn>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-left text-caption">
                                    รหัสนักศึกษา
                                    </th>
                                    <th class="text-left text-caption">
                                    ชื่อ-นามสกุล
                                    </th>
                                    <th class="text-left text-caption">
                                    คณะ
                                    </th>
                                    <th class="text-left text-caption">
                                    สถานะ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="i in who" :key="i.activityID">
                                    <td class="text-caption">{{ i.studentID }}</td>
                                    <td class="text-caption">{{ i.fname }} {{ i.lname }}</td>
                                    <td class="text-caption">{{ i.faculty }}</td>
                                    <td class="text-caption">{{ i.status }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="isShowDialog = false">ปิด</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            
            <v-dialog v-model="isShowSuccess" max-width="290">
                <v-card>
                    <v-card-title class="text-h6">
                        Success
                    </v-card-title>
                    <v-card-text>
                        ยืนยันการทำกิจกรรม, สำเร็จ!
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="isShowSuccess = false">ปิด</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="isShowError" max-width="290">
                <v-card>
                    <v-card-title class="text-h6">
                        Error
                    </v-card-title>
                    <v-card-text>
                        รหัสกิจกรรมไม่ถูกต้อง, โปรดลองใหม่อีกครั้ง!
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="isShowError = false">ปิด</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="isShowWarning" max-width="290">
                <v-card>
                    <v-card-title class="text-h6">
                        Warning
                    </v-card-title>
                    <v-card-text>
                        ไม่พบข้อมูล, โปรดลองใหม่อีกครั้ง!
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="isShowWarning = false">ปิด</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import CardCreated from '@/components/CardCreated.vue'
import { ref } from 'vue';
import liff from '@line/liff';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { font } from '@/assets/THSarabunNew'

// const items = ref([])

export default {
    name: 'myactivityenroll',
    components: {
        CardCreated
    },
    data () {
        return {
            isShowWarning: false,
            isShowError: false,
            isShowSuccess: false,
            isShowDialog: false,
            dialog : {
                id: '',
                name: '',
                createdAt: '',
                location: '',
                creator: '',
                //faculty: '',
                detail: '',
                eventDate: '',
                timeStart: '',
                timeEnd: '',
                hoursToReceive: '',
                image: ''
            },
            who : []
        }
    },
    setup() {
        const items = ref([])
        const tcID = ref('')

        const getconnect = (lineID) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "lineID": lineID
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/teacherdisconnectcheck", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.message === 'already connected') {
                    console.log(result)//Test
                    tcID.value = result.line[0].teacherID // add on
                    getactivitysalreadyenroll(result.line[0].teacherID);
                } else if(result.message === 'not yet connected') {
                    alert('ยังไม่ได้เชื่อมโยงบัญชี')
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        };
        const getactivitysalreadyenroll = (teacherID) => {
            fetch('https://apricot-binturong-kit.cyclic.app/teachercreated/'+teacherID)
            .then(res => res.json())
            .then((resultact) => {
                if(resultact.status === 'error') {
                    alert(JSON.stringify(resultact))
                } else if(resultact.message === 'no activitys created') {
                    console.log(resultact)
                } else {
                    items.value = resultact
                    console.log(resultact)
                }
            })
        };
        
        liff.init({
            liffId: '1657670230-PG7QLNZ4', //BLUEZO Event Activitys Created
        })
        liff.ready.then(() => {
            if(!liff.isLoggedIn()) {
                liff.login(); //Test PC
            }       
            liff.getProfile().then(profile => {
                console.log(profile)
                getconnect(profile.userId);
            })
        });

        return {
            items, tcID,
        }
        
    },
    mounted() {
        
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        },
    },
    methods: {
        viewTicket(item) {
            this.dialog= item
            console.log(this.dialog.id)
            this.getwhoenroll(this.dialog.id)
            this.isShowDialog = true
        },
        scan() {
            liff.scanCodeV2().then(result => {
                // alert(JSON.stringify(result.value))
                if(result.value == null) {
                    this.isShowWarning = true
                    //alert('nothing!, pls try again.');
                } else {
                    let res = result.value;
                    let stID = res.substr(0,7);
                    let actID = res.substr(7);
                    //alert(this.dialog.id);
                    if(actID == this.dialog.id) {
                        this.setactivitystatustrue(actID, stID)
                    } else {
                        this.isShowError = true
                        //alert("error!, pls try again");
                    }
                }
            })
            .catch(e => alert(e))
        },
        setactivitystatustrue(activityID, studentID) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "activityID": activityID,
                "studentID": studentID
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/setactivitystatustrue", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.message === 'update activity true complete') {
                    //router.push({ path: '/connect-done' })
                    //alert("ยืนยันการทำกิจกรรม สำเร็จ!")
                    this.isShowSuccess = true
                } else {
                    alert(JSON.stringify(result))
                }
            })
            .catch(error => console.log('error', error));
        },
        getwhoenroll(activityID) {
            fetch('https://apricot-binturong-kit.cyclic.app/whoenroll/'+activityID)
            .then(res => res.json())
            .then((resultwhoenroll) => {
                if(resultwhoenroll.status === 'error') {
                    alert(JSON.stringify(resultwhoenroll))
                } else if(resultwhoenroll.message === 'no one enroll') {
                    console.log(resultwhoenroll)
                } else {
                    this.who = resultwhoenroll
                    console.log(resultwhoenroll)
                }
            })
        },
        downloadPDF() {
        let columns = [
          { title: "รหัสนักศึกษา", dataKey: "studentID" },
          { title: "ชื่อ", dataKey: "fname" },
          { title: "นามสกุล", dataKey: "lname" },
          { title: "คณะ", dataKey: "faculty" },
          { title: "สถานะ", dataKey: "status" },
        ];
        var pdf = new jsPDF();

        // add the font to jsPDF
        pdf.addFileToVFS("THSarabunNew.ttf", font);
        pdf.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
        pdf.setFont("THSarabunNew");

        //pdf.setFont("courier");
        pdf.text(`${this.dialog.name}`, 10, 15);
        pdf.setLineWidth(0.1).line(10, 20, 200, 20); // horizontal line
        //pdf.autoTable({ html: '#toPDF', margin: { left: 10, top: 25 } });
        pdf.autoTable({
            columns,
            body: this.who,
            margin: { left: 10, top: 25 },
            theme: 'grid',
            styles: {font: "THSarabunNew"}
        });
        pdf.save('Report.pdf');
      },
    }
}
</script>


<style lang="scss" scoped>
</style>