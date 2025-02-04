// @flow
import * as React from 'react';
import {
    drawingToolIconsData,
    drawingToolIconsMenuHeading,
    drawingToolIconsMenuSubHeading
} from "@Components/Charts/CandleChartData.tsx";

type Props = {

};
export const DrawingTool = (props: Props) => {

    const [openDrawToolMenu
        , setopenDrawToolMenu] = React.useState(false);

    const openDrawingToolMenu = () => {
        setopenDrawToolMenu(!openDrawToolMenu);
    }

    return (
        <div className="drawingToolLayout">
            <div className="drawingTool">
                {drawingToolIconsData.map((icon) => (
                    <div className="drawingToolIconWrapper" key={icon.id}>
                        <button className="drawingToolIcon">
                                        <span role="img" aria-hidden="true">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28"
                                               height="28">
                                            <g fill="currentColor">
                                              {icon.paths.map((d, index) => (
                                                  <path d={d} key={index}></path>
                                              ))}
                                            </g>
                                          </svg>
                                        </span>
                            <button className="drawingToolArrow"
                                    onClick={openDrawingToolMenu}
                            >
                                <span role="img" aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16" width="10" height="16"><path
                                        d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"></path></svg>
                                </span>
                            </button>
                            {openDrawToolMenu && (
                                <div className="drawingToolMenuWrapper">
                                    {drawingToolIconsMenuHeading.map((d, i) => (
                                        <div className="drawingToolMenuHeading" key={d.id}>
                                            {d.heading}
                                        </div>
                                    ))}

                                    <div className="drawingToolMenuContent">
                                        {drawingToolIconsMenuSubHeading.map((d, i) => (
                                            <div key={i}>
          <span role="img" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
              <g fill="currentColor">
                {icon.paths.map((path, index) => (
                    <path d={path} key={index}></path>
                ))}
              </g>
            </svg>
          </span>
                                                <span className="drawingToolMenuContent-name">{d.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                ))}


            </div>
            <div>

            </div>

        </div>
    );
};