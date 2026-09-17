/** Klassenamen samenvoegen; falsy waarden worden overgeslagen. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
