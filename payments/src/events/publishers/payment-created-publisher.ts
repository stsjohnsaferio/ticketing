import { Subjects, Publisher, PaymentCreatedEvent } from '@tickets-saferio/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
