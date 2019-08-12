import React, { useEffect } from 'react';
import * as d3 from 'd3';
import * as hex from 'd3-hexbin';

export default function HoneyComb(){

    const windowWidth = window.innerWidth - 50;
    const windowHeight = window.innerHeight - 50;

    function loadData(){

        d3.select('.svgContainer')
                    .attr('height', windowHeight)
                    .attr('width', windowWidth)
                    .style('border','3px solid #806600')
                    .style('background-color',' #e6b800')


        let randomHexs = [];
        for(let i = 1; i < 150; i++){
            let newData = [Math.random() * windowWidth, Math.random() * windowHeight];
            randomHexs.push(newData);
        }

        beeHive(randomHexs);
    }

    function beeHive(data){
        let hexbin = hex.hexbin().radius(60);

        const capsule = d3.select('.svgContainer').selectAll('.hexagon')
                            .data(hexbin(data))
                            .enter()
                            .append('g')
                                .attr('class','capsule')

        const hexEl = capsule
                    .append('path')
                    .attr('transform', function(d){return 'translate(' + d.x + ',' + d.y + ')'})
                    .attr('d', function(){return hexbin.hexagon()})
                    .style('fill',' #ffcc00')
                    .style('stroke','black')
                    .style('stroke-width',1)

        hexEl.on('mouseover', handleMouseOver)
             .on('mouseout', handleMouseDown)
    }

    useEffect(() => {
        loadData();
    })

    function handleMouseOver(){
        d3.select(this).style('fill','#997a00').style('stroke-width', 2)
      }

    function handleMouseDown(){
        let that = this;
        setTimeout(function(){
            d3.select(that).transition().duration(500).style('fill','#ffcc00').style('stroke-width', 1)
        }, 700)
    }

    return(
        <svg className="svgContainer"></svg>
    );
}