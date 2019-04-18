import {Injectable} from '@angular/core';
import {Message} from './message';

@Injectable()
export class ToastService {
    messages: Array<Message> = [];

    constructor() {
    }

    getMessages() {
        return this.messages;
    }

    sendMessage(content: any, style: any) {
        const message = new Message(content, this.messages.length + 1, style);
        this.messages.push(message);
    }

    dismissMessage(messageKey: any) {
        this.purgeDismissedMessages();

        this.messages.forEach(message => {
            if (message.id === messageKey) {
                message.dismissed = true;
            }
        });
    }

    purgeDismissedMessages  () {
        this.messages.forEach(function (message: any, index: any, object: any) {
            if (message.dismissed) {
                object.splice(index, 1);
            }
        });
    }


}
