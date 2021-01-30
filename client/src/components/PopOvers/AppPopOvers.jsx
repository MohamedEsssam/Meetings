import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

const AppPopOvers = ({ title, bodyContent, children }) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>{bodyContent}</Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement="right"
      overlay={popover}
    >
      {children}
    </OverlayTrigger>
  );
};

export default AppPopOvers;
