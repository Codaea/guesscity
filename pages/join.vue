<template>
    <div>
      <p>Connected: {{ connected }}</p>
        <h1>Enter Room Code</h1>
        <input v-model="roomcode" type="text">

        <UButton size="xl" @click="joinRoom">Join Game</UButton>

        
    </div>
</template>

<script setup lang="ts">
import {socket, connected} from '~/components/socket';

const roomcode = ref('enter roomcode here')

const router = useRouter()

function joinRoom() {
  console.log(`Joining room: ${roomcode.value}`) // DEBUG
  socket.emit('joinRoom', roomcode.value)
  router.push('/lobby')
}

socket.connect()

</script>
