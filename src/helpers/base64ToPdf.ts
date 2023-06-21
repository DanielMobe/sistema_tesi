export const generateFile = ({
  content,
  fileName,
}: {
  content: BlobPart;
  fileName: string;
}) => {
  const blob = new Blob([content], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
