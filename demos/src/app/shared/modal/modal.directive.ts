import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';
import {DirectiveStylesService} from '../directivestyles.service';
const STYLES = `
jw-modal {
  display: none;
}
jw-modal .jw-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
    z-index: 1000;
 overflow: auto;
}
jw-modal .jw-modal .jw-modal-body {
  padding: 20px;
  background: #fff;
  margin: 40px;
}
jw-modal .jw-modal-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.75;
  z-index: 900;
}
body.jw-modal-open {
  overflow: hidden;
}
`;

@Component({
    selector: 'jw-modal',
    template: 
        `<div class="jw-modal">
            <div class="jw-modal-body">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="jw-modal-background"></div>`
})

export class ModalDirective implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(
         directiveStyles: DirectiveStylesService, 
        private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
        directiveStyles.addStyle(STYLES, 'ModalDirective');
    }

    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'jw-modal') {
                modal.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}