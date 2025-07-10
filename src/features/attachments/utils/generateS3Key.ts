import type { AttachmentEntity } from "../types";

export const generateS3Key = ({
  organizationId,
  entityId,
  entity,
  attachmentId,
  fileName,
}: {
  fileName: string;
  entityId: string;
  entity: AttachmentEntity["entity"];
  organizationId: string;
  attachmentId: string;
}) => {
  return `${organizationId}/${entity}/${entityId}/${attachmentId}-${fileName}`;
};
