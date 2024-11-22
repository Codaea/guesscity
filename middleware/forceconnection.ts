// checks if the user is connected to a room, if not, redirects to the play page. prevents user from directly connecting to wrong route.
export default defineNuxtRouteMiddleware(async (to) => {
  const app = useNuxtApp();
  const store = useGameStore(app.$pinia); // required to use pinia in middleware

  if (!store.room) {
    // case if user attempts to refresh while in game, or visit route while not part of a match.
    console.log('no room');
    return navigateTo('/play');
  } 
});