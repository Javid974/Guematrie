import { Component, OnInit } from '@angular/core';
import { TarotService } from 'src/services//tarot.service';
import { environment } from 'src/environments/environment';
import { Tarot } from 'src/models/tarot.model';

@Component({
  selector: 'app-tarot',
  templateUrl: './admin-tarot.component.html',
  styleUrls: ['./admin-tarot.component.css']
})
export class AdminTarotComponent implements OnInit {
  cards: Tarot[] = [];

  constructor(private tarotService: TarotService) { }

  ngOnInit(): void {
    this.tarotService.getAll().subscribe({
      next: (data) => {
        this.cards = data.map((card: Tarot) => ({
          ...card,
          imagePath: `${environment.imageBaseUrl}${card.imagePath}`
        }));
      },
      error: (err) => console.error('Failed to load tarot cards:', err)
    });
  }
}
