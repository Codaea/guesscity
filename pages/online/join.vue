<template>
<div>
    <div class="flex justify-center items-center h-screen">
      <div v-if="!roomExists" class="bg-gray-800 p-7 rounded-lg">
        <UInput v-model="roomcode" placeholder="Room Code" size="xl" />
        <UButton class="mt-4" label="Enter" block @click="checkRoom" />
        <p v-if="error" class="mt-5 text-red-500 text-center ">Error: {{ error }}</p>
      </div>
      <div v-if="roomExists">
        <UInput v-model="username" placeholder="Username" size="xl" />
        <UButton class="mt-4" label="Join" block @click="roomJoin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSocket } from '~/components/socket';
import { useGameState } from '~/compostables/useGameState';

const socket = getSocket();
const _gameState = useGameState(); // Initalize the game state

const roomcode = ref('');
const username = ref('');
const roomExists = ref(false);
const error = ref('');

function checkRoom() {
  socket.emit('room:ping', roomcode.value);

  socket.on('room:ping:success', () => {
    console.log('Room ping successful'); // DEBUG
    roomExists.value = true;
  });

  socket.on('room:ping:error', (err: string) => {
    console.log('Room ping error: ', err); // DEBUG
    error.value = err;
  });
}

function roomJoin() {
  
  console.log(`Joining room: ${roomcode.value}`) // DEBUG
  socket.emit('room:join', roomcode.value, username.value);
}


</script>
