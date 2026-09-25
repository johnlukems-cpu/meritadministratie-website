/**
 * SOCIAL-MEDIA SERVICES — abstracties, bewust NOG NIET gekoppeld
 * -----------------------------------------------------------------------------
 * LinkedInService en MetaService (Facebook + Instagram) leggen alleen het contract
 * vast. Er zijn geen API-koppelingen, geen access tokens en geen netwerkverkeer:
 * elke publicatiefunctie geeft een gecontroleerde `not_configured`-respons met de
 * melding "Social media koppeling wordt binnenkort geactiveerd."
 *
 * ZO KOPPELT U ZE LATER (TODO — pas uitvoeren na uw expliciete opdracht):
 *
 *   LinkedIn  — LinkedIn Marketing/Community Management API.
 *               Benodigd: LINKEDIN_ACCESS_TOKEN, LINKEDIN_ORGANIZATION_ID
 *   Facebook  — Meta Graph API, publiceren op een pagina.
 *               Benodigd: META_PAGE_ID, META_PAGE_ACCESS_TOKEN
 *   Instagram — Meta Graph API, Instagram Business-account gekoppeld aan die pagina.
 *               Benodigd: INSTAGRAM_BUSINESS_ACCOUNT_ID (+ hetzelfde page-token)
 *
 * REGELS DIE ALTIJD BLIJVEN GELDEN:
 *   • Tokens uitsluitend in Vercel Environment Variables, nooit in de frontend,
 *     nooit in Git en nooit in logregels.
 *   • Publiceren gebeurt alleen server-side, vanuit deze module.
 *   • Implementeer per kanaal `publish()` en laat de rest van de applicatie ongemoeid.
 */
import type { SocialChannel, SocialPost } from '../../../src/lib/content/types.js';

/** Zelfde tekst als in de interface (src/data/content-studio.ts). */
export const SOCIAL_NOT_CONFIGURED = 'Social media koppeling wordt binnenkort geactiveerd.';

export type PublishResult =
  | { ok: true; externalId: string; message: string }
  | { ok: false; code: 'not_configured' | 'error'; message: string };

export interface SocialService {
  /** Naam van de dienst, bijv. 'LinkedInService' */
  name: string;
  /** Kanalen die deze dienst kan publiceren */
  channels: SocialChannel[];
  /** True zodra alle benodigde omgevingsvariabelen aanwezig zijn */
  isConfigured(): boolean;
  publish(channel: SocialChannel, post: SocialPost): Promise<PublishResult>;
}

const notConfigured: PublishResult = {
  ok: false,
  code: 'not_configured',
  message: SOCIAL_NOT_CONFIGURED,
};

/* --- LinkedIn ------------------------------------------------------------------- */

export const LinkedInService: SocialService = {
  name: 'LinkedInService',
  channels: ['linkedin'],
  isConfigured() {
    // TODO: return Boolean(process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_ORGANIZATION_ID);
    return false;
  },
  async publish() {
    // TODO: POST https://api.linkedin.com/rest/posts met het access token uit de omgeving.
    return notConfigured;
  },
};

/* --- Meta (Facebook + Instagram) ------------------------------------------------ */

export const MetaService: SocialService = {
  name: 'MetaService',
  channels: ['facebook', 'instagram'],
  isConfigured() {
    // TODO: return Boolean(process.env.META_PAGE_ACCESS_TOKEN && process.env.META_PAGE_ID);
    return false;
  },
  async publish() {
    // TODO: Facebook  → POST https://graph.facebook.com/v21.0/{page-id}/feed
    //       Instagram → POST /{ig-user-id}/media  +  /{ig-user-id}/media_publish
    return notConfigured;
  },
};

/* --- Publicatiefuncties zoals in de opdracht gevraagd --------------------------- */

export function publishToLinkedIn(post: SocialPost): Promise<PublishResult> {
  return LinkedInService.publish('linkedin', post);
}

export function publishToFacebook(post: SocialPost): Promise<PublishResult> {
  return MetaService.publish('facebook', post);
}

export function publishToInstagram(post: SocialPost): Promise<PublishResult> {
  return MetaService.publish('instagram', post);
}

/** Eén ingang: kiest automatisch de juiste dienst voor een kanaal. */
export function publishToChannel(channel: SocialChannel, post: SocialPost): Promise<PublishResult> {
  switch (channel) {
    case 'linkedin':
      return publishToLinkedIn(post);
    case 'facebook':
      return publishToFacebook(post);
    case 'instagram':
      return publishToInstagram(post);
  }
}

/** Overzicht van de koppelingsstatus voor de interface (nooit tokens!). */
export function socialStatus(): Record<SocialChannel, boolean> {
  return {
    linkedin: LinkedInService.isConfigured(),
    facebook: MetaService.isConfigured(),
    instagram: MetaService.isConfigured(),
  };
}
