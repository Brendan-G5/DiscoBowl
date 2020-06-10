import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./views/header/header.component";
import { SetUpComponent } from "./views/set-up/set-up.component";
import { GamePlayComponent } from "./components/game-play/game-play.component";
import { HowToComponent } from "./views/how-to/how-to.component";
import { AddPlayerComponent } from "./components/add-player/add-player.component";
import { PlayerSelectionComponent } from "./components/player-selection/player-selection.component";
import { PlayerItemComponent } from "./components/player-item/player-item.component";
import { NumberPickerComponent } from "./components/number-picker/number-picker.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SetUpComponent,
    GamePlayComponent,
    HowToComponent,
    AddPlayerComponent,
    PlayerSelectionComponent,
    PlayerItemComponent,
    NumberPickerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
