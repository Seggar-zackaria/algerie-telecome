import fs from 'fs';
import path from 'path';

/**
 * Deletes a file from the valid uploads directory.
 * @param filePath - The relative or absolute path of the file to delete.
 */
export const deleteFile = (filePath: string | undefined | null) => {
  if (!filePath) return;

  try {
    const __dirname = path.resolve();
   
    
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    const fullPath = path.join(__dirname, cleanPath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.info(`[File Utils] Deleted file: ${fullPath}`);
    } else {
      console.warn(`[File Utils] File not found for deletion: ${fullPath}`);
    }
  } catch (error) {
    console.error(`[File Utils] Error deleting file: ${filePath}`, error);
  }
};
