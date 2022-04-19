import { Publisher, Subjects, TicketUpdatedEvent } from "@tickets-saferio/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}