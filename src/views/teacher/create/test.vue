<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">สร้างกิจกรรม</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <v-card class="mx-auto" max-width="344" title="กิจกรรม">
                      <v-container>
                        <v-text-field
                          color="teal-accent-3"
                          label="ชื่อกิจกรรม"
                          variant="underlined"
                        ></v-text-field>
                        <v-textarea
                          color="teal-accent-3"
                          label="รายละเอียดกิจกรรม"
                        ></v-textarea>
                        <v-text-field
                          color="teal-accent-3"
                          label="สถานที่"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                        :min="new Date().toISOString().substr(0, 10)"
                            type="date"
                          color="teal-accent-3"
                          label="วันที่"
                          placeholder="2022-12-08"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                        type="time"
                          color="teal-accent-3"
                          label="เวลาเริ่ม"
                          placeholder="08:30:00"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                        type="time"
                          color="teal-accent-3"
                          label="เวลาสิ้นสุด"
                          placeholder="12:30:00"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                          :min=1
                          type="number"
                          color="teal-accent-3"
                          label="จำนวนชั่วโมงที่จะได้รับ"
                          variant="underlined"
                        ></v-text-field>
                        <v-text-field
                          :min=1
                          type="number"
                          color="teal-accent-3"
                          label="จำนวนคนที่รับ"
                          variant="underlined"
                        ></v-text-field>
                        <v-file-input
                          color="teal-accent-3"
                          label="รูปภาพ"
                          variant="filled"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                      </v-container>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="teal-accent-3">
                          สร้าง
                          <v-icon icon="mdi-chevron-right"></v-icon>
                        </v-btn>
                      </v-card-actions>
  </v-card>
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
<style lang="scss" scoped>
.v-card {
  margin-top: 20px;
}
</style>