import Pusher from 'pusher-js';

const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/pusher/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
});

export const subscribeToCallUpdates = (callId: string, callback: (data: any) => void) => {
  const channel = pusher.subscribe(`private-aircall-${callId}`);
  channel.bind('update-call', callback);
  return () => pusher.unsubscribe(`private-aircall-${callId}`);
};

export default pusher;