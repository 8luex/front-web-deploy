<template>
    <div>
        <v-toolbar color="teal-accent-3">
            <template v-slot:prepend>
                <div class="text-h5" style="color: white !important;"><img src="/src/assets/logo.png" alt="" width="100">
                </div>
            </template>
            <v-divider class="ms-3" inset vertical></v-divider>
            <v-toolbar-title style="color: white !important;">Scholarship Activity</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-app-bar-nav-icon class="ms-2" color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" temporary location="right">
            <v-list-item prepend-avatar="/src/assets/gur.png" title="Admin"></v-list-item>
            <v-divider></v-divider>
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Activity" value="activity"
                    @click="toActivity"></v-list-item>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Student" value="student"
                    @click="toStudent"></v-list-item>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Teacher" value="teacher"
                    @click="toTeacher"></v-list-item>
                <v-list-item prepend-icon="mdi-logout-variant" title="Logout" value="logout" @click="logout"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center">
                    <div class="mt-5" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Activity
                    </div>
                    <p v-if="!activity.id" class="text-caption text-center mt-2">
                        <v-icon size="large">mdi-file-search-outline</v-icon>No results found!
                    </p>
                    <div v-else>
                        <v-card class="my-3" data-aos="zoom-in" data-aos-easing="ease">
                            <v-img height="350px" v-bind:src="activity.image"></v-img>
                            <v-container fill-height fluid>
                                <!-- sdffsdf -->
                                <v-card-title class="text-h6">
                                    {{ activity.name }}
                                </v-card-title>
                                <v-card-text>
                                    <p class="text-caption text-disabled">{{ activity.createdAt }}</p>
                                    <p v-if="activity.teacherfname == 'admin'">ผู้สร้างกิจกรรม:
                                        ศูนย์นักศึกษาทุนแห่งมหาวิทยาลัยรังสิต</p>
                                    <p v-else>ผู้สร้างกิจกรรม: {{ activity.teacherfname }} {{ activity.teacherlname }}</p>
                                    <v-chip small color="secondary" class="white--text">{{ activity.faculty }}</v-chip>
                                    <p class="detail">รายละเอียดกิจกรรม: {{ activity.detail }}</p>
                                    <p>วันที่: {{ activity.eventDate.substring(0, 10) }}</p>
                                    <p>เวลา: {{ activity.timeStart }}-{{ activity.timeEnd }}</p>
                                    <p>สถานที่: {{ activity.location }}</p>
                                    <p>จำนวนผู้ลงทะเบียน: <v-chip small color="secondary" class="white--text">{{
                                        activity.countenroll }}/{{ activity.max }}</v-chip></p>
                                    <p>ชั่วโมงกิจกรรมที่จะได้รับ: <v-chip small color="secondary"
                                            class="white--text">{{ activity.hoursToReceive }}</v-chip></p>

                                    <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;"
                                        class="mt-5 mb-4 mr-1" @click="edit">
                                        <v-icon size="large">mdi-square-edit-outline</v-icon>Edit
                                    </v-btn>
                                    <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;"
                                        class="mt-5 mb-4 mr-1" @click="downloadPDF">
                                        <v-icon size="large">mdi-arrow-collapse-down</v-icon>Download Report
                                    </v-btn>
                                    <!-- <v-btn variant="flat" rounded color="deep-orange-accent-4"
                                        style="color: white !important;" class="mt-5 mb-4" @click="stopActivity">
                                        <v-icon size="large">mdi-close-octagon-outline</v-icon>
                                    </v-btn> -->
                                    <v-text-field type="text" v-model="input" density="compact" variant="solo"
                                        label="Search students..." append-inner-icon="mdi-magnify" single-line
                                        hide-details></v-text-field>
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
                                            <tr v-for="i in filteredItems" :key="i.studentID">
                                                <td class="text-caption">{{ i.studentID }}</td>
                                                <td class="text-caption">{{ i.fname }} {{ i.lname }}</td>
                                                <td class="text-caption">{{ i.faculty }}</td>
                                                <td class="text-caption">{{ i.status }}</td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                    <p v-if="input && !filteredItems.length" class="text-caption text-center mt-2">
                                        <v-icon size="large">mdi-file-search-outline</v-icon>No results found!
                                    </p>
                                    <!-- start dialog -->
                                    <v-dialog v-model="isShowDialog" max-width="500" persistent>
                                        <v-card class="dialog-card">
                                            <v-card-title class="text-h6">
                                                แก้ไขกิจกรรม
                                            </v-card-title>
                                            <v-card-text>
                                                <v-text-field v-model="toEdit.name" color="teal-accent-3"
                                                    label="ชื่อกิจกรรม" variant="underlined"></v-text-field>
                                                <v-textarea v-model="toEdit.detail" color="teal-accent-3"
                                                    label="รายละเอียดกิจกรรม"></v-textarea>
                                                <v-file-input @change="setFile" accept="image/*" color="teal-accent-3"
                                                    label="รูปภาพ" variant="filled"
                                                    prepend-icon="mdi-camera"></v-file-input>
                                                <v-text-field v-model="toEdit.location" color="teal-accent-3"
                                                    label="สถานที่" variant="underlined"></v-text-field>
                                                <v-text-field v-model="toEdit.eventDate" type="date" color="teal-accent-3"
                                                    label="วันที่" variant="underlined"></v-text-field>
                                                <v-text-field v-model="toEdit.timeStart" type="time" color="teal-accent-3"
                                                    label="เวลาเริ่ม" variant="underlined"></v-text-field>
                                                <v-text-field v-model="toEdit.timeEnd" type="time" color="teal-accent-3"
                                                    label="เวลาสิ้นสุด" variant="underlined"></v-text-field>
                                                <v-text-field v-model="toEdit.hoursToReceive" :min=1 type="number"
                                                    color="teal-accent-3" label="จำนวนชั่วโมงที่จะได้รับ"
                                                    variant="underlined"></v-text-field>
                                                <v-text-field v-model="toEdit.max" :min=1 type="number"
                                                    color="teal-accent-3" label="จำนวนคนที่รับ"
                                                    variant="underlined"></v-text-field>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="grey" text @click="closeDialog">ปิด</v-btn>
                                                <v-btn color="teal-accent-3"
                                                    @click="editActivity(toEdit.name, toEdit.location, toEdit.detail, toEdit.eventDate, toEdit.timeStart, toEdit.timeEnd, toEdit.hoursToReceive, toEdit.max)">
                                                    แก้ไข<v-icon icon="mdi-chevron-right" end></v-icon>
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="isShowSuccess" max-width="290">
                                        <v-card>
                                            <v-card-title class="text-h6">
                                                Success
                                            </v-card-title>
                                            <v-card-text>
                                                ยืนยันการแก้ไขกิจกรรม, สำเร็จ!
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="grey" text @click="refreshDialog">ปิด</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <!-- end dialog -->
                                </v-card-text>
                                <!-- dfsf -->
                            </v-container>
                        </v-card>
                    </div>
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
import { watchEffect, ref } from 'vue';
import { useRouter } from 'vue-router'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { font } from '@/assets/THSarabunNew'
import firebase from 'firebase/app';
import 'firebase/storage';
// "firebase": "^7.16.1",

