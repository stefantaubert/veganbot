import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messages: Observable<Message[]>;
  formValue: string;
  maxHeight: number = 350;

  constructor(public chat: ChatService) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
    this.formValue = "Wer bist du?";
    this.sendMessage();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
    console.log(document.getElementById('scrollMe').offsetHeight)
    //if (document.getElementById('scrollMe').offsetHeight >= this.maxHeight)
      this.myScrollContainer.nativeElement.style.height =  this.maxHeight.toString() + "px";
    
 
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }
  // Your array of meals
  private questions: Array<string> = [
    "Was ist mit Eiern aus Freilandhaltung?", 
    "Warum tragen Veganer keine Wolle?",
    "Was ist an Honig so schlimm?",
    "Wieso sollte ich vegan werden?",
    "Wie deckst du deinen Proteinbedarf?",
    "Menschen haben schon immer Fleisch gegessen!",
    "Aber für Milch müssen keine Kühe sterben?",
    "Veganes Essen ist zu teuer!",
    "Vegane Ernährung ist zu kompliziert!",
    "Hast du keine Mangelerscheinungen?",
  ];

  random(): void {
    let randomIndex = Math.floor((Math.random() * this.questions.length) );
    let q = this.questions[randomIndex];

    this.chat.converse(q);
  }

  sendMessage() {
    if (this.formValue && this.formValue.length > 0){
      console.log(this.formValue); 
      this.chat.converse(this.formValue);
      this.formValue = '';
    }
    else{
      alert("Bitte gib zuerst eine Frage ein.");
    }
  }
}