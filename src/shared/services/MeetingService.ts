import { getFirestore } from '@react-native-firebase/firestore';
import { Meeting, MeetingPayload } from 'shared/types/Meeting';
import NotificationService from './NotificationService';

const db = getFirestore;

function computeReminderDate(
  date: Date,
  time: Date,
  offset: MeetingPayload['reminder'],
): Date {
  const combined = new Date(date);
  combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
  const msMap: Record<Exclude<MeetingPayload['reminder'], 'none'>, number> = {
    '5m': 5 * 60 * 1000,
    '10m': 10 * 60 * 1000,
    '30m': 30 * 60 * 1000,
    '1h': 60 * 60 * 1000,
  };
  if (offset === 'none') return combined;
  return new Date(combined.getTime() - msMap[offset]);
}

export default class MeetingService {
  private static notification = new NotificationService();

  static async createMeeting(payload: MeetingPayload) {
    const now = new Date();
    const meetingDate = new Date(payload.dateTime);

    // Validate meeting time is in future
    if (meetingDate <= now) {
      throw new Error('Meeting time must be in the future');
    }

    // If reminder is set, validate reminder time is in future
    if (payload.reminder !== 'none') {
      const reminderOffsets = {
        '5m': 5 * 60 * 1000,
        '10m': 10 * 60 * 1000,
        '30m': 30 * 60 * 1000,
        '1h': 60 * 60 * 1000,
      };

      const reminderTime = new Date(
        meetingDate.getTime() -
          reminderOffsets[payload.reminder as keyof typeof reminderOffsets],
      );

      if (reminderTime <= now) {
        throw new Error('Reminder time must be in the future');
      }
    }

    const nowIso = now.toISOString();
    const docRef = await db()
      .collection('meetings')
      .add({
        title: payload.title,
        dateTime: payload.dateTime,
        type: payload.type,
        link: payload.link || null,
        notes: payload.notes || null,
        reminder: payload.reminder,
        participants: payload.participants,
        ownerUid: payload.ownerUid || null,
        createdAt: nowIso,
        updatedAt: nowIso,
      });

    if (payload.reminder !== 'none') {
      const when = computeReminderDate(
        new Date(payload.dateTime),
        new Date(payload.dateTime),
        payload.reminder,
      );
      await this.notification.scheduleNotification(
        payload.title,
        'Meeting reminder',
        when,
      );
    }

    if (payload.participants && payload.participants.length > 0) {
      await this.enqueueParticipantNotifications(
        docRef.id,
        'created',
        payload.title,
        payload.participants,
      );
    }

    return docRef.id;
  }

  static async getMeetings() {
    const snapshot = await db()
      .collection('meetings')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      dateTime: new Date(doc.data().dateTime).toISOString(),
    })) as Meeting[];
  }

  static async getMeetingById(id: string) {
    const doc = await db().collection('meetings').doc(id).get();
    if (!doc.exists) {
      throw new Error('Meeting not found');
    }
    return {
      ...doc.data(),
      id: doc.id,
      dateTime: new Date(doc.data()?.dateTime).toISOString(),
    } as Meeting;
  }

  static async updateMeeting(
    meetingId: string,
    payload: Partial<MeetingPayload>,
  ) {
    const now = new Date();
    const updates: any = { updatedAt: now.toISOString() };

    // If dateTime is being updated, validate it's in the future
    if (payload.dateTime) {
      const meetingDate = new Date(payload.dateTime);
      if (meetingDate <= now) {
        throw new Error('Meeting time must be in the future');
      }
      updates.dateTime = payload.dateTime;
    }

    // If reminder is being updated, validate reminder time is in the future
    if (payload.reminder) {
      const reminderOffsets = {
        '5m': 5 * 60 * 1000,
        '10m': 10 * 60 * 1000,
        '30m': 30 * 60 * 1000,
        '1h': 60 * 60 * 1000,
      };

      if (payload.reminder !== 'none') {
        const meetingDate = new Date(
          payload.dateTime || (await this.getMeetingById(meetingId)).dateTime,
        );
        const reminderTime = new Date(
          meetingDate.getTime() -
            reminderOffsets[payload.reminder as keyof typeof reminderOffsets],
        );

        if (reminderTime <= now) {
          throw new Error('Reminder time must be in the future');
        }
      }
      updates.reminder = payload.reminder;
    }

    if (payload.title !== undefined) updates.title = payload.title;
    if (payload.type) updates.type = payload.type;
    if (payload.link !== undefined) updates.link = payload.link || null;
    if (payload.notes !== undefined) updates.notes = payload.notes || null;
    if (payload.participants) updates.participants = payload.participants;

    await db().collection('meetings').doc(meetingId).update(updates);

    // Schedule notification if there's a reminder
    if (updates.reminder !== 'none') {
      const baseDate = payload.dateTime
        ? new Date(payload.dateTime)
        : new Date((await this.getMeetingById(meetingId)).dateTime);
      const when = computeReminderDate(baseDate, baseDate, updates.reminder);
      await this.notification.scheduleNotification(
        payload.title || 'Meeting updated',
        'Meeting reminder',
        when,
      );
    }
  }

  static async deleteMeeting(meetingId: string) {
    await db().collection('meetings').doc(meetingId).delete();
  }

  private static async enqueueParticipantNotifications(
    meetingId: string,
    event: 'created' | 'updated',
    title: string,
    participantUserIds: string[],
  ) {
    const batch = db().batch();
    const outboxCol = db().collection('notificationOutbox');
    participantUserIds.forEach(uid => {
      const docRef = outboxCol.doc();
      batch.set(docRef, {
        kind: 'meeting',
        event,
        meetingId,
        title,
        toUserId: uid,
        createdAt: new Date().toISOString(),
      });
    });
    await batch.commit();
  }
}
