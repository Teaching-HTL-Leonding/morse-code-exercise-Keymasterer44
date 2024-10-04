import {Injectable} from '@angular/core';

type MorseCodeConversion = {
  text: string;
  morseCode: string;
};

type ConversionError = {
  problemSegment: string;
  wordIndex: number;
  charIndex: number;
  message: string;
}

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

  convertTextToMorseCode(text: string): string | ConversionError[] {
    const textSegments = text.split(' ').filter(segment => segment.length > 0);
    return textSegments.map((segment, segI) => segment.split('').map((char, i) => {
      const morseCode = this.textToMorseCodeMap.get(char);
      if (morseCode === undefined) {
        const conversionError: ConversionError = {
          problemSegment: char,
          wordIndex: segI,
          charIndex: i,
          message: 'Character is not in the valid conversion range. (A-Z and spaces)'
        };
        return [conversionError];
      }
      return morseCode;
    }).reduce((p, c) => {
      if (typeof p === "string") {
        if (typeof c === "string") {
          return `${p} ${c}`;
        } else {
          return c;
        }
      } else {
        if (typeof c === "string") {
          return [...p];
        } else {
          return [...p, ...c];
        }
      }
    })).reduce((p, c) => {
      if (typeof p === "string") {
        if (typeof c === "string") {
          return `${p} / ${c}`;
        } else {
          return c;
        }
      } else {
        if (typeof c === "string") {
          return [...p];
        } else {
          return [...p, ...c];
        }
      }
    });
  }

  convertMorseCodeToText(morseCode: string): string | ConversionError[] {
    const morseCodeSegments = morseCode.split(' / ').filter(segment => segment.length > 0);
    return morseCodeSegments.map((segment, segI) => segment.split(' ').map((code, i) => {
      const text = this.morseCodeToTextMap.get(code);
      if (text === undefined) {
        if (!code.match(/^[.-]+$/)) {
          const conversionError: ConversionError = {
            problemSegment: code,
            wordIndex: segI,
            charIndex: i,
            message: 'Valid morse code only contains "." and "-" characters.'
          };
          return [conversionError];
        } else {
          const conversionError: ConversionError = {
            problemSegment: code,
            wordIndex: segI,
            charIndex: i,
            message: 'Morse code cannot be matched to any character! Note that this converter only supports spaces and A-Z.'
          };
          return [conversionError];
        }
      }
      return text;
    }).reduce((p, c) => {
      if (typeof p === "string") {
        if (typeof c === "string") {
          return `${p}${c}`;
        } else {
          return c;
        }
      } else {
        if (typeof c === "string") {
          return [...p];
        } else {
          return [...p, ...c];
        }
      }
    })).reduce((p, c) => {
      if (typeof p === "string") {
        if (typeof c === "string") {
          return `${p} ${c}`;
        } else {
          return c;
        }
      } else {
        if (typeof c === "string") {
          return [...p];
        } else {
          return [...p, ...c];
        }
      }
    });
  }
}
