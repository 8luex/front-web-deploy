<template>
    <v-card >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title v-if="act.name.length<16" class="text-h6">{{ act.name }}</v-card-title>
                <v-card-title v-else class="text-h6">{{ act.name.substring(0,16)+".." }}</v-card-title>
                <v-card-subtitle>วันที่: {{ act.eventDate.substring(0,10) }}</v-card-subtitle>
                <v-card-actions>
                    <v-btn class="ms-2" color="teal-accent-3" variant="outlined" size="small" @click="$emit('viewTicket')">
                        More Details
                    </v-btn>
                </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="105" rounded="0">
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