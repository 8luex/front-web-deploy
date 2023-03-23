<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">กิจกรรมที่สร้าง</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <v-btn color="teal-accent-3" text @click="viewTicket()">ลงทะเบียน</v-btn>
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-2 text-caption text-disabled">
                        &copy;Scholarship Activity 2023
                    </div>
                </v-col>
            </v-row>
            <v-dialog v-model="isShowDialog" max-width="290">
                <v-card class="dialog-card">
                    <v-img cover class="white--text align-end" height="200px"></v-img>
                    <v-card-title class="text-h6">
                        cbnvbnc
                    </v-card-title>
                    <v-card-text>
                        <p class="text-caption text-disabled">cvbn</p>
                        <p>ผู้สร้างกิจกรรม: cvbnvbn</p>
                        <p>bncvbn</p>
                        <p class="detail">รายละเอียดกิจกรรม: vbcnvbncffggggffffffffffff fgggggggg fgfgf gfgf gf gf fgfgf gffgfgf gfg f gfg gfgfgfgfgfgfg fggfgfgfg fggfgfgfg gf gfg fgggfgf gf gf fgfgf gffgfgf gfg f gfg gfgfgfgfgfgfg fggfgfgfg fggfgfgfg gf gfg fgggf gf fgfgf gffgfgf gfg f gfg gfgfgfgfgfgfg fggfgfgfg fggfgfgfg gf gfg fggf g fgfgfgfgfg gf</p>
                        <p>วันที่: cbncvb</p>
                        <p>เวลา: cbnv</p>
                        <p>สถานที่: cbncvb</p>
                        <p>ชั่วโมงกิจกรรมที่จะได้รับ: cbvnvb</p>
                        <VueQrcode
                        v-bind:value="items"
                        v-bind:color="qrColor"
                        v-bind:type="qrType"
                        v-bind:errorCorrectionLevel="correctionLevel"
                        />
                        <v-btn variant="flat" rounded color="teal-accent-3" style="color: white !important;" class="w-100 mt-2" @click="viewTicket()">
                            <v-icon size="large">mdi-line-scan</v-icon>Scan to check
                        </v-btn>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="isShowDialog = false">ยกเลิก</v-btn>
                        <v-btn color="teal-accent-3" text @click="isShowDialog = false">ลงทะเบียน</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import VueQrcode from 'vue-qrcode'
import { ref } from 'vue';
export default {
    name: 'myactivityenroll',
    components: {
        VueQrcode
    },
    data () {
        return {
            qrValue : "Mysecretvalue",
            qrColor: {
                dark:"#1DE9B6",
                light:"#FFFFFF"
            },
            qrType: "image/png",
            correctionLevel: "H",
            isShowDialog: false,
        }
    },
    setup() {
        const items = ref('')
        items.value = "dgfgdfg"+"1111gfhdfhdf"
        return {
            items,
        }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
        viewTicket() {
            this.isShowDialog = true

        }
    }
}
</script>

<style lang="scss" scoped>
</style>