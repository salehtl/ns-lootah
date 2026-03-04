import type { Lang, Dir } from './types';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  return lang === 'ar' ? 'ar' : 'en';
}

export function getDir(lang: Lang): Dir {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function getLocalizedPath(path: string, lang: Lang): string {
  return `/${lang}${path}`;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'en' ? 'ar' : 'en';
}

export function getAlternateUrl(currentPath: string, lang: Lang): string {
  const alternateLang = getAlternateLang(lang);
  const pathWithoutLang = currentPath.replace(/^\/(en|ar)/, '');
  return `/${alternateLang}${pathWithoutLang || '/'}`;
}
