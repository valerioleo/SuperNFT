import {assert} from 'chai';

export const findEvents = (logs: any[], eventName: string) => {
  const events = logs.filter(e => e.event === eventName);
  assert.isNotEmpty(events);

  return events;
};

export const findEvent = (logs: any[], eventName: string) => {
  const [event] = findEvents(logs, eventName);

  return event;
};

export const findEventsInTransaction = async (tx, eventName: string) => {
  const {logs} = await tx;

  return findEvents(logs, eventName);
};

export const findEventInTransaction = async (tx, eventName: string) => {
  const [event] = await findEventsInTransaction(tx, eventName);

  return event;
};
