<template>
    <div>ADMiN ACTIVITY</div>
</template>

<script>
import { watchEffect } from 'vue'; 
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter();
        watchEffect(() => {
            const token = localStorage.getItem('token')
            fetch('https://apricot-binturong-kit.cyclic.app/authen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicaion/json',
                    'Authorization': 'Bearer '+token
                },
            })
            .then(response => response.json())
            .then(data => {
                if(data.status == 'ok') {
                    alert('authen success')
                } else {
                    alert('authen failed')
                    localStorage.removeItem('token')
                    //this.$router.push('create');
                    router.push({ path: '/' })
                }
            })
        })
    },
    watch: {
        check() {
            // const token = localStorage.getItem('token')
            // fetch('https://apricot-binturong-kit.cyclic.app/authen', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'applicaion/json',
            //         'Authorization': 'Bearer '+token
            //     },
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if(data.status == 'ok') {
            //         alert('authen success')
            //     } else {
            //         alert('authen failed')
            //         localStorage.removeItem('token')
            //         this.$router.push('');
            //     }
            // })

            // var requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: raw,
            //     redirect: 'follow'
            // };

            // fetch( requestOptions)
            // .then(response => response.json())
            // .then(result => {
            //     if(result.status === 'ok') {
            //         localStorage.setItem('token', result.token)
            //         console.log(result)
            //         this.$router.push('adminactivity');
            //     } else if(result.message === 'login failed') {
            //         alert('Username หรือ Password ไม่ถูกต้อง')
            //     } else {
            //         alert(JSON.stringify(result))
            //     }
            // })
            // .catch(error => console.log('error', error));
        }
    }
}
</script>