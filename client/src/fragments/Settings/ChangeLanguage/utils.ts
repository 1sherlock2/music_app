export const langs = ['en', 'ru'];

export const getLangName = (lang: string): string | undefined =>
  new Intl.DisplayNames(lang, {
    type: 'language'
  }).of(lang);
