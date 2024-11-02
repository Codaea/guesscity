<template>

    <div>
        <h1>Are you actually right though?...</h1>
    </div>
</template>

<script setup lang="ts">
import { socket } from '~/components/socket';

const router = useRouter();
const score = useState('score');
socket.on('scores', (s) => {
    router.push('/answer/result')
    score.value = s;
})

</script>