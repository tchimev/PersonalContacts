import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { personsReducer } from "./person.reducer";
import { PersonsEffects } from "./person.effect";

@NgModule({
    imports: [
        StoreModule.forFeature('person', personsReducer),
        EffectsModule.forFeature([PersonsEffects])
    ]
})
export class PersonStoreModule {}