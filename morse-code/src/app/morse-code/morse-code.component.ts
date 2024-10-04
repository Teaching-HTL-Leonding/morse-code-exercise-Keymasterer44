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
    this.convertTextToMorseCode();
  }

  text = signal<string>("HELLO WORLD");
  morseCode = signal<string>("");
  encodeErrors = signal<string[]>([]);
  decodeErrors = signal<string[]>([]);

  convertTextToMorseCode(): void {
    const conversionResult = this.mcService.convertTextToMorseCode(this.text());
    if (typeof conversionResult === "string") {
      this.morseCode.set(conversionResult);
      this.encodeErrors.set([]);
    } else {
      this.encodeErrors.set(
        conversionResult.map((e, i) => `${i+1}. "${e.problemSegment}" (word ${e.wordIndex+1}, char ${e.charIndex+1}) is not convertible to morse code.\nReason: ${e.message}`)
      );
    }
  }

  convertMorseCodeToText(): void {
    const conversionResult = this.mcService.convertMorseCodeToText(this.morseCode());
    if (typeof conversionResult === "string") {
      this.text.set(conversionResult);
      this.decodeErrors.set([]);
    } else {
      this.decodeErrors.set(
        conversionResult.map((e, i) => `${i+1}. "${e.problemSegment}" (word ${e.wordIndex+1}, char ${e.charIndex+1}) is not valid morse code.\nReason: ${e.message}`)
      )
    }
  }
}
