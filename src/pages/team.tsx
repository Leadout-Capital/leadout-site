import * as React from "react";
import { ExecuteOnScroll } from "../components/OnScroll";
import DelayEach from "../components/DelayEach";
import TeamDescriptions from "../constants/TeamDescriptions";
import "../stylesheets/team.scss";

const DURATION = 0.75;
const DELAY = 0.3;

export type Bio = {
  image: string,
  description: React.ReactNodeArray | string[],
  role: string,
  name: string
}

const Team = () => {
  const scrollRef = React.useRef<HTMLDivElement>();
  const transition = (i: number) => ({ transition: `all ${DURATION}s ease ${DELAY * i}s` });

  return (
    <main className={"team"} ref={scrollRef}>
      {TeamDescriptions.map(({ name, role, image, description }) => (
        <ExecuteOnScroll key={name} className={"bio"}>
          <img src={image} alt={`${name}, ${role}`} style={transition(0)} />
          <h2 style={transition(1)}>{name}, {role}</h2>
          <DelayEach
            duration={DURATION}
            delay={DELAY}
            startingDelay={DELAY * 2}
            className={"bio-blurb"}
            render={description}
            useP={true}
          />
        </ExecuteOnScroll>
      ))}
      <ExecuteOnScroll className={"community"}>
        <h2 style={transition(0)}>Our Community</h2>
        <DelayEach
          duration={DURATION}
          delay={DELAY}
          startingDelay={DELAY}
          className={"bio-blurb"}
          useP={true}
          render={[
            <>
              Core to our approach is the belief that you are only as good as your team. We are a partnership, an
              operating and advisory network, and a stellar group of LPs comprised of gritty and resilient founders.
              Our community hails from companies such as Apple, Amazon, Cloudera, Dropbox, Envoy, Facebook, Fare,
              Google, ipsy, Microsoft, Nextdoor, Niantic, Nvidia, Pinterest, Shoprunner, Slack, Square, Stripe, Uber,
              VMware, Wealthfront, and Wix, as well as sports, government, research and academia.
            </>,
            <>
              Read more about Leadout on&nbsp;
              <a
                href={"https://medium.com/@leadoutcapital/introducing-leadout-capital-i-dd356e7c822e"}
                target={"_blank"}
              >
                Ali’s Medium
              </a> or at&nbsp;
              <a
                href={"https://www.forbes.com/sites/alexkonrad/2019/05/16/facebook-alumni-network-women-venture-capital-leadout-tech-investing/#5e3d9e8f3f81"}
                target={"_blank"}
              >
                Forbes
              </a>.
            </>
          ]}
        />
      </ExecuteOnScroll>
    </main>
  )
};

export default Team;