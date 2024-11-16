
//we need props that we return from our messageToReturnDto
export interface Message {
    id: number;
    senderId: number;
    senderKnownAs: string;
    senderPhotoUrl: string;
    recipientId: number;
    recipientKnownAs: string;
    recipientPhotoUrl: string; 
    content?: string;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
}