let iimmgg = ref('');

export default {
    name: 'theactivity',
    props: ['act'],
    setup() {
        const router = useRouter();
        watchEffect(() => {
            const token = localStorage.getItem('token')
            fetch('https://apricot-binturong-kit.cyclic.app/authen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicaion/json',
                    'Authorization': 'Bearer ' + token
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 'ok') {
                        console.log('authen success')
                    } else {
                        alert('authen failed')
                        localStorage.removeItem('token')
                        router.push({ path: '/' })
                    }
                })
        })
        return {
        }
    },
    mounted() {
        fetch('https://apricot-binturong-kit.cyclic.app/activitys/' + localStorage.getItem('activityID'))
            .then(res => res.json())
            .then((result) => {
                if (result.status === 'error') {
                    alert(JSON.stringify(result))
                } else {
                    this.activity = result[0]
                    this.getwhoenroll(result[0].id)
                    this.activity.eventDate = result[0].eventDate.substr(0, 10)
                    console.log(result)
                }
            })
    },
    computed: {
        // getActivity() {
        //     console.log(this.$store.getters.getActivity)
        //     this.getwhoenroll(this.$store.getters.getActivity.id)
        //     console.log('id :'+this.$store.getters.getActivity.id)
        //     return this.$store.getters.getActivity; 
        // },
        filteredItems() {
            return this.who.filter(i => {
                return (i.fname.toLowerCase().indexOf(this.input.toLowerCase()) > -1)
                    || (i.lname.toLowerCase().indexOf(this.input.toLowerCase()) > -1)
                    || (i.faculty.toLowerCase().indexOf(this.input.toLowerCase()) > -1)
                    || (i.studentID.toString().indexOf(this.input.toString()) > -1)
            })
        }
    },
    watch: {
    },
    created() {
        try {
            firebase.initializeApp({
                apiKey: "AIzaSyDhHIPsVfjKLwfYDkqhBldj4hWwyum6bW4",
                authDomain: "firegram-blue.firebaseapp.com",
                projectId: "firegram-blue",
                storageBucket: "firegram-blue.appspot.com",
                messagingSenderId: "105035319032",
                appId: "1:105035319032:web:05e49b004c5d161f111d0d"
            });
            this.storageRef = firebase.storage().ref();
            console.log('firebase here')
        } catch (error) {
            console.log(error)
            // this.$router.push('adminactivity');
            this.$router.go()
        }
    },
    data() {
        return {
            isShowDialog: false,
            isShowSuccess: false,
            drawer: null,
            activity: {
                eventDate: '',
            },
            input: '',
            who: [],
            toEdit: {
                eventDate: '',
            },
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token')
            this.$router.push('/');
        },
        toActivity() {
            this.$router.push('adminactivity');
        },
        toStudent() {
            this.$router.push('adminstudent');
        },
        toTeacher() {
            this.$router.push('adminteacher');
        },
        getwhoenroll(activityID) {
            fetch('https://apricot-binturong-kit.cyclic.app/whoenroll/' + activityID)
                .then(res => res.json())
                .then((resultwhoenroll) => {
                    if (resultwhoenroll.status === 'error') {
                        alert(JSON.stringify(resultwhoenroll))
                    } else if (resultwhoenroll.message === 'no one enroll') {
                        console.log(resultwhoenroll)
                    } else {
                        this.who = resultwhoenroll
                        console.log(resultwhoenroll)
                    }
                })
        },
        downloadPDF() {
            const today = new Date();
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

            //pdf.text(`${this.$store.getters.getActivity.name}`, 10, 15);
            //pdf.text(`ออกเมื่อ: ${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${today.toLocaleTimeString()}`, 10, 20);
            pdf.autoTable({
                body: [
                    [
                        {
                            content: `${this.activity.name}`,
                            styles: {
                                halign: 'left',
                                fontSize: 20,
                                textColor: '#5CBBF6',
                                font: "THSarabunNew"
                            }
                        },
                        {
                            content: `ออกเมื่อ: ${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${today.toLocaleTimeString()}`,
                            styles: {
                                halign: 'right',
                                fontSize: 12,
                                textColor: '#5CBBF6',
                                font: "THSarabunNew"
                            }
                        }
                    ]
                ],
                theme: 'plain',
                styles: {
                    fillColor: '#EBF7FE'
                }
            });

            pdf.autoTable({
                body: [
                    [
                        {
                            content: `รายชื่อนักศึกษา`,
                            styles: {
                                halign: 'center',
                                fontSize: 14,
                                textColor: '#000000',
                                font: "THSarabunNew"
                            }
                        }
                    ]
                ],
                theme: 'plain',
                styles: {
                    fillColor: '#FFFFFF'
                }
            });

            // pdf.setLineWidth(0.1).line(10, 25, 200, 25); // horizontal line
            pdf.autoTable({
                columns,
                body: this.who,
                // margin: { left: 15, top: 30 },
                theme: 'striped', //grid
                styles: { font: "THSarabunNew" }
            });
            pdf.save('Report.pdf');
        },
        setFile(event) {
            const d = new Date();
            let time = d.getTime();
            this.file = event.target.files[0];
            const fileRef = this.storageRef.child(`images/${time}${this.file.name}`);
            fileRef.put(this.file)
                .then((snapshot) => {
                    this.imageurl = snapshot.ref.getDownloadURL();
                    // console.log(imageurl); // Promise { <pending> }
                    this.imageurl.then(function (result) {
                        // console.log(result) // "Some User token"
                        iimmgg = result;
                        console.log('File uploaded successfully! ' + iimmgg);
                    })
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        },
        edit() {
            fetch('https://apricot-binturong-kit.cyclic.app/activitys/' + localStorage.getItem('activityID'))
                .then(res => res.json())
                .then((result) => {
                    if (result.status === 'error') {
                        alert(JSON.stringify(result))
                    } else {
                        this.toEdit = result[0]
                        this.toEdit.eventDate = result[0].eventDate.substr(0, 10)
                        console.log(result)
                    }
                })
            this.isShowDialog = true
        },
        editActivity(name, location, detail, eventDate, timeStart, timeEnd, hoursToReceive, max) {
            if (iimmgg.value == '') { //not change image
                iimmgg = this.toEdit.image
                console.log('iimmgg is null : ' + this.toEdit.image)
            } else { //change image
                console.log('iimmgg is not null : ' + iimmgg)
            }

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "name": name,
                "detail": detail,
                "location": location,
                "eventDate": eventDate,
                "timeStart": timeStart,
                "timeEnd": timeEnd,
                "hoursToReceive": hoursToReceive,
                "image": iimmgg,
                "max": max,
                "id": localStorage.getItem('activityID')
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://apricot-binturong-kit.cyclic.app/editactivity", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'ok') {
                        this.isShowSuccess = true
                    } else if (result.message === 'affected Rows is 0') {
                        alert('affected Rows is 0')
                    } else {
                        alert(JSON.stringify(result))
                    }
                })
                .catch(error => console.log('error', error));
        },
        closeDialog() {
            iimmgg = ref('');
            fetch('https://apricot-binturong-kit.cyclic.app/activitys/' + localStorage.getItem('activityID'))
                .then(res => res.json())
                .then((result) => {
                    if (result.status === 'error') {
                        alert(JSON.stringify(result))
                    } else {
                        this.toEdit = result[0]
                        this.toEdit.eventDate = result[0].eventDate.substr(0, 10)
                        console.log(result)
                    }
                })
            this.isShowDialog = false
        },
        refreshDialog() {
            // fetch('https://apricot-binturong-kit.cyclic.app/activitys/'+localStorage.getItem('activityID'))
            // .then(res => res.json())
            // .then((result) => {
            //     if(result.status === 'error') {
            //         alert(JSON.stringify(result))
            //     } else {
            //         this.toEdit = result[0]
            //         this.toEdit.eventDate = result[0].eventDate.substr(0,10)
            //         console.log(result)
            //     }
            // })
            // this.isShowSuccess = false
            this.$router.go()
        },
        stopActivity() {

        },
    },
}
</script>

<style lang="scss" scoped>.bluehover:hover {
    text-decoration: underline;
}</style>