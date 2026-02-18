export class LanguageValues {
  private static readonly overrideLanguage:string | null = null; // 'de' or 'en' to override auto-detection

  public static readonly language:string = LanguageValues.overrideLanguage ?? 
    (window.location.hostname.startsWith('de') ? 'de' : 'en');

  public static readonly routes: { [key: string]: { [lang: string]: string } } = {
    'home': { 'en': 'home', 'de': 'startseite' },
    'blog': { 'en': 'blog', 'de': 'blog' },
    'contact': { 'en': 'contact', 'de': 'kontakt' },
    'about': { 'en': 'about', 'de': 'ueber-mich' },
    'projects': { 'en': 'projects', 'de': 'projekte' },
    'donate': { 'en': 'donate', 'de': 'spenden' },
    'license': { 'en': 'license', 'de': 'lizenz' },
    'source': { 'en': 'source', 'de': 'quellcode' },
    'NotFound': { 'en': 'NotFound', 'de': 'NichtGefunden' }
  };

  public static readonly routeTitle: { [key: string]: { [lang: string]: string } } = {
    'home': { 'en': 'Home', 'de': 'Startseite' },
    'blog': { 'en': 'Blog', 'de': 'Blog' },
    'blog/typing': { 'en': 'Fast Typing' },
    'contact': { 'en': 'Contact', 'de': 'Kontakt' },
    'projects': { 'en': 'Projects', 'de': 'Projekte' },
    'about': { 'en': 'About', 'de': 'Über Mich' },
    'NotFound': { 'en': 'Not Found', 'de': 'Nicht Gefunden' }
  };

  public static getTranslatedRoute(pathname:string, targetLanguage:string, fromLanguage:string|undefined = undefined):string {
    if (!pathname.startsWith('/')) {
      pathname = '/' + pathname;
    }

    const currentLanguage:string = fromLanguage ?? LanguageValues.language;

    // To ensure that routes with slashes are matched correctly (e.g., 'about/me'), we sort by the number of slashes
    const routesWithMostSlashesFirst = Object.keys(LanguageValues.routes).sort((a, b) => {
      const countSlashes = (str:string) => (str.match(/\//g) || []).length;
      return countSlashes(LanguageValues.routes[b][currentLanguage]) - countSlashes(LanguageValues.routes[a][currentLanguage]);
    });

    for (const translatedRouteKey of routesWithMostSlashesFirst) {
      const routeTranslations:{ [lang: string]: string } = LanguageValues.routes[translatedRouteKey];
      const currentLangRoute:string = routeTranslations[currentLanguage];
      
      const regex = new RegExp(`^/${currentLangRoute}(\\/|$)`);

      if (regex.test(pathname)) {
        const targetLangRoute:string = routeTranslations[targetLanguage];
        return '/' + targetLangRoute + pathname.slice(currentLangRoute.length + 1);
      }    
    }

    return pathname;
  }
}