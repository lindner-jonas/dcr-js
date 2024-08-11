import { attr as svgAttr, create as svgCreate } from 'tiny-svg';
import { colorCondition, colorResponse, colorInclude, colorExclude, colorMilestone, svgGroup } from './markers.js';

export function conditionMarker(marker, path, fill) {
  svgAttr(path, {
    markerEnd: marker('proposed-condition-flow-end', fill, colorCondition),   
    markerStart: marker('proposed-condition-flow-start', colorCondition, colorCondition),
    stroke: colorCondition,   //yellow
  });
}

export function responseMarker(marker, path, fill) {
  svgAttr(path, {
    markerStart: marker('proposed-response-flow-start', colorResponse, colorResponse),
    markerEnd: marker('proposed-response-flow-end', fill, colorResponse),   
    stroke: colorResponse,   //blue
  });
}

export function includeMarker(marker, path, fill) {
  console.log("INCLUDE MARKER");
  console.log(marker('proposed-include-flow-start', colorInclude, colorInclude));
  svgAttr(path, {
    markerStart: marker('proposed-include-flow-start', colorInclude, colorInclude),
    markerEnd: marker('proposed-include-flow-end', fill, colorInclude),    
    stroke: colorInclude   //green
  });
}

export function excludeMarker(marker, path, fill) {
  svgAttr(path, {
    markerStart: marker('proposed-exclude-flow-start', colorExclude, colorExclude),
    markerEnd: marker('proposed-exclude-flow-end', fill, colorExclude),   
    stroke: colorExclude   //red
  });
}

export function milestoneMarker(marker, path, fill) {
  svgAttr(path, {
    markerEnd: marker('proposed-milestone-flow-end', fill, colorMilestone),
    markerStart: marker('proposed-milestone-flow-start', fill, colorMilestone),
    stroke: colorMilestone   //purple
  });
}


export function spawnMarker(marker, path, fill) {
  svgAttr(path, {
    markerEnd: marker('proposed-spawn-flow-end', '#4D6180', '#4D6180'), 
    markerStart: marker('proposed-spawn-flow-start', '#4D6180', '#4D6180'),
    stroke: '#4D6180'   
  });
}


