import { db } from './firestore';
import NotificationService from './NotificationService';

export type Meeting = MeetingPayload & { id: string };

export type MeetingPayload = {
  title: string;
  date: Date;
  time: Date;
  type: 'online' | 'offline';
  link?: string;
  notes?: string;
  reminder: 'none' | '5m' | '10m' | '30m' | '1h';
  participants: string[];
  ownerUid?: string;
};

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
    const nowIso = new Date().toISOString();
    const docRef = await db()
      .collection('meetings')
      .add({
        title: payload.title,
        date: payload.date.toISOString(),
        time: payload.time.toISOString(),
        type: payload.type,
        link: payload.link || null,
        notes: payload.notes || null,
        reminder: payload.reminder,
        participants: payload.participants,
        ownerUid: payload.ownerUid || null,
        createdAt: nowIso,
        updatedAt: nowIso,
      });

    const when = computeReminderDate(
      payload.date,
      payload.time,
      payload.reminder,
    );
    await this.notification.scheduleNotification(
      payload.title,
      'Meeting reminder',
      when,
    );

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
    const snapshot = await db().collection('meetings').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date, // Ensure date is returned as a string or Date object
      time: doc.data().time, // Ensure time is returned as a string or Date object
    })) as Meeting[];
  }

  static async updateMeeting(
    meetingId: string,
    payload: Partial<MeetingPayload>,
  ) {
    const updates: any = { updatedAt: new Date().toISOString() };
    if (payload.title !== undefined) updates.title = payload.title;
    if (payload.date) updates.date = payload.date.toISOString();
    if (payload.time) updates.time = payload.time.toISOString();
    if (payload.type) updates.type = payload.type;
    if (payload.link !== undefined) updates.link = payload.link || null;
    if (payload.notes !== undefined) updates.notes = payload.notes || null;
    if (payload.reminder) updates.reminder = payload.reminder;
    if (payload.participants) updates.participants = payload.participants;

    await db().collection('meetings').doc(meetingId).update(updates);

    const baseDate = payload.date || new Date();
    const baseTime = payload.time || new Date();
    const offset = payload.reminder || 'none';
    const when = computeReminderDate(baseDate, baseTime, offset);
    await this.notification.scheduleNotification(
      payload.title || 'Meeting updated',
      'Meeting reminder',
      when,
    );
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
