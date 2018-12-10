import { BasketRebateMapper } from '../basket-rebate/basket-rebate.mapper';
import { OrderItemData } from '../order-item/order-item.interface';
import { PriceMapper } from '../price/price.mapper';

import { BasketItemData } from './basket-item.interface';
import { BasketItem } from './basket-item.model';

export class BasketItemMapper {
  static fromData(data: BasketItemData): BasketItem {
    if (data) {
      return {
        id: data.id,
        position: data.position,
        quantity: data.quantity,
        price: PriceMapper.fromPriceItem(data.price),
        singleBasePrice: PriceMapper.fromPriceItem(data.singleBasePrice),
        itemSurcharges: data.surcharges
          ? data.surcharges.map(surcharge => ({
              amount: PriceMapper.fromPriceItem(surcharge.amount),
              description: surcharge.description,
              displayName: surcharge.name,
            }))
          : undefined,
        valueRebates: data.discounts
          ? data.discounts.map(discount => BasketRebateMapper.fromData(discount))
          : undefined,
        isHiddenGift: data.hiddenGift,
        isFreeGift: data.freeGift,
        totals:
          data.calculationState === 'CALCULATED'
            ? {
                salesTaxTotal: data.totals.salesTaxTotal,
                shippingTaxTotal: data.totals.shippingTaxTotal,
                shippingTotal: PriceMapper.fromPriceItem(data.totals.shippingTotal),
                total: PriceMapper.fromPriceItem(data.totals.total),
                valueRebatesTotal: PriceMapper.fromPriceItem(data.totals.valueRebatesTotal),
              }
            : undefined,

        productSKU: data.product,
      };
    } else {
      throw new Error(`'BasketItemData' is required for the mapping`);
    }
  }

  static fromOrderItemData(data: OrderItemData): BasketItem {
    if (data) {
      return {
        id: data.id,
        name: data.name,
        position: data.position,
        quantity: data.quantity,
        price: data.price,
        singleBasePrice: data.singleBasePrice,
        itemSurcharges: data.itemSurcharges,
        valueRebates: data.valueRebates,
        isHiddenGift: data.isHiddenGift,
        isFreeGift: data.isFreeGift,
        inStock: data.inStock,
        availability: data.availability,
        totals: data.totals,

        productSKU: data.product ? data.product.title : undefined,
      };
    } else {
      throw new Error(`'BasketItemData' is required for the mapping`);
    }
  }
}
