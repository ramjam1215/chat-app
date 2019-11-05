import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, filter, scan, publishReplay, refCount } from 'rxjs/operators';
/*
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';
*/
import { Message } from './message.model';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {

  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();

  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates.pipe(
      // watch the updates and accumulate operations on the messages
      scan((messages: Message[],
        operation: IMessagesOperation) => {
        return operation(messages);
      },
        initialMessages),
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      publishReplay(1),
      refCount()
    );

    this.create.pipe(
      map(function (message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      }))
      .subscribe(this.updates);

    this.newMessages.subscribe(this.create);

    this.markThreadAsRead.pipe(
      map((thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map((message: Message) => {
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      }))
      .subscribe(this.updates);
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => {
        return (message.thread.id === thread.id) &&
          (message.author.id !== user.id);
      })
    );
  }
}


export const messagesServiceInjectables: Array<any> = [
  MessagesService
];

