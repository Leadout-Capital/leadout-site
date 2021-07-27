import * as React from "react";
import { ExecuteOnScroll } from "./OnScroll";
import { DivProps } from "react-html-props";

export type Section = {
  key: string,
  image: string,
  section: React.ReactNode
}

type ImageFadeProps = DivProps & {
  data: Section[]
}

const ImageFade: React.FC<ImageFadeProps> = ({ data, className = "", ...props }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>();

  const checkScroll = (activeIndex) => {
    if (!scrollRef.current) return;
    let index = -Math.trunc(scrollRef.current.getBoundingClientRect().top / window.innerHeight - 0.5);
    if (index < 0) {
      index = 0;
    } else if (index >= data.length) {
      index = data.length - 1;
    }
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", () => checkScroll(activeIndex));
    return () => window.removeEventListener("scroll", () => checkScroll(activeIndex));
  }, [activeIndex]);

  React.useEffect(() => console.log("image", data[activeIndex].image), [activeIndex]);

  return (
    <div {...props} className={"image-fade " + className} ref={scrollRef}>
      <ExecuteOnScroll
        className={"show-on-scroll image"}
        style={{ backgroundImage: `url(${data[activeIndex].image})` }}
      />
      {data.map(({ key, section }) => (
        <div key={key} className={"panel-wrapper"}>
          {section}
        </div>
      ))}
    </div>
  )
};

export default ImageFade;