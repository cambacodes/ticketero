export interface Ticket {
  id: string;
  title: string;
  content: string;
  status: "OPEN" | "DONE" | "IN_PROGRESS";
  deadline: Date;
  bounty: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface TicketWithAuthor extends Ticket {
  author: {
    id: string;
    name: string;
  } | null;
}
type Status = Ticket["status"];

// This is just for fun. I want to play with generics
type CapitalizeFirstLetter<T extends string> =
  T extends `${infer FirstLetter}${infer Rest}`
    ? `${FirstLetter}${Lowercase<Rest>}`
    : never;
type ReplaceUnderscoreWithSpace<T extends string> =
  T extends `${infer FirstWord}_${infer Rest}`
    ? `${FirstWord} ${CapitalizeFirstLetter<Uppercase<Rest>>}`
    : T;

export type TicketStatusLabel = ReplaceUnderscoreWithSpace<
  CapitalizeFirstLetter<Status>
>;
