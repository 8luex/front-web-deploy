<template>
    <div>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12" class="text-center pb-0 pt-10">
                    <v-icon class="mt-12 mb-9" size="large" color="teal-accent-3">mdi-check-circle-outline</v-icon>
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="mt-5" style="color: #1DE9B6;font-size: 20px;font-weight: bold;">
                        Enroll for the event Successful! 
                    </div>
                    <div class="mt-1 text-subtitle-1 text-disabled">
                        อย่าลืมไปทำกิจกรรมที่ลงทะเบียนไว้
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
</script>

<script>
export default {
    methods: {
        close() {
            liff.closeWindow();
        }
    }
}
</script>

<style lang="scss" scoped>
.mdi:before, .mdi-set {
    font-size: 120px;
}
</style>