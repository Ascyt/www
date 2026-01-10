export class LanguageValues {
  private static readonly overrideLanguage:string | null = 'en'; // 'de' or 'en' to override auto-detection

  public static readonly language:string = LanguageValues.overrideLanguage ?? 
    (window.location.hostname.startsWith('de') ? 'de' : 'en');

  public static readonly routes: { [key: string]: { [lang: string]: string } } = {
    'contact': { 'en': 'contact', 'de': 'kontakt' },
    'about': { 'en': 'about', 'de': 'ueber-mich' },
    'projects': { 'en': 'projects', 'de': 'projekte' },
    'home': { 'en': 'home', 'de': 'startseite' },
    'donate': { 'en': 'donate', 'de': 'spenden' },
    'license': { 'en': 'license', 'de': 'lizenz' },
    'source': { 'en': 'source', 'de': 'quellcode' }
  };

  public static getTranslatedRoute(pathname:string, targetLanguage:string):string {
    // To ensure that routes with slashes are matched correctly (e.g., 'about/me'), we sort by the number of slashes
    const routesWithMostSlashesFirst = Object.keys(LanguageValues.routes).sort((a, b) => {
      const countSlashes = (str:string) => (str.match(/\//g) || []).length;
      return countSlashes(LanguageValues.routes[b][LanguageValues.language]) - countSlashes(LanguageValues.routes[a][LanguageValues.language]);
    });

    for (const translatedRouteKey of routesWithMostSlashesFirst) {
      const routeTranslations:{ [lang: string]: string } = LanguageValues.routes[translatedRouteKey];
      const currentLangRoute:string = routeTranslations[LanguageValues.language];

      if (pathname.startsWith('/' + currentLangRoute)) {
        const targetLangRoute:string = routeTranslations[targetLanguage];
        return '/' + targetLangRoute + pathname.slice(currentLangRoute.length + 1);
      }    
    }

    return pathname;
  }
}