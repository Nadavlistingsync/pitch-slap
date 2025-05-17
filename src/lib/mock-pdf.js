// Mock PDF file for testing
// This is a minimal valid PDF file
const mockPdfBuffer = Buffer.from(
  '%PDF-1.4\n' +
  '1 0 obj\n' +
  '<< /Type /Catalog /Pages 2 0 R >>\n' +
  'endobj\n' +
  '2 0 obj\n' +
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n' +
  'endobj\n' +
  '3 0 obj\n' +
  '<< /Type /Page /Parent 2 0 R /Resources << >> /MediaBox [0 0 612 792] >>\n' +
  'endobj\n' +
  'xref\n' +
  '0 4\n' +
  '0000000000 65535 f\n' +
  '0000000009 00000 n\n' +
  '0000000056 00000 n\n' +
  '0000000111 00000 n\n' +
  'trailer\n' +
  '<< /Size 4 /Root 1 0 R >>\n' +
  'startxref\n' +
  '0000000164\n' +
  '%%EOF'
);

module.exports = mockPdfBuffer; 