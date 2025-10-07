import Notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export default class NotificationService {
    async scheduleNotification(title: string, description: string, date: Date) {
        await Notifee.requestPermission();
        await Notifee.createChannel({
            id: 'meeting-notifications',
            name: 'Meeting Notifications',
        });
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
        };
        await Notifee.createTriggerNotification(
            {
                title,
                body: description,
                android: {
                    channelId: 'meeting-notifications',
                },
            },
            trigger,
        );
    }
}
