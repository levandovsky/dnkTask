import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./modules/home/pages/home-page/home-page.component";
import { PlatesApiResolverService } from "./core/resolvers/plates-api-resolver/plates-api-resolver.service";
import { BadRequestComponent } from "./modules/home/pages/bad-request/bad-request.component";

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
    resolve: {
      plates: PlatesApiResolverService,
    },
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "bad-request",
    component: BadRequestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
