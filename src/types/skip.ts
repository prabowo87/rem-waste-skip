export interface Skip {
  id: string;
  size: number;
  price_before_vat: number;
  hire_period_days: number;
  imageUrl: string;
}
export const defaultSkip: Skip = {
  id: '',
  size: 0,
  price_before_vat: 0,
  hire_period_days: 0,
  imageUrl: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg',
};