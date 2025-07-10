export const generateS3Key = ({
  organizationId,
  entityId,
  attachmentId,
  fileName,
}: {
  fileName: string;
  entityId: string;
  organizationId: string;
  attachmentId: string;
}) => {
  return `${organizationId}/${entityId}/${attachmentId}-${fileName}`;
};