//Create the proposed markers
export function createMarker(addMarker, id, type, fill, stroke) {

  if (type === 'proposed-response-flow-end') {
    var responseflowEnd = svgCreate('circle');
    svgAttr(responseflowEnd, {
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
    var responseGroup = svgGroup([responseflowEnd, verticalLine, dot]);
  
    addMarker(id, {
      element: responseGroup,
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

  if (type === 'proposed-response-flow-start') {
    var responseflowStart = svgCreate('path');
    svgAttr(responseflowStart, {

      d: 'M 1 5 L 11 10 L 1 15 Z'

    });

    addMarker(id, {
      element: responseflowStart,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 0, y: 10 },
      scale: 0.65,
    });
  }


  if (type === 'proposed-exclude-flow-end') {
    var excludeflowEnd = svgCreate('circle');
    svgAttr(excludeflowEnd, {
      cx: 10,
      cy: 10,
      r: 9,
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
    var excludeGroup = svgGroup([excludeflowEnd, minusSign]);
  
    addMarker(id, {
      element: excludeGroup,
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

  if (type === 'proposed-exclude-flow-start') {
    var excludeflowStart = svgCreate('path');
    svgAttr(excludeflowStart, {

      d: 'M 1 5 L 11 10 L 1 15 Z',

    });

    addMarker(id, {
      element: excludeflowStart,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 0, y: 10 },
      scale: 0.6,
    });
  }

  if (type === 'proposed-include-flow-end') {
    var includeflowEnd = svgCreate('circle');
    svgAttr(includeflowEnd, {
      cx: 10,
      cy: 10,
      r: 9,
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
    var excludeGroup = svgGroup([includeflowEnd, verticalLine, horizontalLine]);
  
    addMarker(id, {
      element: excludeGroup,
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

  if (type === 'proposed-include-flow-start') {
    var includeflowStart = svgCreate('path');
    svgAttr(includeflowStart, {

      d: 'M 1 5 L 11 10 L 1 15 Z',

    });

    addMarker(id, {
      element: includeflowStart,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 0, y: 10 },
      scale: 0.65,
    });
  }

  if (type === 'proposed-condition-flow-end') {
    var conditionflowEnd = svgCreate('circle');
    svgAttr(conditionflowEnd, {
      cx: 10,
      cy: 10,
      r: 9,
    });
  
    // Inner circle
    var innerCircle = svgCreate('circle');
    svgAttr(innerCircle, {
      cx: 6,
      cy: 10,
      r: 2.2,
      fill: 'white',
      stroke: stroke,
      'stroke-width': 2,
      transform: 'translate(0.2, 0)'
    });
  
    // Horizontal line
    var horizontalLine = svgCreate('path');
    svgAttr(horizontalLine, {
      d: 'M5,10 h6 a1,1 0 0 1 1,1 v0 a1,1 0 0 1 -1,1 h-6 a1,1 0 0 1 -1,-1 v0 a1,1 0 0 1 1,-1 z',
      fill: stroke,
      'stroke-width': 0.2,
      transform: 'translate(4, -1)'
    });
  
    // Vertical lines
    var verticalLine1 = svgCreate('path');
    svgAttr(verticalLine1, {
      d: 'M10,8 v2 a1,1 0 0 1 -1,1 h0 a1,1 0 0 1 -1,-1 v-2 a1,1 0 0 1 1,-1 h0 a1,1 0 0 1 1,1 z',
      fill: stroke,
      'stroke-width': 0.2,
      transform: 'translate(3.5, 2)'
    });
  
    var verticalLine2 = svgCreate('path');
    svgAttr(verticalLine2, {
      d: 'M10,8 v2 a1,1 0 0 1 -1,1 h0 a1,1 0 0 1 -1,-1 v-2 a1,1 0 0 1 1,-1 h0 a1,1 0 0 1 1,1 z',
      fill: stroke,
      'stroke-width': 0.2,
      transform: 'translate(6.5, 2)'
    });
  
    // Group the elements together
    var excludeGroup = svgGroup([conditionflowEnd, innerCircle, horizontalLine, verticalLine1, verticalLine2]);
  
    addMarker(id, {
      element: excludeGroup,
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

  if (type === 'proposed-condition-flow-start') {
    var includeflowStart = svgCreate('path');
    svgAttr(includeflowStart, {

      d: 'M 1 5 L 11 10 L 1 15 Z',

    });

    addMarker(id, {
      element: includeflowStart,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 0, y: 10 },
      scale: 0.65,
    });
  }

  if (type === 'proposed-milestone-flow-end') {
    var milestoneflowEnd = svgCreate('circle');
    svgAttr(milestoneflowEnd, {
      cx: 10,
      cy: 10,
      r: 9,
    });
  
    // Inner circle
    var innerCircle = svgCreate('circle');
    svgAttr(innerCircle, {
      cx: 6,
      cy: 10,
      r: 2.2,
      fill: 'white',
      stroke: stroke,
      'stroke-width': 2,
      transform: 'translate(0.2, 0)'
    });
  
    // Horizontal line
    var horizontalLine = svgCreate('path');
    svgAttr(horizontalLine, {
      d: 'M5,10 h6 a1,1 0 0 1 1,1 v0 a1,1 0 0 1 -1,1 h-6 a1,1 0 0 1 -1,-1 v0 a1,1 0 0 1 1,-1 z',
      fill: stroke,
      'stroke-width': 0.2,
      transform: 'translate(4, -1)'
    });
  
    // Vertical lines
    var verticalLine1 = svgCreate('path');
    svgAttr(verticalLine1, {
      d: 'M10,8 v2 a1,1 0 0 1 -1,1 h0 a1,1 0 0 1 -1,-1 v-2 a1,1 0 0 1 1,-1 h0 a1,1 0 0 1 1,1 z',
      fill: stroke,
      'stroke-width': 0.2,
      transform: 'translate(3.5, 2)'
    });
  
    var verticalLine2 = svgCreate('path');
    svgAttr(verticalLine2, {
      d: 'M10,8 v2 a1,1 0 0 1 -1,1 h0 a1,1 0 0 1 -1,-1 v-2 a1,1 0 0 1 1,-1 h0 a1,1 0 0 1 1,1 z',
      fill: stroke,
      'stroke-width': 0.2,
      transform: 'translate(6.5, 2)'
    });
  
    // Group the elements together
    var milestoneGroup = svgGroup([milestoneflowEnd, innerCircle, horizontalLine, verticalLine1, verticalLine2]);
  
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

  if (type === 'proposed-milestone-flow-start') {
    var milestoneflowStart = svgCreate('path');
    svgAttr(milestoneflowStart, {
      d: 'M3,1 l17,8.5 l-17,8.5 z',
      fill: 'white',
      stroke: stroke,
      'stroke-width': '2',
    });
  
    // Vertical line
    var verticalLine = svgCreate('path');
    svgAttr(verticalLine, {
      d: 'M10,8 v3 a1,1 0 0 1 -1,1 h0 a1,1 0 0 1 -1,-1 v-3 a1,1 0 0 1 1,-1 h0 a1,1 0 0 1 1,1 z',
      fill: stroke,
      'stroke-width': 0.4,
      transform: 'translate(-2, -2)'
    });
  
    // Dot
    var dot = svgCreate('circle');
    svgAttr(dot, {
      cx: 10,
      cy: 13,
      r: 0.45,
      fill: stroke,
      transform: 'translate(-3, -0.6)'
    });
  
    // Group the elements together
    var responseGroup = svgGroup([milestoneflowStart, verticalLine, dot]);
  
    addMarker(id, {
      element: responseGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        'stroke-linecap': 'butt',
        fill: 'white'
      },
      ref: {
        x: 1,
        y: 9.5
      },
      scale: 0.5
    });
  }

  if (type === 'proposed-spawn-flow-end') {
    var spawnflowEnd = svgCreate('path');
    svgAttr(spawnflowEnd, {

      d: 'M 13.85,5.21 C 14.23,5.49 14.60,5.34 14.67,4.87 14.67,4.87 14.98,2.83 14.98,2.83 15.06,2.35 15.17,'+
      '2.35 15.24,2.83 15.24,2.83 15.55,4.87 15.55,4.87 15.63,5.34 16.00,5.49 16.38,5.21 16.38,5.21 18.13,'+
      '3.92 18.13,3.92 18.51,3.64 18.60,3.73 18.32,4.11 18.32,4.11 17.04,5.89 17.04,5.89 16.77,6.27 16.92,'+
      '6.65 17.39,6.72 17.39,6.72 19.40,7.03 19.40,7.03 19.87,7.11 19.87,7.22 19.40,7.30 19.40,7.30 17.39,'+
      '7.61 17.39,7.61 16.92,7.68 16.77,8.06 17.04,8.44 17.04,8.44 18.32,10.22 18.32,10.22 18.60,10.60 18.51,'+
      '10.69 18.13,10.41 18.13,10.41 16.38,9.12 16.38,9.12 16.00,8.84 15.63,8.99 15.55,9.46 15.55,9.46 15.24,'+
      '11.50 15.24,11.50 15.17,11.98 15.06,11.98 14.98,11.50 14.98,11.50 14.67,9.46 14.67,9.46 14.60,8.99 14.23,'+
      '8.84 13.85,9.12 13.85,9.12 12.10,10.41 12.10,10.41 11.72,10.69 11.65,10.61 11.94,10.24 11.94,10.24 13.39,'+
      '8.42 13.39,8.42 13.69,8.05 13.55,7.69 13.08,7.62 13.08,7.62 10.78,7.30 10.78,7.30 10.32,7.24 10.32,7.12 10.78,'+
      '7.05 10.78,7.05 12.84,6.72 12.84,6.72 13.31,6.65 13.46,6.27 13.19,5.89 13.19,5.89 11.91,4.11 11.91,4.11 11.63,'+
      '3.73 11.72,3.64 12.10,3.92 12.10,3.92 13.85,5.21 13.85,5.21 Z M 10.60,7.18 C 10.60,7.18 5.30,9.56 5.30,9.56 5.30,'+
      '9.56 -0.00,11.94 -0.00,11.94 -0.00,11.94 0.01,7.16 0.01,7.16 0.01,7.16 0.03,2.37 0.03,2.37 0.03,2.37 5.31,'+
      '4.77 5.31,4.77 5.31,4.77 10.60,7.18 10.60,7.18 Z',

    });

    addMarker(id, {
      element: spawnflowEnd,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 21.2, y: 7.2 },
      scale: 0.6,
    });
  }


  if (type === 'proposed-spawn-flow-start') {
    var includeflowStart = svgCreate('path');
    svgAttr(includeflowStart, {

      d: 'M 1 5 L 11 10 L 1 15 Z',

    });

    addMarker(id, {
      element: includeflowStart,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 0, y: 10 },
      scale: 0.65,
    });
  }

}