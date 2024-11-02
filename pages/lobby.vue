<template>
    <!-- Where client players are before game starts-->
    <div>
        <h1>Waiting for host to start game...</h1>
        <p>ARE YOU EXCITED?!</p>
    </div>

</template>

<script setup lang="ts">
import { socket } from '~/components/socket';
const router = useRouter();
const videoIdState = useState('videoId', () => '');

// if client joins late, they will be redirected to play
socket.on('watch', (videoId) => {
    console.log('late player, adding to round now')
    // update state
    videoIdState.value = videoId;
    router.push('/gameblock')


})

</script>