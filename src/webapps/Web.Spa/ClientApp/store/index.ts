import * as customerStore from '@Store/customerStore';
import * as loginStore from "@Store/loginStore";
import * as projectDetailStore from "@Store/projectDetailStore";
import * as productStore from "@Store/productStore";
import { connect } from "react-redux";

/**
 * @interface IApplicationState The top-level state object definition.
 */
export interface IApplicationState {
    customers: customerStore.ICustomerStoreState,
    login: loginStore.ILoginStoreState;
    projectDetail: projectDetailStore.IProjectDetailStoreState,
    products: productStore.IProductStoreState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    customers: customerStore.reducer,
    login: loginStore.reducer,
    projectDetail: projectDetailStore.reducer,
    products: productStore.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface IAppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}

export interface IAppThunkActionAsync<TAction, TResult> {
    (dispatch: (action: TAction) => void, getState: () => IApplicationState) : Promise<TResult>
}

export function withStore<TStoreState, TActionCreators, TComponent extends React.ComponentType<TStoreState & TActionCreators & any>>(
    component: TComponent,
    stateSelector: (state: IApplicationState) => TStoreState,
    actionCreators: TActionCreators
): TComponent {
    return <TComponent> <unknown>connect(stateSelector, actionCreators)(component);
}
