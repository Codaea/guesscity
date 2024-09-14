<template>
    <UModal v-model="isGuessOpen">
        <UCard>
            <template #header>
                <h1 class="text-3xl">Guess the city!</h1>
            </template>
            <div class="w-[29rem] h-[20rem]">
                <Map @update:guess="guess" :answer="answer" />
            </div>
            <template #footer>
                <UButton @click="isGuessOpen = false">Close</UButton>
                <UButton v-if="!submitted" @click="submit">Select</UButton>
                <UButton v-if="submitted" @click="emit('completeRound', score)">Next Round</UButton>
            </template>
        </UCard>
    </UModal>
    <UButton @click="isGuessOpen = !isGuessOpen" class="fixed bottom-14 left-1/2 transform -translate-x-1/2  z-10"
        size="xl">Guess</UButton>
    <BackgroundVideoPlayer
        class="fixed top-0 left-0 -z-10 w-screen h-screen pointer-events-none select-none" :options="videoOptions" />

</template>

<script setup>

const guess = ref(null);
const isGuessOpen = ref(false);
const answer = ref(null); // gets changed to the correct answer on submit
const score = ref(0)
const submitted = ref(false);


const props = defineProps({
    videoSrc: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['completeRound', ])

const videoOptions = {
    autoplay: true,
    muted: true,
    controls: false,
    loop: true,
    sources: [{
        src: props.videoSrc,
        type: 'video/youtube'
    }],
    techOrder: ['youtube']
}

function submit() {
    answer.value = [47.21322, -1.559482]; // Nantes
    // TODO: make score calculation w algo
    score.value = 100;
    // change button to move on to next round
    submitted.value = true;
}



</script>