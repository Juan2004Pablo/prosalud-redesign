
export const formatFileSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
export const ALLOWED_FILE_TYPES_GENERAL = ['application/pdf', 'image/jpeg', 'image/png'];
export const ALLOWED_FILE_TYPES_PDF = ['application/pdf'];
export const ALLOWED_FILE_TYPES_PDF_WORD = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
export const ALLOWED_FILE_TYPES_PDF_WORD_IMAGES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
