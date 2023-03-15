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
                      <v-file-input @change="setFile" accept="image/*" color="teal-accent-3" label="รูปภาพ" variant="filled" prepend-icon="mdi-camera"></v-file-input>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="teal-accent-3" @click="upload">
                          สร้าง
                          <v-icon icon="mdi-chevron-right" end></v-icon>
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

<script>
import firebase from 'firebase/app';
import 'firebase/storage';
// "firebase": "^7.16.1",

export default {
  data() {
    return {
      file: null,
      storageRef: null,
      imageurl: null,
    };
  },
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDhHIPsVfjKLwfYDkqhBldj4hWwyum6bW4",
      authDomain: "firegram-blue.firebaseapp.com",
      projectId: "firegram-blue",
      storageBucket: "firegram-blue.appspot.com",
      messagingSenderId: "105035319032",
      appId: "1:105035319032:web:05e49b004c5d161f111d0d"
    });
    this.storageRef = firebase.storage().ref();
  },
  methods: {
    setFile(event) {
      this.file = event.target.files[0];
    },
    upload() {
      const fileRef = this.storageRef.child(`images/${this.file.name}`);
      fileRef.put(this.file)
        .then((snapshot) => {
          this.imageurl = snapshot.ref.getDownloadURL();
          // console.log(imageurl); // Promise { <pending> }
          this.imageurl.then(function(result) {
            console.log(result) // "Some User token"
          })
          console.log('File uploaded successfully!');
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
margin-top: 20px;
}
</style>