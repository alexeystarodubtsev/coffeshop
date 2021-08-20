import { Action as ReduxAction, ActionCreator as ReduxActionCreator } from 'redux';

interface Action<TType = string, TPayload = {}> extends ReduxAction<TType> {
    payload: TPayload;
}
export const createAction = <TType = string, TPayload = {}>(
    type: TType,
    payload: TPayload
): Action<TType, TPayload> => ({
    type,
    payload
});
type ActionCreator = ReduxActionCreator<any>;

type ExtractActionCreator<T> = T extends ActionCreator ? ReturnType<T> : never;

type RecursiveDictionary<T> = {
    [index: string]: RecursiveDictionary<T> | T;
};

export type ExtractActions<T extends RecursiveDictionary<ActionCreator>> = {
    [P in keyof T]: T[P] extends RecursiveDictionary<ActionCreator> ? ExtractActions<T[P]> : ExtractActionCreator<T[P]>;
}[keyof T];
