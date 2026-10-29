import { siteConfig } from '@/config/site';

/**
 * Standaardbericht dat vooraf in het WhatsApp-gesprek staat. De bezoeker kan het
 * aanpassen voordat hij verstuurt.
 */
export const WHATSAPP_MESSAGE = `Hallo ${siteConfig.name}, ik wil graag meer informatie over jullie diensten.`;

/**
 * Bouwt de officiële wa.me-link.
 * `number` moet het internationale nummer zijn zonder plusteken, spaties of
 * andere leestekens — dat is het formaat dat wa.me verwacht.
 */
export function whatsappUrl(number: string, message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
