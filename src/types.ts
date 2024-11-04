export interface Message {
  body: string;
}

export interface Device {
  _id: string;
  name: string;
  __v: number;
  messages: Message[];
}
