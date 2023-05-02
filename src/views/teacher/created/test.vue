
<template>
    <div>
        <v-app-bar color="teal-accent-3" dense flat dark>
            <v-toolbar-title style="text-align: center;color: white;">กิจกรรมที่ลงทะเบียนไว้</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12"> 
                    <v-card >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="text-h6">sdgdfgsdfgsdfgsfdgdg</v-card-title>
                <v-card-subtitle>วันที่: fgsdfgdsgdsgdfgsg</v-card-subtitle>
                <v-card-actions>
                    <v-btn class="ms-2" color="teal-accent-3" variant="outlined" size="small">
                        View Ticket
                    </v-btn>
                </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="105" rounded="0">
                <v-img cover src="https://i.ytimg.com/vi/Gd28NXFndQc/oar2.jpg?sqp=-oaymwEaCJUDENAFSFXyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLDdlYMsbhsR2g4zr9t-YXNHtvAV2w"></v-img>
            </v-avatar>
        </div>
    </v-card>
    <v-card >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="text-h6">sdgdfgsdfgsdfgsfdgdg</v-card-title>
                <v-card-subtitle>วันที่: fgsdfgdsgdsgdfgsg</v-card-subtitle>
                <v-card-actions>
                    <v-btn class="ms-2" color="teal-accent-3" variant="outlined" size="small">
                        View Ticket
                    </v-btn>
                </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="105" rounded="0">
                <v-img cover src="https://i.ytimg.com/vi/Gd28NXFndQc/oar2.jpg?sqp=-oaymwEaCJUDENAFSFXyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLDdlYMsbhsR2g4zr9t-YXNHtvAV2w"></v-img>
            </v-avatar>
        </div>
    </v-card>
    <v-card >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="text-h6">sdgdfgsdfgsdfgsfdgdg</v-card-title>
                <v-card-subtitle>วันที่: fgsdfgdsgdsgdfgsg</v-card-subtitle>
                <v-card-actions>
                    <v-btn class="ms-2" color="teal-accent-3" variant="outlined" size="small">
                        View Ticket
                    </v-btn>
                </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="105" rounded="0">
                <v-img cover src="https://i.ytimg.com/vi/Gd28NXFndQc/oar2.jpg?sqp=-oaymwEaCJUDENAFSFXyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLDdlYMsbhsR2g4zr9t-YXNHtvAV2w"></v-img>
            </v-avatar>
        </div>
    </v-card>
    <v-card disabled>
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="text-h6">sdgdfgsdfgsdfgsfdgdg</v-card-title>
                <v-card-subtitle>วันที่: fgsdfgdsgdsgdfgsg</v-card-subtitle>
                <v-card-actions>
                    <v-btn class="ms-2" color="teal-accent-3" variant="outlined" size="small">
                        View Ticket
                    </v-btn>
                </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="105" rounded="0">
                <v-img cover src="https://i.ytimg.com/vi/Gd28NXFndQc/oar2.jpg?sqp=-oaymwEaCJUDENAFSFXyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLDdlYMsbhsR2g4zr9t-YXNHtvAV2w"></v-img>
            </v-avatar>
        </div>
    </v-card>
                    </v-col>
                    </v-row>
                    
    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          รหัสนักศึกษา
        </th>
        <th class="text-left">
          ชื่อ-นามสกุล
        </th>
        <th class="text-left">
          คณะ
        </th>
        <th class="text-left">
          สถานะเข้าร่วม
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
                    </v-container>
   
    </div>
  </template>
  
  <script>
export default{
    name: 'test',
}
</script>

<style lang="scss" scoped>
.v-card {
    margin-top: 20px;
}
</style>
  