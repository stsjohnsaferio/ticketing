import { Publisher, OrderCreatedEvent, Subjects } from '@tickets-saferio/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
