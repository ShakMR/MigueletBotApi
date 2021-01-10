class ChatDTO {
  id: string;
  [x: string]: any;
}

export class TelegramMessageDTO {
  message_id: number;
  chat: ChatDTO;
  text: string;
  [x: string]: any;
}
