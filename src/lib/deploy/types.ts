export enum DeployChannel {
  API = "API",
  WEB_WIDGET = "WEB_WIDGET",
  SLACK = "SLACK",
  TELEGRAM = "TELEGRAM",
  DISCORD = "DISCORD",
  SMS = "SMS",
  WHATSAPP = "WHATSAPP",
  MCP_SERVER = "MCP_SERVER",
}

export interface ApiChannelConfig {
  channel: DeployChannel.API;
  rateLimit: number;
  authType: "api_key" | "oauth2" | "none";
  corsOrigins: string[];
}

export interface WebWidgetChannelConfig {
  channel: DeployChannel.WEB_WIDGET;
  primaryColor: string;
  position: "bottom-right" | "bottom-left";
  welcomeMessage: string;
}

export interface SlackChannelConfig {
  channel: DeployChannel.SLACK;
  workspaceId: string;
  botToken: string;
}

export interface TelegramChannelConfig {
  channel: DeployChannel.TELEGRAM;
  botToken: string;
}

export interface DiscordChannelConfig {
  channel: DeployChannel.DISCORD;
  botToken: string;
  guildId: string;
}

export interface SmsChannelConfig {
  channel: DeployChannel.SMS;
  phoneNumber: string;
  provider: "twilio" | "vonage";
}

export interface WhatsAppChannelConfig {
  channel: DeployChannel.WHATSAPP;
  phoneNumberId: string;
  accessToken: string;
}

export interface McpServerChannelConfig {
  channel: DeployChannel.MCP_SERVER;
  transport: "stdio" | "sse";
  port: number;
}

export type ChannelConfig =
  | ApiChannelConfig
  | WebWidgetChannelConfig
  | SlackChannelConfig
  | TelegramChannelConfig
  | DiscordChannelConfig
  | SmsChannelConfig
  | WhatsAppChannelConfig
  | McpServerChannelConfig;

export interface DeployConfig {
  channel: DeployChannel;
  agentId: string;
  config: ChannelConfig;
}

export interface DeployStatus {
  id: string;
  channel: DeployChannel;
  status: "idle" | "deploying" | "live" | "failed";
  url: string;
  createdAt: Date;
}
