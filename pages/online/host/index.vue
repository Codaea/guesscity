<template>
  <div>
    <div class="flex flex-row bg-gray-600 m-12 p-12 space-x-12">
      <div>
        <p class="text-5xl text-center">Join at guesscity.codaea.com/join</p>
      </div>
      <div class="flex-1">
        <p class="text-2xl">Room Code:</p>
        <p class="text-5xl text-center">{{ store.room }}</p>
      </div>
    </div>
    <div class="w-full flex justify-end pr-12">
      <UButton size="xl" @click="socket.emit('startGame', store.room)"
        >Start Game</UButton
      >
    </div>

    <div>
      <h1>Lobby Members in a list here</h1>
      <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <li
          v-for="player in players"
          :key="player.socketId"
          class="rounded p-2 text-center hover:line-through hover:cursor-pointer"
          @click="socket.emit('player:kick', player.socketId)"
        >
          {{ player.username }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '#build/imports';

const store = useGameStore();
const socket = store.socket;

interface Player {
  socketId: string;
  username: string;
}

const players = ref<Player[]>([]);

socket.emit('room:new');

socket.on('room:new:success', (rmCode: string) => {
  console.log(rmCode);
  console.log('roomCode');
  store.room = rmCode;
});

socket.on('player:joined', (socketId, username) => {
  console.log('player joined');
  players.value.push({ socketId, username });
});

socket.on('player:left', (socketId) => {
  console.log('player left');
  players.value = players.value.filter(
    (player) => player.socketId !== socketId
  );
});
</script>
