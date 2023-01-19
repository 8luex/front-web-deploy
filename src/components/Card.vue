<template>
    <v-card class="mx-auto" :class="0 == 1 ? 'limit': ''" max-width="400">
        <v-img class="white--text align-end" height="200px" :src="act.image">
            <div class="more-detail" @click="$emit('moreDetail')">
                เพิ่มเติม
            </div>
        </v-img>
        <div class="card-content">
            <div>
                <v-card-text class="text--primary">
                    <h3 v-if="act.name.length<28">{{ act.name }}</h3>
                    <h3 v-else>{{ act.name.substring(0,28)+".." }}</h3>
                    <div style="color: #1DE9B6;">ชั่วโมงที่ได้รับ {{ act.hoursToReceive }} ชม.</div>
                    <div>จำนวนผู้ลงทะเบียน: x/{{ act.max }}</div>
                </v-card-text>
                <v-card-subtitle class="pt-0">
                    วันที่: {{ act.eventDate.substring(0,10) }}
                </v-card-subtitle>
            </div>
            <div class="circle"></div>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'Card',
    props: ['act']
}
</script>

<style lang="scss" scoped>
.circle {
    width: 15px !important;
    height: 15px !important;
    min-width: auto !important;
    border-radius: 50%;
    background: #1DE9B6 !important;
    align-self: center;
}

.more-detail {
    font-size: 12px;
    color: #1DE9B6;
    border-radius: 25px;
    background-color: white;
    padding: 10px 20px;
    font-weight: bold;
    display: inline;
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.card-content {
    display: flex;
    justify-content: space-between;
    padding: 15px;
}

.v-card__subtitle {
    padding: 0;
}

.v-card__text {
    padding: 0;
    padding-bottom: 5px;
    h1 {
        font-size: 24px;
    }
}

.v-card {
    margin-top: 20px;
}

.v-card.limit {
    .circle {
        color: #DD2C00 !important;
    }
    .v-image {
        &::before {
            width: 100%;
            height: 100%;
            content: 'ปิดรับลงทะเบียน';
            font-weight: bold;
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba($color: black, $alpha: 0.8);
        }
    }
}
</style>