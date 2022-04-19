import { Subjects, Publisher, OrderCancelledEvent } from '@tickets-saferio/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
