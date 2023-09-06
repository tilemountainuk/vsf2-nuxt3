import { computed, reactive } from 'vue';

interface UiNotification {
    message: string;
    type: 'negative' | 'positive' | 'secondary';
    icon: string;
    title: string;
}

interface Notifications {
    notifications: Array<UiNotification>;
}

const state = reactive<Notifications>({
    notifications: [],
});
const maxVisibleNotifications = 3;
const timeToLive = 9000;

const useUiNotification = () => {
    const send = (notification: UiNotification) => {
        const dismiss = () => {
            state.notifications.splice(0);
        };

        const upFrontNotification = {
            ...notification,
            dismiss,
        };

        state.notifications.push(upFrontNotification);
        if (state.notifications.length > maxVisibleNotifications) state.notifications.shift();
        setTimeout(dismiss, timeToLive);
    };

    return {
        send,
        notifications: computed(() => state.notifications),
    };
};

export default useUiNotification;
