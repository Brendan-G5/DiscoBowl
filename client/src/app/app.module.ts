import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./views/header/header.component";
import { SetUpComponent } from './views/set-up/set-up.component';
import { GamePlayComponent } from './views/game-play/game-play.component';
import { HowToComponent } from './views/how-to/how-to.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SetUpComponent, GamePlayComponent, HowToComponent, PlayerListComponent, AddPlayerComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
