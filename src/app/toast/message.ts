export class Message {
    id: number;
    content: string;
    style: string;
    dismissed = false;

    constructor(content: any, id: any, style?: any) {
        this.content = content;
        this.style = style || 'info';
        this.id = id;
    }
}
