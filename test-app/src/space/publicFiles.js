export const publicFile = (filename) => `${process.env.PUBLIC_URL || ''}/${encodeURIComponent(filename)}`;

export const resumeFile = publicFile('IBRAHIM ALHUSAINI CV.pdf');
