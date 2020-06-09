import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SetUpComponent } from "./views/set-up/set-up.component";
import { GamePlayComponent } from "./views/game-play/game-play.component";

const routes: Routes = [
  { path: "", component: SetUpComponent },
  { path: "play", component: GamePlayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
