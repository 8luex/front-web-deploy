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
                      <v-file-input @change="onUpload" accept="image/*" color="teal-accent-3" label="รูปภาพ" variant="filled" prepend-icon="mdi-camera"></v-file-input>
                    </v-container>
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
import { ref, watchEffect } from 'vue'
import * as firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';

export default {
  name: 'activitycreate',
  components: {
  },
  data () {
      return {
        imageDate: null,
        picture: null,
      }
  },
  mounted() {
    firebase.initializeApp({
      apiKey: "AIzaSyDhHIPsVfjKLwfYDkqhBldj4hWwyum6bW4",
      authDomain: "firegram-blue.firebaseapp.com",
      projectId: "firegram-blue",
      storageBucket: "firegram-blue.appspot.com",
      messagingSenderId: "105035319032",
      appId: "1:105035319032:web:05e49b004c5d161f111d0d"
    })
  },
  setup() {
      return {
      }
  },
  methods: {
    onUpload(e) {
      this.picture = null;
      this.imageDate = e.target.files[0];
      const storageRef = firebase.storage().ref(`${this.imageDate.name}`).put(this.imageDate);
      storageRef.on(`state_changed`, snapshot => {
      }, error => {
        console.log(error.message)
      }, () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url;
          console.log(picture);
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
margin-top: 20px;
}
</style>