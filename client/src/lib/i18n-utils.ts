export interface LocalizedContent {
  en: string;
  fr: string;
  ar: string;
}

export const getLocalizedContent = (
  content: LocalizedContent | string | null | undefined,
  language: string
): string => {
  if (!content) return '';
  if (typeof content === 'string') return content;
  
  const lang = language.split('-')[0];
  
  if (content[lang as keyof LocalizedContent]) {
      return content[lang as keyof LocalizedContent];
  }

  if (content['fr']) return content['fr'];
  if (content['en']) return content['en'];

  // Return first available value
  return Object.values(content)[0] || '';
};
