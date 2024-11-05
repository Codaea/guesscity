<template>
<div>
    <div class="flex justify-center items-center h-screen">
      <div>
        <p class="text-3xl text-center m-5">Join Game</p>
        <div class="w-64 h-128 bg-gray-900 p-5 rounded-md space-y-2">
          <UInput v-model="roomcode" placeholder="Room Code" size="xl" />
          <UInput v-model="username" placeholder="Username" size="xl" />
          <UButton class="mt-4" label="Enter" block @click="roomJoin" />
          <p v-if="error" class="text-red-600 text-center">Error: {{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {socket} from '~/components/socket';

const roomcode = ref('');
const username = ref('');


function roomJoin() {
  console.log(`Joining room: ${roomcode.value}`) // DEBUG
  socket.emit('room:join', roomcode.value, username.value);
}


</script>
