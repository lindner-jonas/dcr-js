import {create as svgCreate } from 'tiny-svg';

// Colors of relations
export var colorCondition = "#FEA00F"
export var colorResponse = "#2192FF"
export var colorInclude = "#2CA81A"
export var colorExclude = "#FB1818"
export var colorMilestone = "#A932D0"

export function svgAppend(parent, child) {
    parent.appendChild(child);
  }
  
export function svgGroup(elements) {
    var group = svgCreate('g');
    elements.forEach(function(element) {
        svgAppend(group, element);
    });
    return group;
}