import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeviceType } from 'ish-core/models/viewtype/viewtype.types';

interface NavigationItems {
  [link: string]: {
    id: string;
    localizationKey: string;
    dataTestingId?: string;
    feature?: string;
    serverSetting?: string;
    permission?: string | string[];
    notRole?: string | string[];
    children?: NavigationItems;
  };
}

@Component({
  selector: 'ish-account-navigation',
  templateUrl: './account-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountNavigationComponent implements OnInit, OnChanges {
  @Input() deviceType: DeviceType;

  isMobileView = false;

  /**
   * Manages the Account Navigation items.
   */
  navigationItems: NavigationItems = {
    '/account': { id: '50', localizationKey: 'account.my_account.link' },
    '/account/requisitions/buyer': {
      id: '52',
      localizationKey: 'account.requisitions.requisitions',
      serverSetting: 'services.OrderApprovalServiceDefinition.runnable',
      permission: 'APP_B2B_PURCHASE',
      notRole: ['APP_B2B_CXML_USER', 'APP_B2B_OCI_USER'],
    },
    '/account/requisitions/approver': {
      id: '53',
      localizationKey: 'account.requisitions.approvals',
      serverSetting: 'services.OrderApprovalServiceDefinition.runnable',
      permission: ['APP_B2B_ORDER_APPROVAL', 'APP_B2B_MANAGE_COSTCENTER'],
    },
    '/account/quotes': {
      id: '55',
      localizationKey: 'account.navigation.quotes.link',
      feature: 'quoting',
      notRole: ['APP_B2B_CXML_USER', 'APP_B2B_OCI_USER'],
    },
    '/account/order-templates': {
      id: '57',
      localizationKey: 'account.ordertemplates.link',
      feature: 'orderTemplates',
      dataTestingId: 'order-templates-link',
    },
    '/account/orders': {
      id: '59',
      localizationKey: 'account.order_history.link',
      notRole: ['APP_B2B_CXML_USER', 'APP_B2B_OCI_USER'],
    },
    '/account/wishlists': {
      id: '60',
      localizationKey: 'account.wishlists.link',
      feature: 'wishlists',
      dataTestingId: 'wishlists-link',
      notRole: ['APP_B2B_CXML_USER', 'APP_B2B_OCI_USER'],
    },
    '/account/addresses': {
      id: '62',
      localizationKey: 'account.saved_addresses.link',
      dataTestingId: 'addresses-link',
      notRole: ['APP_B2B_CXML_USER', 'APP_B2B_OCI_USER'],
    },
    '/account/payment': {
      id: '64',
      localizationKey: 'account.payment.link',
      dataTestingId: 'payments-link',
      notRole: ['APP_B2B_CXML_USER', 'APP_B2B_OCI_USER'],
    },
    '/account/profile': { 
      id: '65', localizationKey: 'account.profile.link', notRole: ['APP_B2B_CXML_USER', 'APP_B2B_OCI_USER'] },
    '/account/organization/users': {
      id: '67',
      localizationKey: 'account.organization.user_management',
      //permission: 'APP_B2B_MANAGE_USERS',
    },
    '/account/organization/cost-centers': {
      id: '69',
      localizationKey: 'account.organization.cost_center_management',
      feature: 'costCenters',
      dataTestingId: 'cost-centers-link',
      //permission: 'APP_B2B_MANAGE_COSTCENTER',
    },
    '/account/punchout': {
      id: '71',
      localizationKey: 'account.punchout.link',
      dataTestingId: 'punchout-link',
      feature: 'punchout',
      //permission: 'APP_B2B_MANAGE_PUNCHOUT',
    },
    '/logout': {
      id: '72',
      localizationKey: 'account.navigation.logout.link',
      notRole: ['APP_B2B_CXML_USER', 'APP_B2B_OCI_USER'],
    },
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.isMobileView = this.deviceType === 'tablet' || this.deviceType === 'mobile';
  }

  ngOnChanges() {
    this.isMobileView = this.deviceType === 'tablet' || this.deviceType === 'mobile';
  }

  navigateTo(target: EventTarget) {
    if (target) {
      this.router.navigateByUrl((target as HTMLDataElement).value);
    }
  }

  get unsorted() {
    return () => 0;
  }

  isSelected(itemValueLink: string): string {
    return itemValueLink === location.pathname ? 'selected' : undefined;
  }
}
