export const generateS3Key = ({
  organizationId,
  ticketId,
  attachmentId,
  fileName,
}: {
  fileName: string;
  ticketId: string;
  organizationId: string;
  attachmentId: string;
}) => {
  return `${organizationId}/${ticketId}/${attachmentId}-${fileName}`;
};
