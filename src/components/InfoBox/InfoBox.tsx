import React from 'react';

import "./InfoBox.scss";

import closeSVG from "../../assets/close_icon.png"
import { connect } from "react-redux";

interface IInfoBoxProps {
  resource: any;
  slide?: boolean;
  expanded?: boolean;
  setExpanded?: Function;
}

const InfoBox = (props: IInfoBoxProps) => {
  const { resource, slide, expanded, setExpanded } = props;

  const handleCloseClick = (e) => {
    if (setExpanded) {
      setExpanded(false);
    }
  };

  const expandedClass = expanded ? "expanded" : "";

  const renderCongressInfo = () => {
    if (resource.properties) {
    } else {
      return (
        <div className="no-info">
          Resources
        </div>
      );
    }
  };

  const renderContent = () => (
    <div className="content">
      {renderCongressInfo()}
    </div>
  );

  if (slide) {
    return (
      <div className={`InfoBox slide ${expandedClass}`}>
        <img
          className="closeIcon"
          src={closeSVG}
          alt="close"
          onClick={handleCloseClick}
        ></img>
        {renderContent()}
      </div>
    )
  } else {
    return (
      <div className="InfoBox">
        {renderContent()}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(InfoBox);