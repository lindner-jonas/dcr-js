import { attr as svgAttr, create as svgCreate } from 'tiny-svg';
import { colorCondition, colorResponse, colorInclude, colorExclude, colorMilestone, svgGroup } from './markers.js';

export function conditionMarker(marker, path, fill) {
  svgAttr(path, {
    markerEnd: marker('new-condition-flow-end', fill, colorCondition),
    stroke: colorCondition,   //yellow
  });
}

export function responseMarker(marker, path, fill) {
  svgAttr(path, {
    markerStart: marker('new-response-flow-start', colorResponse, colorResponse),
    stroke: colorResponse,   //blue
  });
}

export function includeMarker(marker, path, fill) {
  svgAttr(path, {
    markerStart: marker('new-include-flow-start', colorInclude, colorInclude),
    stroke: colorInclude   //green
  });
}

export function excludeMarker(marker, path, fill) {
  svgAttr(path, {
    markerStart: marker('new-exclude-flow-start', colorExclude, colorExclude),
    stroke: colorExclude   //red
  });
}

export function milestoneMarker(marker, path, fill) {
  svgAttr(path, {
    markerEnd: marker('new-milestone-flow-end', fill, colorMilestone),
    stroke: colorMilestone   //purple
  });
}

//Create the proposed markers
export function createMarker(addMarker, id, type, fill, stroke) {

  if (type === 'new-response-flow-start') {
    var responseflowStart = svgCreate('rect');
    svgAttr(responseflowStart, {
      x: 1,
      y: 1,
      width: 18,
      height: 18,
      rx: 2,
      ry: 2
    });

    // Vertical line
    var verticalLine = svgCreate('path');
    svgAttr(verticalLine, {
      d: 'M10,7 v5 a1,1 0 0 1 -1,1 h0 a1,1 0 0 1 -1,-1 v-5 a1,1 0 0 1 1,-1 h0 a1,1 0 0 1 1,1 z',
      fill: stroke,
      'stroke-width': 0.5,
      transform: 'translate(1, -2)'
    });

    // Dot
    var dot = svgCreate('circle');
    svgAttr(dot, {
      cx: 10,
      cy: 14,
      r: 0.55,
      fill: stroke
    });

    // Group the elements together
    var excludeflowGroup = svgGroup([responseflowStart, verticalLine, dot]);

    addMarker(id, {
      element: excludeflowGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        'stroke-linecap': 'butt',
        fill: 'white'
      },
      ref: {
        x: -0.95,
        y: 10
      },
      scale: 0.5,
    });
}

  if (type === 'new-exclude-flow-start') {
    var excludeflowStart = svgCreate('rect');
    svgAttr(excludeflowStart, {
      x: 1,
      y: 1,
      width: 18,
      height: 18,
      rx: 2,
      ry: 2
    });
  
    // Minus sign
    var minusSign = svgCreate('path');
    svgAttr(minusSign, {
      d: 'M5.5,10 h6 a1,1 0 0 1 1,1 v0 a1,1 0 0 1 -1,1 h-6 a1,1 0 0 1 -1,-1 v0 a1,1 0 0 1 1,-1 z',
      fill: stroke,
      'stroke-width': 0.3,
      transform: 'translate(1.5, -1)'
    });
  
    // Group the elements together
    var excludeflowGroup = svgGroup([excludeflowStart, minusSign]);
  
    addMarker(id, {
      element: excludeflowGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        'stroke-linecap': 'butt',
        fill: 'white'
      },
      ref: {
        x: -0.95,
        y: 10
      },
      scale: 0.5
    });
  }

  if (type === 'new-include-flow-start') {
    var includeflowStart = svgCreate('rect');
    svgAttr(includeflowStart, {
      x: 1,
      y: 1,
      width: 18,
      height: 18,
      rx: 2,
      ry: 2
    });

    // Vertical line
    var verticalLine = svgCreate('path');
    svgAttr(verticalLine, {
      d: 'M10,3.5 v10 a1,1 0 0 1 -1,1 h0 a1,1 0 0 1 -1,-1 v-10 a1,1 0 0 1 1,-1 h0 a1,1 0 0 1 1,1 z',
      fill: stroke,
      'stroke-width': 0.3,
      transform: 'translate(1, 1.5)'
    });

    // Horizontal line
    var horizontalLine = svgCreate('path');
    svgAttr(horizontalLine, {
      d: 'M3.5,10 h10 a1,1 0 0 1 1,1 v0 a1,1 0 0 1 -1,1 h-10 a1,1 0 0 1 -1,-1 v0 a1,1 0 0 1 1,-1 z',
      fill: stroke,
      'stroke-width': 0.3,
      transform: 'translate(1.5, -1)'
    });

    // Group the elements together
    var excludeflowGroup = svgGroup([includeflowStart, verticalLine, horizontalLine]);

    addMarker(id, {
      element: excludeflowGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        'stroke-linecap': 'butt',
        fill: 'white'
      },
      ref: {
        x: -0.95,
        y: 10
      },
      scale: 0.5
    });
} 

  if (type === 'new-condition-flow-end') {
    var conditionflowEndPath = svgCreate('circle');
    svgAttr(conditionflowEndPath, {
      cx: 10,
      cy: 10,
      r: 9,
    });
  
    addMarker(id, {
      element: conditionflowEndPath,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        'stroke-linecap': 'butt',
        fill: 'white'
      },
      ref: {
        x: 21,
        y: 10
      },
      scale: 0.5
    });
  }


  if (type === 'new-milestone-flow-end') {
    var milestoneflowEnd = svgCreate('circle');
    svgAttr(milestoneflowEnd, {
      cx: 10,
      cy: 10,
      r: 9,
    });

    // Vertical line
    var verticalLine = svgCreate('path');
    svgAttr(verticalLine, {
      d: 'M10,7 v5 a1,1 0 0 1 -1,1 h0 a1,1 0 0 1 -1,-1 v-5 a1,1 0 0 1 1,-1 h0 a1,1 0 0 1 1,1 z',
      fill: stroke,
      'stroke-width': 0.5,
      transform: 'translate(1, -2)'
    });

    // Dot
    var dot = svgCreate('circle');
    svgAttr(dot, {
      cx: 10,
      cy: 14,
      r: 0.55,
      fill: stroke
    });

    // Group the elements together
    var milestoneGroup = svgGroup([milestoneflowEnd, verticalLine, dot]);
  
    addMarker(id, {
      element: milestoneGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        'stroke-linecap': 'butt',
        fill: 'white'
      },
      ref: {
        x: 21,
        y: 10
      },
      scale: 0.5
    });
  }
}
