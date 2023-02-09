<template>
    <v-card >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <h3 v-if="act.name.length<20">{{ act.name }}</h3>
                <h3 v-else>{{ act.name.substring(0,20)+".." }}</h3>

                <v-card-subtitle></v-card-subtitle>
                    วันที่: {{ act.eventDate.substring(0,10) }}
                <v-card-actions>
                    <v-btn class="ms-2" variant="outlined" size="small">
                        View Ticket
                    </v-btn>
                </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="125" rounded="0">
                <v-img cover :src="act.image"></v-img>
            </v-avatar>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'CardEnroll',
    props: ['act']
}
</script>

<style lang="scss" scoped>
.v-card {
    margin-top: 20px;
}
</style>