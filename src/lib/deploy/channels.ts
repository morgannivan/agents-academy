import { DeployChannel } from "./types";

export interface ConfigField {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  placeholder?: string;
  options?: string[];
  defaultValue?: string | number;
}

export interface ChannelDefinition {
  id: DeployChannel;
  name: string;
  icon: string;
  description: string;
  configFields: ConfigField[];
  comingSoon: boolean;
}

export const channels: ChannelDefinition[] = [
  {
    id: DeployChannel.API,
    name: "REST API",
    icon: "Globe",
    description:
      "Deploy as a REST API endpoint. Integrate your agent into any application with standard HTTP requests.",
    configFields: [
      {
        name: "rateLimit",
        label: "Rate Limit (req/min)",
        type: "number",
        placeholder: "60",
        defaultValue: 60,
      },
      {
        name: "authType",
        label: "Authentication",
        type: "select",
        options: ["api_key", "oauth2", "none"],
        defaultValue: "api_key",
      },
      {
        name: "corsOrigins",
        label: "CORS Origins",
        type: "text",
        placeholder: "https://example.com",
      },
    ],
    comingSoon: false,
  },
  {
    id: DeployChannel.WEB_WIDGET,
    name: "Web Widget",
    icon: "MessageSquare",
    description:
      "Embed a chat widget on your website. Copy a snippet and drop it into any page.",
    configFields: [
      {
        name: "primaryColor",
        label: "Primary Color",
        type: "text",
        placeholder: "#10b981",
        defaultValue: "#10b981",
      },
      {
        name: "position",
        label: "Position",
        type: "select",
        options: ["bottom-right", "bottom-left"],
        defaultValue: "bottom-right",
      },
      {
        name: "welcomeMessage",
        label: "Welcome Message",
        type: "text",
        placeholder: "Hi! How can I help you today?",
        defaultValue: "Hi! How can I help you today?",
      },
    ],
    comingSoon: false,
  },
  {
    id: DeployChannel.SLACK,
    name: "Slack",
    icon: "Hash",
    description:
      "Add your agent as a Slack bot. Respond to messages in channels and DMs.",
    configFields: [
      { name: "workspaceId", label: "Workspace ID", type: "text" },
      { name: "botToken", label: "Bot Token", type: "text" },
    ],
    comingSoon: true,
  },
  {
    id: DeployChannel.TELEGRAM,
    name: "Telegram",
    icon: "Send",
    description:
      "Launch a Telegram bot powered by your agent. Reach users on mobile instantly.",
    configFields: [
      { name: "botToken", label: "Bot Token", type: "text" },
    ],
    comingSoon: true,
  },
  {
    id: DeployChannel.DISCORD,
    name: "Discord",
    icon: "Gamepad2",
    description:
      "Deploy as a Discord bot. Engage community members in servers and threads.",
    configFields: [
      { name: "botToken", label: "Bot Token", type: "text" },
      { name: "guildId", label: "Server ID", type: "text" },
    ],
    comingSoon: true,
  },
  {
    id: DeployChannel.SMS,
    name: "SMS",
    icon: "Smartphone",
    description:
      "Let your agent communicate via text messages through Twilio or Vonage.",
    configFields: [
      { name: "phoneNumber", label: "Phone Number", type: "text" },
      {
        name: "provider",
        label: "Provider",
        type: "select",
        options: ["twilio", "vonage"],
      },
    ],
    comingSoon: true,
  },
  {
    id: DeployChannel.WHATSAPP,
    name: "WhatsApp",
    icon: "MessageCircle",
    description:
      "Connect your agent to WhatsApp Business API for customer conversations.",
    configFields: [
      { name: "phoneNumberId", label: "Phone Number ID", type: "text" },
      { name: "accessToken", label: "Access Token", type: "text" },
    ],
    comingSoon: true,
  },
  {
    id: DeployChannel.MCP_SERVER,
    name: "MCP Server",
    icon: "Server",
    description:
      "Expose your agent as a Model Context Protocol server for AI-to-AI integrations.",
    configFields: [
      {
        name: "transport",
        label: "Transport",
        type: "select",
        options: ["stdio", "sse"],
        defaultValue: "stdio",
      },
      {
        name: "port",
        label: "Port",
        type: "number",
        placeholder: "3100",
        defaultValue: 3100,
      },
    ],
    comingSoon: true,
  },
];
