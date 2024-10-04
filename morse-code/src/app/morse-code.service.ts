import {Injectable} from '@angular/core';

type MorseCodeConversion = {
  text: string;
  morseCode: string;
};

@Injectable({
  providedIn: 'root'
})
export class MorseCodeService {

  conversions: MorseCodeConversion[] = [
    {text: 'A', morseCode: '.-'},
    {text: 'B', morseCode: '-...'},
    {text: 'C', morseCode: '-.-.'},
    {text: 'D', morseCode: '-..'},
    {text: 'E', morseCode: '.'},
    {text: 'F', morseCode: '..-.'},
    {text: 'G', morseCode: '--.'},
    {text: 'H', morseCode: '....'},
    {text: 'I', morseCode: '..'},
    {text: 'J', morseCode: '.---'},
    {text: 'K', morseCode: '-.-'},
    {text: 'L', morseCode: '.-..'},
    {text: 'M', morseCode: '--'},
    {text: 'N', morseCode: '-.'},
    {text: 'O', morseCode: '---'},
    {text: 'P', morseCode: '.--.'},
    {text: 'Q', morseCode: '--.-'},
    {text: 'R', morseCode: '.-.'},
    {text: 'S', morseCode: '...'},
    {text: 'T', morseCode: '-'},
    {text: 'U', morseCode: '..-'},
    {text: 'V', morseCode: '...-'},
    {text: 'W', morseCode: '.--'},
    {text: 'X', morseCode: '-..-'},
    {text: 'Y', morseCode: '-.--'},
    {text: 'Z', morseCode: '--..'},
  ];

  morseCodeToTextMap: Map<string, string> = new Map<string, string>();
  textToMorseCodeMap: Map<string, string> = new Map<string, string>();

  constructor() {
    this.conversions.forEach(conversion => {
      this.textToMorseCodeMap.set(conversion.text, conversion.morseCode);
      this.morseCodeToTextMap.set(conversion.morseCode, conversion.text);
    });
  }

  convertTextToMorseCode(text: string): string {
    const textSegments = text.split(' ').filter(segment => segment.length > 0);
    return textSegments.map(segment => segment.split('').map(char => this.textToMorseCodeMap.get(char.toUpperCase())).join(' ')).join(' / ');
  }

  convertMorseCodeToText(morseCode: string): string {
    const morseCodeSegments = morseCode.split(' / ').filter(segment => segment.length > 0);
    return morseCodeSegments.map(segment => segment.split(' ').map(code => this.morseCodeToTextMap.get(code)).join('')).join(' ');
  }
}
