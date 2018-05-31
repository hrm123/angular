import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatRow, MatHeaderRow, MatSort, MatPaginator, MatIcon, MatCell } from '@angular/material';
import { IM } from '../IM.model';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {ChatCardComponent} from '../chat-card/chat-card.component'

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewInit, OnDestroy {

  showTable = false;
  displayedColumns = ["email", "message", "sentTS"];
  dataSource = new MatTableDataSource<IM>();
  private imsChangedSubscription : Subscription;
  ims: IM[];
  lastFetch: Date = null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.imsChangedSubscription = this.chatService.imsChanged.subscribe((ims : IM[]) => {
      this.dataSource.data = ims;
      if(this.lastFetch){
        let filteredIms = ims.filter( i => i.sentTS > this.lastFetch)
        this.ims = [...this.ims, ...filteredIms ]
        this.lastFetch = new Date();
      } else {
        this.ims = ims;        
        this.lastFetch = new Date();
      }
      
    });
    this.chatService.fetchExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit(form: NgForm) {
    this.chatService.sendIM({ 
      message: form.value.newMessage,
      userId:  this.authService.getUser().userId,
      email:  this.authService.getUser().email,
      sentTS:  new Date()
    });
    form.reset();

  }

  ngOnDestroy() {
    this.imsChangedSubscription.unsubscribe();
  }


}
