import { Publisher, Subjects, TicketCreatedEvent } from "@tickets-saferio/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}