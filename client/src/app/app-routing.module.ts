import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./modules/home/pages/home-page/home-page.component";
import { PlatesApiResolverService } from "./core/resolvers/plates-api-resolver/plates-api-resolver.service";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
