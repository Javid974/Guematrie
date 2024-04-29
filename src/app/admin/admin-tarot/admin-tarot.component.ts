import { Component, OnInit } from '@angular/core';
import { TarotService } from 'src/services//tarot.service';
import { ActivatedRoute, Router, RouterModule  } from '@angular/router';

@Component({
  selector: 'app-tarot',
  templateUrl: './admin-tarot.component.html',
  styleUrls: ['./admin-tarot.component.css']
})
export class AdminTarotComponent implements OnInit {
  cards: any[] = [];

  constructor(private tarotService: TarotService) { }

  ngOnInit(): void {
    this.tarotService.getAll().subscribe({
      next: (data) => {
        this.cards = data;
      },
      error: (err) => console.error('Failed to load tarot cards:', err)
    });
  }
}
