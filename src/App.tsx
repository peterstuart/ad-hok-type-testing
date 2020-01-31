import React from "react"
import { addState } from "ad-hok"
import { flow } from "lodash/fp"

interface AppProps {
  externalProp: string
}

const App: React.FC<AppProps> = flow(
  addState("name", "setName", "hello"),
  ({ name, setName, externalProp }) => (
    <div>
      <span>External prop: {externalProp}</span>
      <span>Name: {name}</span>
      <button onClick={() => setName("abc")}>set name</button>
    </div>
  )
)

export default App
