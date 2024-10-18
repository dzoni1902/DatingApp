import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { MemberEditComponent } from "../members/member-edit/member-edit.component";


@Injectable({
    providedIn: 'root'
})
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    
    canDeactivate(component: MemberEditComponent): MaybeAsync<GuardResult> {
        if(component.userForm.dirty) {
            return confirm('Are you sure you want to continue?  Any unsavd changes will be lost.');
        }
        return true;
    }
}