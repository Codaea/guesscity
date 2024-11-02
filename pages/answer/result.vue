<template>
    <div>
        <h1>Correct Answer Displayed</h1>
    </div>
</template>

<script setup lang="ts">
import { socket } from '~/components/socket';

const videoId = useState('videoId');
const router = useRouter();

socket.on('watch', (v) => {

    // add new videoId to state
    videoId.value = v;
    router.push('/gameblock')
})

</script>

