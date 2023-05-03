
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
                <v-row>
                  <v-col cols="12"> 
                    <v-table id="toPDF">
                      <thead>
                        <tr>
                          <th class="text-left">
                            Name
                          </th>
                          <th class="text-left">
                            Calories
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
                  </v-col>
              </v-row>
        </v-container>
        <v-btn class="ms-2" color="teal-accent-3" variant="outlined" size="small" @click="downloadPDFs">
          Print Table
        </v-btn>
   
    </div>
  </template>
  


  
  <script>
  import jsPDF from 'jspdf'
  import "jspdf-autotable";
  export default {
    components: {
    },
    methods: {
      downloadPDFs() {
        let columns = [
          { title: "Title", dataKey: "name" },
          { title: "Body", dataKey: "calories" }
        ];
        var pdf = new jsPDF();

        pdf.text(`${this.namett}`, 10, 15);
        pdf.setLineWidth(0.1).line(10, 20, 200, 20); // horizontal line
        //pdf.autoTable({ html: '#toPDF', margin: { left: 10, top: 25 } });
        pdf.autoTable({
            columns,
            body: this.desserts,
            margin: { left: 10, top: 25 },
            theme: 'grid',
        });
        pdf.save('info.pdf');
      },
      genPDF() {
          // let columns = [
          //   { title: "Title", dataKey: "title" },
          //   { title: "Body", dataKey: "body" }
          // ];

          // let doc = new jsPDF({
          //   orientation: "portrait",
          //   unit: "in",
          //   format: "letter"
          // });

          // doc.setFontSize(16).text(this.heading, 0.5, 1.0);
          // doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
          // doc.autoTable({
          //   columns,
          //   body: this.items,
          //   margin: { left: 0.5, top: 1.25 }
          // });
          // // doc.save(`${this.namett}.pdf`);
          // doc.save('info.pdf');
      },
      downloadPDF() {
        var pdf = new jsPDF();

        pdf.text('Hello World', 10, 10);
        pdf.save('info.pdf');
      },
      print() {
          // Pass the element id here
          this.$htmlToPaper('printSection');
          // this.$htmlToPaper('printMe', null, () => {
          //     console.log('done callback');
          // });
      },
    },
    mounted() {
    },
    data () {
      return {
        namett: "yyuyu",
        heading: "THis is HEADING.",
        items: [
          { title: "Item 1", body: "Body Item 1" },
          { title: "Item 2", body: "Body Item 2" },
          { title: "Item 3", body: "Body Item 3" },
          { title: "Item 4", body: "Body Item 4" },
          { title: "Item 5", body: "Body Item 5" },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
    
  }
</script>

<style lang="scss" scoped>
.v-card {
    margin-top: 20px;
}
</style>
  