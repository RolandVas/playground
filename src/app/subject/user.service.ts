import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Ein BehaviorSubject speichert den aktuellsten Wert und gibt ihn sofort an neue Abonnenten weiter.
  // Es eignet sich gut, um einen globalen Zustand (z. B. aktuellen Benutzer, Theme, Sprache etc.) zu speichern,
  // den mehrere Komponenten abonnieren und automatisch aktualisiert bekommen sollen.
  // Änderungen werden mit .next() übermittelt, und der letzte Wert ist jederzeit verfügbar.
  private currentUser = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUser.pipe(shareReplay());

  // __________________________________________________________________

  // Subject sendet das Event nur in dem Moment, in dem .next() aufgerufen wird.
  // Wenn userProfileComponent erst nach dem Event geladen wird, sieht sie nichts mehr – das Event ist vergessen.
  private eventSubject = new Subject<string>();
  events$ = this.eventSubject.asObservable();

  send(event: string) {
    this.eventSubject.next(event);
  }

  // __________________________________________________________________

  // Ein Signal ist eine Angular-native, reaktive Datenstruktur, die automatisch Benachrichtigungen auslöst,
  // wenn sich ihr Wert ändert. Sie ist besonders nützlich für UI-Zustände oder einfache Daten,
  // die innerhalb von Komponenten oder Services verwendet werden.
  // Der aktuelle Wert wird mit .get() gelesen und mit .set() verändert.
  // Im Template genügt ein einfacher Funktionsaufruf wie user() für automatische Updates.
  private currentUserSignal = signal<string | null>(null);

  get user() {
    return this.currentUserSignal;
  }

  login(username: string) {
    this.currentUser.next(username);
    this.currentUserSignal.set(username);
    
  }
}
