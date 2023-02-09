<template>
    <v-card >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="text-h5" v-if="act.name.length<28">{{ act.name }}</v-card-title>
                <v-card-title class="text-h5" v-else>{{ act.name.substring(0,28)+".." }}</v-card-title>
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