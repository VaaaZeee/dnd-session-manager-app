import { inject, Injectable } from '@angular/core';
import { WINDOW } from '@core/injection-tokens/window.token';
import { fromEvent, map, Observable, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MediaQueryService {
  private readonly window = inject(WINDOW);
  private readonly BREAKPOINTS = {
    desktop: '992px',
    tablet: '768px',
    mobile: '480px',
  };

  private activeMediaQueries: { [key: string]: Observable<boolean> } = {};

  public isMobile$ = this.mediaQuery('max', 'mobile');
  public isTablet$ = this.mediaQuery('max', 'tablet');
  public isDesktop$ = this.mediaQuery('max', 'desktop');

  private mediaQuery(type: 'min' | 'max', breakPoint: keyof typeof this.BREAKPOINTS): Observable<boolean> {
    const mediaId = `${type}-${breakPoint}`;

    if (mediaId in this.activeMediaQueries) {
      return this.activeMediaQueries[mediaId];
    }

    const mediaQueryText = `(${type}-width: ${this.BREAKPOINTS[breakPoint]})`;
    const mediaQuery = this.window.matchMedia(mediaQueryText);

    const dynamicMediaQuery = fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      startWith(mediaQuery),
      map((query: MediaQueryList) => query.matches)
    );

    this.activeMediaQueries[mediaId] = dynamicMediaQuery;
    return dynamicMediaQuery;
  }
}
