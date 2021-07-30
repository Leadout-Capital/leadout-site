import * as React from "react";
import { DivProps, PProps } from "react-html-props";

type DelayEachProps = DivProps & (TextProps | BlockProps) & {
  duration?: number,
  delay?: number,
  startingDelay?: number,
  render: React.ReactNodeArray | string[],
  asString?: boolean
}

type TextProps = {
  useP: true,
  listProps?: PProps
}

type BlockProps = {
  useP: false,
  listProps?: DivProps
}

const DelayEach: React.FC<DelayEachProps> = ({ duration = 0.75, delay = 0.3, startingDelay = 0, useP, listProps = {}, render, asString = false, ...props }) => {
  if (asString) {
    return (
      <div {...props}>
        {render.map((node, i) =>
          useP ? (
            <p key={i.toString()}
               style={{transition: `all ${duration}s ease ${delay * i + startingDelay}s`}} {...listProps}
               dangerouslySetInnerHTML={{__html: node}}/>
          ) : (
            <div key={i.toString()}
                 style={{transition: `all ${duration}s ease ${delay * i + startingDelay}s`}} {...listProps}
                 dangerouslySetInnerHTML={{__html: node}}/>
          )
        )}
      </div>
    )
  } else {
    return (
      <div {...props}>
        {render.map((node, i) =>
          useP ? (
            <p key={i.toString()}
               style={{transition: `all ${duration}s ease ${delay * i + startingDelay}s`}} {...listProps}>
              {node}
            </p>
          ) : (
            <div key={i.toString()}
                 style={{transition: `all ${duration}s ease ${delay * i + startingDelay}s`}} {...listProps}>
              {node}
            </div>
          )
        )}
      </div>
    )
  }
};

export default DelayEach;