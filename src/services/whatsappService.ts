import { api } from "./api";

export interface SendWhatsAppMessagePayload {
  to: string;
  body?: string;
  mediaUrl?: string;
  contentSid?: string;
  contentVariables?: Record<string, string>;
}

export const whatsappService = {
  /**
   * Send WhatsApp notification via POST /whatsapp/send
   */
  async sendMessage(payload: SendWhatsAppMessagePayload): Promise<any> {
    return api.post("/whatsapp/send", payload);
  },
};
