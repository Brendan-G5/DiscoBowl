import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GamePlayComponent } from "./views/game-play/game-play.component";
import { PlayerSelectionComponent } from "./components/player-selection/player-selection.component"

const routes: Routes = [
  { path: "", component: PlayerSelectionComponent },
  { path: "play", component: GamePlayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
