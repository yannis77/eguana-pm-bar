/*add new rects start
    const newRects = canvas.selectAll()
		//load rectangle data
      .data(data.dataObject)
      .enter()
      .append('g')
      .attr('class', 'newRect')
      .attr('y', (d) => {const value = heightmax - ((d.y2 - startY) * rectHeight);return value;})
      .attr('x', (d) => {
        let value;
        if (thats.get('_width') > 1200) {
          value = thats.get('xOffset') +
          (d.starttime - thats.get('_lowestXValue')) /
          thats.get('_diffX') * thats.get('_width') * 0.9;
        } else if (thats.get('_width') > 800) {
          value = thats.get('xOffset') +
          (d.starttime - thats.get('_lowestXValue')) /
          thats.get('_diffX') * thats.get('_width') * 0.86;
        } else {
          value = thats.get('xOffset') +
          (d.starttime - thats.get('_lowestXValue')) /
          thats.get('_diffX') * thats.get('_width') * 0.8;
        }
        if (thats.get('protocol')) {
          value = thats.get('xOffset') +
          (d.starttime - thats.get('_lowestXValue')) /
          thats.get('_diffX') * thats.get('_width') * 0.85;
        }
        return value;
      })
	.append('rect')
      .attr('height', rectHeight/3)
      .attr('width', (d) => {
        let value;
        if (thats.get('_width') > 1200) {
          value = (d.endtime - d.starttime) / thats.get('_diffX') * thats.get('_width') * 0.9;
        } else if (thats.get('_width') > 800) {
          value = (d.endtime - d.starttime) / thats.get('_diffX') * thats.get('_width') * 0.86;
        } else {
          value = (d.endtime - d.starttime) / thats.get('_diffX') * thats.get('_width') * 0.8;
        }
        if (thats.get('protocol')) {
          value = (d.endtime - d.starttime) / thats.get('_diffX') * thats.get('_width') * 0.85;
        }
        return value;
      })
		//rounded corners...
      .attr('rx', 2)
		//corner y coordinate..
      .attr('y', (d) => {
        const value = (heightmax - ((d.y2 - startY) * (rectHeight/3)));
	        return value;
      })

		//corner x coordinate
      .attr('x', (d) => {
        let value;
        if (thats.get('_width') > 1200) {
          value = thats.get('xOffset') +
          (d.starttime - thats.get('_lowestXValue')) /
          thats.get('_diffX') * thats.get('_width') * 0.9;
        } else if (thats.get('_width') > 800) {
          value = thats.get('xOffset') +
          (d.starttime - thats.get('_lowestXValue')) /
          thats.get('_diffX') * thats.get('_width') * 0.86;
        } else {
          value = thats.get('xOffset') +
          (d.starttime - thats.get('_lowestXValue')) /
          thats.get('_diffX') * thats.get('_width') * 0.8;
        }
        if (thats.get('protocol')) {
          value = thats.get('xOffset') +
          (d.starttime - thats.get('_lowestXValue')) /
          thats.get('_diffX') * thats.get('_width') * 0.85;
        }
        return value;
      })
	 //style and color
      .attr('fill', d => '#FF4500')//d.color)
      .style({
        stroke: '#191970',
        'stroke-_width': '1px',
        opacity: '0.7',
      });


//add new rects end
*/
