declare module 'ad-hok' {
  type AddStateType = <
    TState,
    TStateName extends string,
    TStateUpdaterName extends string,
    TProps
  >(
    stateName: TStateName,
    stateUpdaterName: TStateUpdaterName,
    initialState: TState | ((props: TProps) => TState),
  ) => (
    props: TProps,
  ) => TProps &
    { [stateName in TStateName]: TState } &
    { [stateUpdaterName in TStateUpdaterName]: (state: TState) => void }

  declare const addState: AddStateType
}

// declare module "ad-hok" {
//   declare function addState<
//     TState,
//     TStateName extends string,
//     TStateUpdaterName extends string
//   >(
//     stateName: TStateName,
//     stateUpdaterName: TStateUpdaterName,
//     initialState: TState
//   ): { [stateName in TStateName]: TState } &
//     { [stateUpdaterName in TStateUpdaterName]: (state: TState) => void };
// }
