import { Component, computed, effect, signal, untracked } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent {
  // input signal wird vor dem construction zeit gebunden
  quantity = signal(1);
  unitPrice = signal(29.99);
  expressShipping = signal(false);
  discountActive = computed(()=> {
    console.log(this.rawTotal() > 100 )
    return this.rawTotal() > 100 
  })

  // 🧠 COMPUTED: Abgeleitete Werte
  shippingCost = computed(() => this.expressShipping() ? 10 : 0);

  rawTotal = computed(() =>
    this.quantity() * this.unitPrice() + this.shippingCost()
  );

  discountAmount = computed(() => {
    console.log('asdf')
    return this.discountActive() ? this.rawTotal() * 0.1 : 0});

  totalPrice = computed(() =>
    this.rawTotal() - this.discountAmount()
  );

  // 🧨 EFFECT: Überwacht Bestellsumme und aktiviert Rabatt
  // schlechte practice: effect sollte keine signal updaten -> besser computed signal verwenden
  applyDiscountEffect = effect(() => {
    if (this.rawTotal() > 100 && !this.discountActive()) {
      // this.discountActive.set(true);
    }

    if (this.rawTotal() <= 100 && this.discountActive()) {
      // this.discountActive.set(false);
    }
  }, {allowSignalWrites: true});

  // Methoden
  increase() {
    this.quantity.set(this.quantity() + 1);
  }

  decrease() {
    if (this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }

  toggleShipping() {
    this.expressShipping.set(!this.expressShipping());
  }

}
