import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MorseCodeService} from '../morse-code.service';

@Component({
  selector: 'app-morse-code',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './morse-code.component.html',
  styleUrl: './morse-code.component.css'
})
export class MorseCodeComponent {
  mcService: MorseCodeService;
  constructor(private service: MorseCodeService) {
    this.mcService = service;
    this.morseCode.set(this.mcService.convertTextToMorseCode(this.text()));
  }

  text = signal<string>("Hello World!");
  morseCode = signal<string>("");
  encodeError = signal<string>("");
  decodeError = signal<string>("");

  convertTextToMorseCode(): void {
    this.morseCode.set(this.mcService.convertTextToMorseCode(this.text()));
  }

  convertMorseCodeToText(): void {
    this.text.set(this.mcService.convertMorseCodeToText(this.morseCode()));
  }
}
