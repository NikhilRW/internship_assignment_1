import z from 'zod';

export type ReminderType = 'none' | '5m' | '10m' | '30m' | '1h';

const meetingSchema = z
  .object({
    title: z.string().min(1, 'Meeting title is required').trim(),
    meetingType: z.enum(['online', 'offline']),
    date: z.date({ error: 'Date is required' }),
    time: z.date({ error: 'Time is required' }),
    link: z.string().trim(),
    notes: z.string().trim(),
    reminder: z.enum(['none', '5m', '10m', '30m', '1h']),
    participants: z.array(z.any()),
  })
  .superRefine((data, ctx) => {
    // Validate meeting time
    const meetingDateTime = new Date(data.date);
    meetingDateTime.setHours(data.time.getHours());
    meetingDateTime.setMinutes(data.time.getMinutes());

    if (meetingDateTime <= new Date()) {
      ctx.addIssue({
        code: 'custom',
        message: 'Meeting time must be in the future',
        path: ['time'], // This will show error under the time field
      });
    }

    // Validate reminder time
    if (data.reminder !== 'none') {
      const reminderOffsets = {
        '5m': 5 * 60 * 1000,
        '10m': 10 * 60 * 1000,
        '30m': 30 * 60 * 1000,
        '1h': 60 * 60 * 1000,
      };

      const reminderTime = new Date(
        meetingDateTime.getTime() -
          reminderOffsets[data.reminder as keyof typeof reminderOffsets],
      );

      if (reminderTime <= new Date()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Reminder time must be in the future',
          path: ['reminder'],
        });
      }
    }
  })
  .refine(
    data => {
      if (data.meetingType === 'online') {
        return data.link.length > 0;
      }
      return true;
    },
    {
      message: 'Link is required for online meetings',
      path: ['link'],
    },
  )
  .refine(
    data => {
      if (data.reminder !== 'none') {
        return data.participants.length > 0;
      }
      return true;
    },
    {
      message: 'At least one participant is required when reminder is set',
      path: ['participants'],
    },
  );

export type MeetingFormData = z.infer<typeof meetingSchema>;
export { meetingSchema };
