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

  type AddEffectType = <TProps>(
    callback: (props: TProps) => () => void,
    dependencies?: Array<keyof TProps>,
  ) => (props: TProps) => TProps

  declare const addEffect: AddEffectType
}
