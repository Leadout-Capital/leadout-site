import * as React from "react";
import { DivProps } from "react-html-props";

type OnScrollProps = DivProps & {
  handler: (
    scrollRef: React.RefObject<HTMLDivElement>, // ref for div that wraps content (to check scroll position)
    setState: React.Dispatch<React.SetStateAction<boolean>>, // function to change shown state
    state: boolean
  ) => void,
  defaultShown?: boolean
};

type ExecuteOnScrollProps = DivProps & {
  bottom?: number
}

type ToggleOnScrollProps = DivProps & {
  topBound: number,
  bottomBound: number,
  defaultShown?: boolean
}

const OnScroll = React.forwardRef(({ handler, defaultShown = false, children, className = "", ...props }: OnScrollProps, ref?: React.MutableRefObject<HTMLDivElement>) => {
  const [shown, setShown] = React.useState(defaultShown);
  const scrollRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    const onScrollWithState = () => handler(scrollRef, setShown, shown);
    setTimeout(onScrollWithState, 250);
    window.addEventListener("scroll", onScrollWithState, true);
    return () => window.removeEventListener("scroll", onScrollWithState, true);
  }, [scrollRef, setShown, shown]);

  return (
    <div
      {...props}
      className={`on-scroll ${shown ? "scrolled": "not-scrolled"} ${className}`}
      ref={(divRef) => {
        scrollRef.current = divRef;
        if (ref) {
          ref.current = divRef;
        }
      }}
    >
      {children}
    </div>
  );
});

export const ExecuteOnScroll = React.forwardRef(({ bottom = 350, ...props }: ExecuteOnScrollProps, ref?: React.MutableRefObject<HTMLDivElement>) => {
  const onScroll = (
    scrollRef: React.RefObject<HTMLDivElement>,
    setShown: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!scrollRef.current) return;
    if (scrollRef.current.getBoundingClientRect().y < window.innerHeight - bottom) {
      setShown(true);
    }
  };

  return <OnScroll {...props} handler={onScroll} ref={ref} />;
});

export const ToggleOnScroll: React.FC<ToggleOnScrollProps> = ({ topBound, bottomBound, ...props }) => {
  const onScroll = (
    scrollRef: React.RefObject<HTMLDivElement>,
    setShown: React.Dispatch<React.SetStateAction<boolean>>,
    shown: boolean
  ) => {
    if (!scrollRef.current) return;
    let clientRect = scrollRef.current.getBoundingClientRect();
    let withinBounds = clientRect.y > topBound && clientRect.bottom < bottomBound;
    if (shown !== withinBounds) {
      setShown(withinBounds);
    }
  };

  // @ts-ignore
  return <OnScroll {...props} handler={onScroll} />;
};

export default OnScroll;