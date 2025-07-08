"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CanI } from "@/lib/auth/CanI";
import { useRouter } from "next/navigation";

import { inviteMember } from "../actions/inviteMember";
import { removeMember } from "../actions/removeMember";
import { updateMemberRole } from "../actions/updateMemberRole";
import type { Invitation, Member, MemberRole } from "../types";

interface MembershipTableProps {
  organizationId: string;
  members: Member[];
  invitations: Invitation[];
  membership: { userId: string; role: MemberRole };
}

const roleOptions: MemberRole[] = ["admin", "user"];

export default function MembershipTable({
  organizationId,
  members,
  invitations,
  membership,
}: MembershipTableProps) {
  const [inviteEmail, setInviteEmail] = useState("");
  const router = useRouter();
  const [inviteRole, setInviteRole] = useState<MemberRole>("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleInvite() {
    setLoading(true);
    setError(null);
    try {
      await inviteMember({
        organizationId,
        email: inviteEmail,
        role: inviteRole,
      });
      setInviteEmail("");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(memberId: string) {
    setLoading(true);
    setError(null);
    try {
      await removeMember({
        organizationId,
        memberId,
      });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  async function handleRoleChange(userId: string, role: MemberRole) {
    setLoading(true);
    setError(null);
    try {
      await updateMemberRole({
        organizationId,
        memberId: userId,
        role,
      });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Members</h3>
          <CanI permission="organization" action="update">
            <div className="flex gap-2 items-end">
              <input
                className="border px-2 py-1 rounded"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                type="email"
                placeholder="user@example.com"
                disabled={loading}
              />
              <Select
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v as MemberRole)}
                disabled={loading}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleInvite} disabled={loading || !inviteEmail}>
                Invite
              </Button>
            </div>
          </CanI>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>
                  {m.userId === membership.userId ? (
                    <span className="ml-2">
                      <b>(You)</b>
                    </span>
                  ) : (
                    <CanI
                      role={membership.role}
                      permission="organization"
                      action="update"
                    >
                      <Select
                        value={m.role}
                        onValueChange={(v) =>
                          handleRoleChange(m.id, v as MemberRole)
                        }
                        disabled={loading || m.userId === membership.userId}
                      >
                        <SelectTrigger className="w-28 capitalize">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((role) => (
                            <SelectItem
                              className="capitalize"
                              key={role}
                              value={role}
                            >
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CanI>
                  )}
                </TableCell>
                <TableCell>
                  {typeof m.createdAt === "string"
                    ? m.createdAt.split("T")[0]
                    : new Date(m.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {m.userId === membership.userId ? (
                    ""
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <CanI
                          role={membership.role}
                          permission="member"
                          action="update"
                        >
                          <DropdownMenuItem
                            onClick={() => handleRemove(m.id)}
                            disabled={loading}
                            variant="destructive"
                          >
                            Remove
                          </DropdownMenuItem>
                        </CanI>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Pending Invitations</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expires</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitations.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>{inv.email}</TableCell>
                <TableCell>{inv.role}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell>
                  {typeof inv.expiresAt === "string"
                    ? inv.expiresAt.split("T")[0]
                    : new Date(inv.expiresAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
