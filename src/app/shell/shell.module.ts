import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { AuthorizationToggleModule } from 'ish-core/authorization-toggle.module';
import { DirectivesModule } from 'ish-core/directives.module';
import { FeatureToggleModule } from 'ish-core/feature-toggle.module';
import { IconModule } from 'ish-core/icon.module';
import { PipesModule } from 'ish-core/pipes.module';
import { RoleToggleModule } from 'ish-core/role-toggle.module';
import { ModuleLoaderService } from 'ish-core/utils/module-loader/module-loader.service';

import { CompareExportsModule } from '../extensions/compare/exports/compare-exports.module';
import { QuickorderExportsModule } from '../extensions/quickorder/exports/quickorder-exports.module';
import { SentryExportsModule } from '../extensions/sentry/exports/sentry-exports.module';
import { SeoExportsModule } from '../extensions/seo/exports/seo-exports.module';
import { StoreLocatorExportsModule } from '../extensions/store-locator/exports/store-locator-exports.module';
import { TrackingExportsModule } from '../extensions/tracking/exports/tracking-exports.module';
import { WishlistsExportsModule } from '../extensions/wishlists/exports/wishlists-exports.module';

import { CookiesBannerComponent } from './application/cookies-banner/cookies-banner.component';
import { FooterComponent } from './footer/footer/footer.component';
import { BackToTopComponent } from './header/back-to-top/back-to-top.component';
import { HeaderCheckoutComponent } from './header/header-checkout/header-checkout.component';
import { HeaderDefaultComponent } from './header/header-default/header-default.component';
import { HeaderErrorComponent } from './header/header-error/header-error.component';
import { HeaderNavigationComponent } from './header/header-navigation/header-navigation.component';
import { HeaderSimpleComponent } from './header/header-simple/header-simple.component';
import { HeaderComponent } from './header/header/header.component';
import { LanguageSwitchComponent } from './header/language-switch/language-switch.component';
import { LoginStatusComponent } from './header/login-status/login-status.component';
import { MiniBasketComponent } from './header/mini-basket/mini-basket.component';
import { SpeechRecognitionComponent } from './header/speech/recognition/speech-recognition.component';
import { SubCategoryNavigationComponent } from './header/sub-category-navigation/sub-category-navigation.component';
import { UserInformationMobileComponent } from './header/user-information-mobile/user-information-mobile.component';
import { LazyContentIncludeComponent } from './shared/lazy-content-include/lazy-content-include.component';
import { LazyMiniBasketContentComponent } from './shared/lazy-mini-basket-content/lazy-mini-basket-content.component';
import { LazySearchBoxComponent } from './shared/lazy-search-box/lazy-search-box.component';

const exportedComponents = [CookiesBannerComponent, FooterComponent, HeaderComponent];

@NgModule({
  imports: [
    AuthorizationToggleModule,
    CommonModule,
    CompareExportsModule,
    DirectivesModule,
    FeatureToggleModule,
    IconModule,
    MatButtonModule,
    NgbCollapseModule,
    NgbDropdownModule,
    MatCardModule,
    PipesModule,
    QuickorderExportsModule,
    RoleToggleModule,
    RouterModule,
    SentryExportsModule,
    SeoExportsModule,
    StoreLocatorExportsModule,
    TrackingExportsModule,
    TranslateModule,
    WishlistsExportsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
  ],
  declarations: [
    ...exportedComponents,
    BackToTopComponent,
    CookiesBannerComponent,
    HeaderCheckoutComponent,
    HeaderDefaultComponent,
    HeaderErrorComponent,
    HeaderNavigationComponent,
    HeaderSimpleComponent,
    LanguageSwitchComponent,
    LazyContentIncludeComponent,
    LazyMiniBasketContentComponent,
    LazySearchBoxComponent,
    LoginStatusComponent,
    MiniBasketComponent,
    SpeechRecognitionComponent,
    SubCategoryNavigationComponent,
    UserInformationMobileComponent,
  ],
  exports: [...exportedComponents],
})
export class ShellModule {
  constructor(moduleLoader: ModuleLoaderService, injector: Injector) {
    moduleLoader.init(injector);
  }
}
