import AllItemsIcon from '@/app/assets/images/svgs/category_all_items.svg'
import ElectronicIcon from '@/app/assets/images/svgs/category_electronic.svg'
import FashionIcon from '@/app/assets/images/svgs/category_fashion.svg'
import FurnitureIcon from '@/app/assets/images/svgs/category_funiture.svg'
import SportsIcon from '@/app/assets/images/svgs/category_sport.svg'
import ApplianceIcon from '@/app/assets/images/svgs/category_appliance.svg'
import ToolsIcon from '@/app/assets/images/svgs/category_tools.svg'
import AccessoriesIcon from '@/app/assets/images/svgs/category_tech.svg'
import HealthIcon from '@/app/assets/images/svgs/category_health.svg'
import NewSnapIcon from '@/app/assets/images/svgs/featured_new_snap.svg'
import BestDealIcon from '@/app/assets/images/svgs/featured_best_deals.svg'
import OnDiscountIcon from '@/app/assets/images/svgs/featured_on_discount.svg'

export type CategoryProps = {
  tab: string;
  options:{
    label: string;
    path: string;
    Icon: string,
  }[],
}[]


export const CATEGORIES: CategoryProps = [
  {
  tab: 'CATEGORY',
  options: [
    {
      label: 'All items',
      path: 'categories',
      Icon: AllItemsIcon
    },
      {
      label: 'Electronics',
      path: 'electronics',
      Icon: ElectronicIcon
    },
      {
      label: 'Fashion',
      path: 'fashion',
      Icon: FashionIcon
    },
      {
      label: 'Furniture',
      path: 'furniture',
      Icon: FurnitureIcon
    },
      {
      label: 'Sports',
      path: 'sports',
      Icon: SportsIcon
    },
      {
      label: 'Home Appliances',
      path: 'home-appliances',
      Icon: ApplianceIcon
    },
      {
      label: 'Tools & DIY',
      path: 'tools',
      Icon: ToolsIcon
    },
      {
      label: 'Tech Accessories',
      path: 'tech-accessories',
      Icon: AccessoriesIcon
    },
      {
      label: 'Health and Beauty',
      path: 'health-and-beauty',
      Icon: HealthIcon
    },
  ]
},
{
  tab: 'FEATURED',
  options: [
    {
      label: 'New Snap',
      path: 'new-snap',
      Icon: NewSnapIcon
    },
    {
      label: 'Best Deals',
      path: 'best-deals',
      Icon: BestDealIcon
    },
    {
      label: 'On Discount',
      path: 'on-discount',
      Icon: OnDiscountIcon
    }
  ]
}
]