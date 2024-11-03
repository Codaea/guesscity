import { socket } from "@/components/socket";

// handle the case where user tries route when not connected to socket
export default defineNuxtRouteMiddleware(async (to) => {
    if (to.path === '/join') return // skip to avoid infinite loop

    const timeout = 5000
    const startTime = Date.now()

    while (!socket.connected) {
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (Date.now() - startTime > timeout) {
            console.error('Socket connection timed out')
            return navigateTo('/join');
       }
    }
   
})