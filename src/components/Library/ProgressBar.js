import React from 'react';
import { Doughnut, Chart } from 'react-chartjs-2';

class ProgressBar extends React.Component {
    render() {
        Chart.controllers.doughnut = Chart.controllers.doughnut.extend({
            draw: function(ease) {
                var ctx           = this.chart.ctx;
                var easingDecimal = ease || 1;
                var arcs          = this.getMeta().data;
                Chart.pluginService.register({
                    beforeDraw: function(chart) {
                        if (chart.config.options.elements.center) {
                            // Get ctx from string
                            var ctx = chart.chart.ctx;
                        
                            // Get options from the center object in options
                            var centerConfig = chart.config.options.elements.center;
                            var fontStyle = centerConfig.fontStyle || 'Arial';
                            var txt = centerConfig.text;
                            var color = centerConfig.color || '#000';
                            var maxFontSize = centerConfig.maxFontSize || 75;
                            var sidePadding = centerConfig.sidePadding || 20;
                            var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                            // Start with a base font of 30px
                            ctx.font = "30px " + fontStyle;
                        
                            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                            var stringWidth = ctx.measureText(txt).width;
                            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
                        
                            // Find out how much the font can grow in width.
                            var widthRatio = elementWidth / stringWidth;
                            var newFontSize = Math.floor(30 * widthRatio);
                            var elementHeight = (chart.innerRadius * 2);
                        
                            // Pick a new font size so it will not be larger than the height of label.
                            var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                            var minFontSize = centerConfig.minFontSize;
                            var lineHeight = centerConfig.lineHeight || 25;
                            var wrapText = false;
                        
                            if (minFontSize === undefined) {
                                minFontSize = 20;
                            }
                        
                            if (minFontSize && fontSizeToUse < minFontSize) {
                                fontSizeToUse = minFontSize;
                                wrapText = true;
                            }
                        
                            // Set font settings to draw it correctly.
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                            ctx.font = fontSizeToUse + "px " + fontStyle;
                            ctx.fillStyle = color;
                        
                            if (!wrapText) {
                                ctx.fillText(txt, centerX, centerY);
                                return;
                            }
                        
                            var words = txt.split(' ');
                            var line = '';
                            var lines = [];
                    
                            // Break words up into multiple lines if necessary
                            for (var n = 0; n < words.length; n++) {
                                var testLine = line + words[n] + ' ';
                                var metrics = ctx.measureText(testLine);
                                var testWidth = metrics.width;
                                if (testWidth > elementWidth && n > 0) {
                                lines.push(line);
                                line = words[n] + ' ';
                                } else {
                                line = testLine;
                                }
                            }
                        
                            // Move the center up depending on line height and number of lines
                            centerY -= (lines.length / 2) * lineHeight;
                        
                            for (n = 0; n < lines.length; n++) {
                                ctx.fillText(lines[n], centerX, centerY);
                                centerY += lineHeight;
                            }
                            //Draw text in center
                            ctx.fillText(line, centerX, centerY);
                        }
                    }
                });

                Chart.helpers.each(arcs, function(arc, i) {
                  
                    arc.transition(easingDecimal).draw();

                    var pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1];
                    var pColor = pArc._view.backgroundColor;

                    var vm         = arc._view;
                    var radius     = (vm.outerRadius + vm.innerRadius) / 2;
                    var thickness  = (vm.outerRadius - vm.innerRadius) / 2;
                    var startAngle = Math.PI - vm.startAngle - Math.PI / 2;

                    ctx.save();
                    ctx.translate(vm.x, vm.y);

                    ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
                    ctx.beginPath();
                    ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.restore();  
                });
            }
        });

        const { progress } = this.props
        const graphOptions = {
            type   : 'RoundedDoughnut',
            data   : {
                datasets: [
                    {
                        data           : [progress,100-progress],
                        backgroundColor: [
                            '#F58732',
                            'rgba(245, 135, 50, 0.15)'
                        ],
                        borderWidth    : 0,
                        
                    }],
                labels: [
                    'Hoàn thành',
                    'Chưa hoàn thành',
                ],
            },
            options: {
                cutoutPercentage: 75,
                legend: {
                    display: false,
                },
                responsive: true,
                elements: {
                    center: {
                        text: progress+"%", // Default is #000000
                        fontStyle: 'Open Sans', // Default is Arial
                        sidePadding: 45, // Default is 20 (as a percentage)
                        minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
                        lineHeight: 25 // Default is 25 (in px), used for when text wraps
                    }
                },
            },
            width: 100,
            height: 100,
        };

        return (
            <div id="users-chart-container" >
                <Doughnut {...graphOptions}/>
            </div>
        )
    }
}

export default ProgressBar;
