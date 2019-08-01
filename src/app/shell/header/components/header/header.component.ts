import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DeviceType } from 'ish-core/models/viewtype/viewtype.types';

type CollapsibleComponent = 'search' | 'navbar' | 'minibasket';

/**
 * The Header Component displays the page header.
 *
 * It uses the {@link LoginStatusContainerComponent} for rendering the users login status.
 * It uses the {@link ProductCompareStatusContainerComponent} for rendering the product compare button and count.
 * It uses the {@link MobileBasketContainerComponent} for rendering the mobile basket button and basket item count.
 * It uses the {@link LanguageSwitchContainerComponent} for rendering the language selection dropdown.
 * It uses the {@link SearchBoxContainerComponent} for rendering the search box.
 * It uses the {@link HeaderNavigationContainerComponent} for rendering the pages main navigation.
 * It uses the {@link MiniBasketContainerComponent} for rendering mini basket on desktop sized viewports.
 *
 * @example
 * <ish-header></ish-header>
 */
@Component({
  selector: 'ish-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnChanges {
  @Input() isSticky = false;
  @Input() deviceType: DeviceType;
  @Input() reset: void;

  activeComponent: CollapsibleComponent = 'search';

  get showSearch() {
    return (
      this.activeComponent === 'search' &&
      // always show for sticky header
      (this.deviceType === 'mobile' || this.isSticky)
    );
  }

  get showNavBar() {
    return (
      this.activeComponent === 'navbar' ||
      // always show for pc
      this.deviceType === 'pc' ||
      // always show for tablet on top
      (this.deviceType === 'tablet' && !this.isSticky)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.toggleSpecialStatusOfSearch();
    if (changes.reset) {
      this.activeComponent = 'search';
    }
  }

  private toggleSpecialStatusOfSearch() {
    // deactivate search when switching to sticky header
    if (this.isSticky && this.activeComponent === 'search') {
      this.activeComponent = undefined;
    }
    // activate search when scrolling to top and no other is active
    if (!this.isSticky && !this.activeComponent) {
      this.activeComponent = 'search';
    }
  }

  toggle(component: CollapsibleComponent) {
    if (this.activeComponent === component) {
      // activate search bar when on top and no other is active
      this.activeComponent = !this.isSticky ? 'search' : undefined;
    } else {
      this.activeComponent = component;
    }
  }
}
