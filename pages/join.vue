<template>
    <div>
      <p>Connected: {{ connected }}</p>
        <h1>Enter Room Code</h1>
        <input v-model="roomcode" type="text">
        <h1>Enter Username</h1>
        <input v-model="username" type="text">

        <UButton size="xl" @click="roomJoin">Join Game</UButton>

        
    </div>
</template>

<script setup lang="ts">
import {socket, connected} from '~/components/socket';

const roomcode = ref('enter roomcode here');
const username = ref('enter username here');

const router = useRouter();

function roomJoin() {
  console.log(`Joining room: ${roomcode.value}`) // DEBUG
  socket.emit('room:join', roomcode.value, username.value);
  router.push('/lobby');
}

socket.connect()

</script>
