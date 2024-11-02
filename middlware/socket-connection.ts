import { socket } from "@/components/socket";

// handle the case where user tries route when not connected to socket
export default defineNuxtRouteMiddleware((to, from, next) => {
    if (!socket.connected) {
        console.log('not conencted, redirecting')
        return navigateTo('/join')
    }
    next();
})