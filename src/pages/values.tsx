import * as React from "react";
import { ExecuteOnScroll } from "../components/OnScroll";
import DelayEach from "../components/DelayEach";
import { CoreValues, TeamBenefits } from "../constants/Values";
import "../stylesheets/values.scss";

export type Benefit = {
  title: string,
  body: string
}

const Values = () => {
  return (
    <main className={"values"}>
      <ExecuteOnScroll className={"header section core"}>
        <h1>Our Core Fund Values</h1>
        <DelayEach
          className={"content"}
          render={CoreValues}
          useP={true}
        />
      </ExecuteOnScroll>
      <div className={"section working-with-leadout"}>
        <h1>Working with Leadout</h1>
        <div className={"content"}>
          {TeamBenefits.map(({ title, body }) => (
            <ExecuteOnScroll key={title} className={"show-on-scroll"} bottom={150}>
              <h2>{title}</h2>
              <p>{body}</p>
            </ExecuteOnScroll>
          ))}
        </div>
      </div>
    </main>
  )
};

export default Values;