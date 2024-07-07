import { CommonModule, NgIf } from '@angular/common';
import { inject, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { collection, collectionData, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { FooterComponent } from '../footer/footer.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SignOutComponent } from '../sign-out/sign-out.component';


interface Product {
  name: string;
  details: string;
  size: string;
  price: string;
  burgerPhoto: string;
  plus: string;
}

interface BasketItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-web-structure',
  templateUrl: './web-structure.component.html',
  standalone: true,
  imports: [NgIf, CommonModule, MatButtonModule, MatIconModule, MatDividerModule,MatCardModule, FooterComponent,MatDialogModule],
  styleUrls: ['./web-structure.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WebStructureComponent implements OnInit {
  isBasketOpen = false;
  basketItems: BasketItem[] = [];
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  currentUser: User | null = null;

  constructor(public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);

    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      if (aUser) {
        this.currentUser = aUser;
        this.loadBasketFromFirestore();
      }
    });
  }
  

  posts: Product[] = [
    {
      name: 'BBQ Chili Cheese Burger',
      details: 'mit Softbun, Homestyle Burger, 100 % Rind, Lollo Bionda Salat,Tomaten, Röstzwiebeln, BBQ Sauce und Chili-Cheese-Sauce',
      size: 'Wahl aus: 125g oder 2x125g.',
      price: '8,90 €',
      burgerPhoto: '../assets/img/aktion/aktion1.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
    {
      name: 'Pizza Chili-Cheese-Steak',
      details: 'mit Tomatensauce, Gouda, Rindersteakstreifen, Champignons, roter Paprika, roten Zwiebeln und Chili-Cheese-Sauce',
      size: 'Wahl aus: Standard, Ø 26cm, Maxi, Ø 32cm oder Wumbo, Ø 38cm.',
      price: '11,90 €',
      burgerPhoto: '../assets/img/aktion/aktion3.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
    {
      name: 'Pizza Hot Steak',
      details: 'mit Tomatensauce, Gouda, Rindersteakstreifen, Kirschtomaten, Jalapeños und Sauce béarnaise',
      size: 'Wahl aus: Standard, Ø 26cm, Maxi, Ø 32cm oder Wumbo, Ø 38cm.',
      price: '12,90 €',
      burgerPhoto: '../assets/img/aktion/aktion2.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
    {
      name: 'Pizza Surf & Turf',
      details: 'mit Tomatensauce, Gouda, in Knoblauchöl marinierten Vannamei-Garnelen, Rindersteakstreifen, Kirschtomaten, grünem Spargel und Grana Padano (italienischer Hartkäse)',
      size: 'Wahl aus: Standard, Ø 26cm, Maxi, Ø 32cm oder Wumbo, Ø 38cm.',
      price: '13,90 €',
      burgerPhoto: '../assets/img/aktion/aktion4.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
    {
      name: 'Ben & Jerrys Doppelpack',
      details: 'bestelle zwei Ben & Jerrys Pints Deiner Wahl',
      size: 'Wahl aus: Cookie Dough 465ml, Karamel Sutra 465ml, Chocolate Fudge Brownie 465ml, Strawberry Cheesecake 465ml, Half Baked 465ml und mehr.',
      price: '12,99 €',
      burgerPhoto: '../assets/img/aktion/aktion5.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
  ];

  klassik: Product[] = [
    {
      name: 'Pizza nach Plan',
      details: 'mit Zutaten nach Wahl',
      size: 'Wahl aus: Standard, Ø 26cm, Maxi, Ø 32cm oder Wumbo, Ø 38cm.',
      price: '8,90 €',
      burgerPhoto: '../assets/img/aktion/klassiker.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
    {
      name: 'Pizza Salami Deluxe',
      details: 'mit 50% mehr Salami',
      size: 'Wahl aus: Standard, Ø 26cm, Maxi, Ø 32cm oder Wumbo, Ø 38cm.',
      price: '10,40 €',
      burgerPhoto: '../assets/img/aktion/klassiker2.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
    {
      name: 'Pizza Chicken und Curry',
      details: 'mit Currysauce, Hähnchenbrustfilet und Ananas',
      size: 'Wahl aus: Standard, Ø 26cm, Maxi, Ø 32cm oder Wumbo, Ø 38cm.',
      price: '11,40 €',
      burgerPhoto: '../assets/img/aktion/klassiker3.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
    {
      name: 'Pizza Margherita Deluxe',
      details: 'mit Tomatenscheiben, Mozzarella und Basilikum-Pesto',
      size: 'Wahl aus: Standard, Ø 26cm, Maxi, Ø 32cm oder Wumbo, Ø 38cm.',
      price: '10,40 €',
      burgerPhoto: '../assets/img/aktion/klassiker4.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
    {
      name: 'Pizza Mista',
      details: 'mit Salami, Hinterschinken, Champignons und grünen sowie milden Peperoni',
      size: 'Wahl aus: Cookie Dough 465ml, Karamel Sutra 465ml, Chocolate Fudge Brownie 465ml, Strawberry Cheesecake 465ml, Half Baked 465ml und mehr.',
      price: '11,40 €',
      burgerPhoto: '../assets/img/aktion/klassiker5.JPG',
      plus: '../assets/img/aktion/plus.png',
    },
  ];

  ngOnInit() {
    if (typeof document !== 'undefined') {
      this.loadBasket();
      this.calculate();
    }
    this.getBasket();
  }

  openDialog() {
    this.dialog.open(SignOutComponent);
  }

  async saveBasketToFirestore() {
    if (this.currentUser) {
      const basketRef = doc(this.firestore, `baskets/${this.currentUser.uid}`);
      await setDoc(basketRef, { items: this.basketItems });
    }
  }

  async loadBasketFromFirestore() {
    if (this.currentUser) {
      const basketRef = doc(this.firestore, `baskets/${this.currentUser.uid}`);
      const basketSnap = await getDoc(basketRef);
      if (basketSnap.exists()) {
        this.basketItems = basketSnap.data()['items'];
        this.calculate();
      }
    }
  }


  getBasket() {
    const basket = collection(this.firestore, 'basket')
    collectionData(basket);
    console.log(basket);
  }

  openBasket() {
    this.isBasketOpen = true;
    this.calculate();
    this.lifer();
  }

  closeBasket() {
    this.isBasketOpen = false;
  }

  async addToBasket(name: string, price: string, e: Event) {
    e.preventDefault();

    const priceNum = parseFloat(price.replace(' €', '').replace(',', '.'));
    const existingItemIndex = this.basketItems.findIndex(
      (item) => item.name === name
    );

    if (existingItemIndex !== -1) {
      this.basketItems[existingItemIndex].quantity += 1;
    } else {
      const item: BasketItem = { name, price: priceNum, quantity: 1 };
      this.basketItems.push(item);
    }


    await this.saveBasketToFirestore(); // Save to Firestore
    this.calculate();
    this.lifer();
  }


  showBasket() {
    this.isBasketOpen = true;
  }

  async removeItemFromBasket(name: string, e: Event) {
    e.preventDefault();
    const existingItemIndex = this.basketItems.findIndex(
      (item) => item.name === name
    );

    if (existingItemIndex !== -1) {
      if (this.basketItems[existingItemIndex].quantity > 1) {
        this.basketItems[existingItemIndex].quantity -= 1;
      } else {
        this.basketItems.splice(existingItemIndex, 1);
      }
    }

    this.showBasket();
    await this.saveBasketToFirestore(); // Save to Firestore
    this.calculate();
  }

  addItemToBasket(name: string, price: number, e: Event) {
    e.preventDefault();
    const existingItemIndex = this.basketItems.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
        this.basketItems[existingItemIndex].quantity += 1;
    } else {
        const item = { name, price, quantity: 1 };
        this.basketItems.push(item);
    }

    this.calculate();
    this.lifer();
    this.showBasket();
}

  

async removeBin(name: string, e: Event) {
  e.preventDefault();
  this.basketItems = this.basketItems.filter((item) => item.name !== name);
  this.showBasket();
  await this.saveBasketToFirestore(); // Save to Firestore
  this.calculate();
}

  calculate() {
    const subtotal = document.getElementById('subtotal');
    if (!subtotal) return;
    const total = this.basketItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    subtotal.innerHTML = `Subtotal: ${total.toFixed(2)} €`;
  }

  lifer() {
    const liferKosten = document.getElementById('liferKosten');
    if (!liferKosten) return;
    liferKosten.innerHTML = 'Lieferkosten: 5.99 €';
  }

  loadBasket() {
    const basket = localStorage.getItem('basket');
    this.basketItems = basket ? JSON.parse(basket) : [];
    this.calculate();
  }

  checkout() {

  }
}
