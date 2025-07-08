export type MemberRole = "owner" | "admin" | "user";

export interface Member {
  id: string;
  userId: string;
  organizationId: string;
  name: string;
  email: string;
  role: MemberRole;
  createdAt: string;
}

export type InvitationStatus = "pending" | "accepted" | "expired" | "canceled";

export interface Invitation {
  id: string;
  organizationId: string;
  email: string;
  role: MemberRole;
  status: InvitationStatus;
  expiresAt: string;
  inviterId: string;
}
