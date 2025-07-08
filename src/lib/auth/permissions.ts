import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  project: ["create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  project: ["create", "update", "delete"],
  ...adminAc.statements,
});

export const owner = ac.newRole({
  project: ["create", "update", "delete"],
  ...ownerAc.statements,
});
export const user = ac.newRole({
  project: ["create"],
});
