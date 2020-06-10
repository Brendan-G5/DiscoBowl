import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GamePlayComponent } from "./components/game-play/game-play.component";
import { PlayerSelectionComponent } from "./components/player-selection/player-selection.component";

const routes: Routes = [
  { path: "setup", component: PlayerSelectionComponent },
  { path: "", component: GamePlayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
