import Ember from 'ember';
import moment from 'moment';
import d3 from 'd3';

//set to true to draw the activities 
//on top of the timesheet element.
//Set to false to draw on a new line under the timesheet,
//which is a little buggy.
const drawActivitiesInPlace=true;

//adds a new empty line under clicked line.
//i.e. if clicked is 5, all y's >= 5 are moved up one, resulting in an empty line. 
//does not redraw, do that externally
function new_line(that, y_clicked)
{
	if(drawActivitiesInPlace)
	{
		return;
	}
	//using this to prefix empty lines and check
	let emptyLineSign = " ";
	//sanity check
	if (!(that && that.dataObject.data))
	{
		return;
	}
	//check that the line is not already empty..
	//todo: improve character comparison and ideally use another way
	if(that.axisTickTransform[y_clicked-1]===emptyLineSign)
	{
		return;
	}

	//add an empty line hdr on Y axis
	that.axisTickTransform.splice(y_clicked-1, 0, emptyLineSign);

	//Update rect Y's if needed..
	for (var i=0;i< that.dataObject.data.length;i++)
	{
		if (that.dataObject.data[i].y>=y_clicked)
		{
			that.dataObject.data[i].y++;
		}
	}

}
//end function new_line

const {
  on,
  Component,
  inject: { service },
  observer,
  run: { once, schedule },
} = Ember;

/**
 * Process Management Chart
 *
 * Allows users to interact with the Process Management bar chart
 *
 * @module
 * @augments ember/Component
 * @augments moment
 * @augments d3
 */
export default Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /** @type {ember/Service} */
  session: service(),
  /** @type {ember/Service} */
  utils: service(),
  /** @type {ember/Service} */
  store: service(),
  /** @type {ember/Service} */
  i18n: service(),
  /** @type {ember/Service} */
  endpoint: service(),
  /** @type {ember/Service} */
  user: service(),
  /** @type {ember/Service} */
  resize: service(),
  /** @type {ember/Service} */
  ctx: service(),


  // -------------------------------------------------------------------------
  // Attributes
  /** @type {String} */
  tagName: 'eguana-pm-bar',


  // -------------------------------------------------------------------------
  // Actions

  actions: {
	//request and save the data , draw the chart..
    getBaseData() {
		var that=this;
	//.. via this get request
	  Ember.$.get("/basedata", function(data, status){
			  that.dataObject=data.dataObject;
			  that.axisTickTransform=data.axisTickTransform;
			  that._reDraw();
		  }
	  );		
    }
  },

  // -------------------------------------------------------------------------
  // Events
  /**
   * Initializes the component and draws the chart
   *
   * @function
   * @listens init
   * @listens afterRender
   * @returns {undefined}
   */
  _init: on('init', function _onInit() {
    schedule('afterRender', this, function _afterRender() {
      this.set('listenerFunction', this._reDraw.bind(this));
      this.get('resize').addListener(document.querySelector('eguana-process-management'), this.get('listenerFunction'));
      if (this.get('dataObject') && this.get('dataObject.data') && this.get('dataObject.data.length') > 0) {
        this._reDraw();
      }
    });
  }),

  /**
   * Removes eventlisteners when component is destroyed
   *
   * @function
   * @listens destroy
   * @returns {undefined}
   */
  willDestroyElement() {
    this.get('resize').removeListener(document.querySelector('eguana-process-management'), this.get('listenerFunction'));
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Value representing pixel offset in x direction
   *
   * @type {Integer}
   */
  xOffset: 40,
  /**
   * Value representing number of ticks on x-axis
   *
   * @type {Integer}
   */
  xTicks: 12,
  /**
   * Value representing multiplicator for available width
   * defining chart width
   * @type {Float}
   */
  widthFactor: 0.9,
  /**
   * Value representing multiplicator for available height
   * defining chart height
   *
   * @type {Float}
   */
  heightFactor: 0.7,
  /**
   * Value storing highest x value of all bars
   *
   * @type {Integer}
   */
  _highestXValue: 0,
  /**
   * Value storing lowest x value of all bars
   *
   * @type {Integer}
   */
  _lowestXValue: Infinity,
  /**
   * Value storing highest y value of all bars
   *
   * @type {Integer}
   */
  _highestYValue: 0,
  /**
   * Value storing lowest y value of all bars
   *
   * @type {Integer}
   */
  _lowestYValue: Infinity,
  /**
   * String defining type of x-axis labels
   *
   * @type {String}
   */
  xLabel: 'time',
  /**
   * String defining id of div-element
   *
   * @type {String}
   */
  name: 'process',
  /**
   * Array representing available colors in defined order
   *
   * @type {Array}
   */
  color: [
    'rgb(31, 119, 180)',
    '#FF7F0E',
    '#2CA02C',
    '#FF3234',
    '#9467BD',
    '#8C564B',
    '#E377C2',
    '#7F7F7F',
    'rgb(188, 189, 34)',
    'rgb(23, 190, 207)',
  ],
  colorIndex: 0,

  //maximum Y on activities. Use this if same for all timesheets. 
  maxY2:0,


  // -------------------------------------------------------------------------
  // Observers
  /**
   * Observes data changes and calls redraw method
   *
   * @function
   * @observes dataObject.[]
   * @observes axisTickTransform.[]
   * @returns {undefined}
   */
  _dataObserver: observer('dataObject.[]', 'axisTickTransform.[]', function _dataObserver() {
    once(this, '_reDraw');
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Draws the bar chart
   *
   * @function
   * @returns nothing
   */
  _reDraw() {
    const tipSelection = `div.${this.get('name')}`;
    const thisChart = this.element.querySelector('#time-management-chart');

    let xValues = 0;
    let yValues = 0;

    let startX = Infinity;
    let startY = Infinity;

    let heightmax = 0;

    // remove svg before drawing the new one
    let canvas;

    let diffY = 0;

    let rectHeight = 0;

    if (!this.get('heightFactor')) {
      this.set('heightFactor', 0.6);
    }

    if (!this.get('widthFactor')) {
      this.set('widthFactor', 0.75);
    }

    if (this.get('dataObject') && this.get('dataObject.data')) {
      // get highest and lowest x and y values
      this.get('dataObject.data').forEach((entry) => {
        xValues = Math.max(xValues, entry.endtime);
        startX = Math.min(startX, entry.starttime);

        yValues = Math.max(yValues, entry.y);
        startY = Math.min(startY, entry.y);
      });

      this.set('_highestXValue', xValues);
      this.set('_highestYValue', yValues);

      this.set('_lowestXValue', startX - 1);
      this.set('_lowestYValue', startY - 1);

      // calculate chart dimension depending on screen size
      this._calculateDimension();

      if (this.get('protocol')) {
        heightmax = this.get('_height') * 0.95;
      } else {
        heightmax = this.get('_height') * 0.9;
      }

      // remove svg before drawing the new one
      canvas = d3.select(thisChart).select('svg').remove();
      d3.select(tipSelection).remove();

      this.set('_diffX', this.get('_highestXValue') - this.get('_lowestXValue'));

      diffY = this.get('_highestYValue') - this.get('_lowestYValue');

      // calculate size of each box
      rectHeight = (0.8 * heightmax) / (diffY + 1);
      // draw the new chart
      canvas = this._drawBars(rectHeight, heightmax);
      // add axis to chart
      this._addAxis(canvas, rectHeight);
    }
  },

  /**
   * Calculates available height and width, depending on screen
   * sets properties _width and _height
   * @function
   * @returns nothing
   */
  _calculateDimension() {
    const height = window.innerHeight || this.element.clientHeight || document.body.clientHeight;
    this.set('_width', this.element.parentNode.parentNode.clientWidth * this.get('widthFactor'));
    this.set('_height', height * this.get('heightFactor'));
  },

  /**
   * Calculates height, length and position of each bar and draws them
   * Creates tooltip for bars
   * @function
   * @param {Number} rectHeight
   * @param {Number} heightmax
   * @returns nothing
   */
  _drawBars(rectHeight, heightmax) {
    const startY = this.get('_lowestYValue');
    const thisChart = this.element.querySelector('#time-management-chart');
    const axisTickTransformCount = [];
/* do this on a more convenient place below..
    for (let i = 1; i < this.get('axisTickTransform').length; i++) {
      axisTickTransformCount.push(i);
      if (this.get('_highestYValue') === i) {
        break;
      }
    }
*/
    const tip = d3.tip().attr('class', 'd3-tip').html((d) => {
      const startDate = moment.utc(d.starttime).format('DD.MM.YY');
      const endDate = moment.utc(d.endtime).format('DD.MM.YY');
      const start = moment.utc(d.starttime).format('HH:mm:ss');
      const end = moment.utc(d.endtime).format('HH:mm:ss');
      let tooltip = '';
      let duration = '';
      let hours;
      let minutes;
      let seconds;
      duration = moment.duration(d.endtime - d.starttime);
      hours = Math.floor(duration.asHours());
      minutes = duration.minutes();
      seconds = duration.seconds();
      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;
      if (seconds < 10) seconds = `0${seconds}`;

      tooltip += `${this.get('axisTickTransform')[d.y - 1]}`;
      tooltip += `<br>${this.get('i18n').t('calendar.startDate')}: ${startDate} - ${start}<br>${this.get('i18n').t('calendar.endDate')}:  ${endDate} - ${end}<br>`;
      tooltip += `${this.get('i18n').t('component.table.duration')}: ${hours}:${minutes}:${seconds}<br>`;
      if (d.pointname) {
        tooltip += `Punktnummer: ${d.pointname}`;
      }
      if (d.comment) {
        tooltip += `<br>${d.comment}`;
      }
      return tooltip;
    });
    tip.style({
      position: 'absolute',
      'text-align': 'left',
      width: 'auto',
      height: 'auto',
      padding: '2px',
      background: 'lightsteelblue',
      border: '0px',
      font: '12px sans-serif',
      'border-radius': '8px',
      'pointer-events': 'none',
      opacity: 0.8,
    });

    tip.attr('class', this.get('name'));

    const canvas = d3.select(thisChart)
      .append('svg')
      .attr('width', this._width)
      .attr('height', this._height)
      .append('g')
      .attr('transform', 'translate(40, -45)');
    canvas.call(tip);

    const tm = canvas.selectAll('.rect')
      .data(this.dataObject.data)
      .enter()
      .append('g')
      .attr('class', 'rect')
      .attr('y', (d) => {
        const value = heightmax - ((d.y - startY) * rectHeight);
        return value;
      })
      .attr('x', (d) => {
        let value;
        if (this.get('_width') > 1200) {
          value = this.get('xOffset') +
          (d.starttime - this.get('_lowestXValue')) /
          this.get('_diffX') * this.get('_width') * 0.9;
        } else if (this.get('_width') > 800) {
          value = this.get('xOffset') +
          (d.starttime - this.get('_lowestXValue')) /
          this.get('_diffX') * this.get('_width') * 0.86;
        } else {
          value = this.get('xOffset') +
          (d.starttime - this.get('_lowestXValue')) /
          this.get('_diffX') * this.get('_width') * 0.8;
        }
        if (this.get('protocol')) {
          value = this.get('xOffset') +
          (d.starttime - this.get('_lowestXValue')) /
          this.get('_diffX') * this.get('_width') * 0.85;
        }
        return value;
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', (d) => {
	var thats = this;
	//store all relevant variables to send with the request in the interval structure.
	var interval='{"data": [{"startTime":'+d.starttime+', "endTime":'+d.endtime+', "y":'+d.y+', "yOriginal":'+d.yOriginal+'}]}';
	//if this is not a process already detailed, or a detail..
	if(!d.detail && !d.hasChildren)
		  {
			new_line(this, d.y);
		    Ember.$.post("/basedata", interval,
				function(data, status){
				//if there are data to draw..
				if(data.data.length>0)
				{	
					if(data && data.maxY2>0)
					{
						thats.maxY2=data.maxY2;
					}

					//add new data
					thats.dataObject.data=thats.dataObject.data.concat(data.data);
					//flag the diagram as having detailed activities..
					d.hasChildren=true;
					//redraw the graph
					 thats._reDraw();
					}
				}//there are data to draw
			);
		  }//this is not a detailed graph

        const event = new CustomEvent('editEntry', { detail: { startTime: d.starttime } });
        thisChart.dispatchEvent(event);
      });

    tm.append('rect')
      .attr('height', (d) => 
		{//to allow different nr of subprocesses per process, use d.maxY2. If there is a common nr of processes, 
		//or want to speed up server return time in case of large nr of subprocesses, use this.maxY2. 
			let value;
			if(d.detail && this && d.maxY2>0)
			{
				value=rectHeight/d.maxY2;
			}
			else
			{
				value=rectHeight;
			}
			return value;
		}
		)//end .attr height

      .attr('width', (d) => {
        let value;
        if (this.get('_width') > 1200) {
          value = (d.endtime - d.starttime) / this.get('_diffX') * this.get('_width') * 0.9;
        } else if (this.get('_width') > 800) {
          value = (d.endtime - d.starttime) / this.get('_diffX') * this.get('_width') * 0.86;
        } else {
          value = (d.endtime - d.starttime) / this.get('_diffX') * this.get('_width') * 0.8;
        }
        if (this.get('protocol')) {
          value = (d.endtime - d.starttime) / this.get('_diffX') * this.get('_width') * 0.85;
        }
        return value;
      })
      .attr('rx', 2)
      .attr('y', (d) => {
        let value = (heightmax - ((d.y - startY) * rectHeight));
		//use d.maxY2 for flexibility, this.maxY2 for speed. See previous instance of maxY2
		  if(d.detail && (d.y2>1) && this && d.maxY2>0)
		  {
			value = value + ((d.y2-1)*(rectHeight/d.maxY2));
		  }
		  return value;
      })
		//corner x coordinate
      .attr('x', (d) => {
        let value;
        if (this.get('_width') > 1200) {
          value = this.get('xOffset') +
          (d.starttime - this.get('_lowestXValue')) /
          this.get('_diffX') * this.get('_width') * 0.9;
        } else if (this.get('_width') > 800) {
          value = this.get('xOffset') +
          (d.starttime - this.get('_lowestXValue')) /
          this.get('_diffX') * this.get('_width') * 0.86;
        } else {
          value = this.get('xOffset') +
          (d.starttime - this.get('_lowestXValue')) /
          this.get('_diffX') * this.get('_width') * 0.8;
        }
        if (this.get('protocol')) {
          value = this.get('xOffset') +
          (d.starttime - this.get('_lowestXValue')) /
          this.get('_diffX') * this.get('_width') * 0.85;
        }
        return value;
      })
      .attr('fill', d => d.color)
      .style({
        stroke: 'black',
        'stroke-_width': '1px',
        opacity: '0.7',
      });

//add lines between rectangle spaces
//calculate y axis here..
    for (let i = 1; i < this.get('axisTickTransform').length; i++) {
      axisTickTransformCount.push(i);
      if (this.get('_highestYValue') === i) {
        break;
      }
    }
    const tl = canvas.selectAll('.line')
      .data(axisTickTransformCount)
      .enter();

    tl.append('line')
      .attr('x1', this.get('xOffset'))
      .attr('x2', () => {
        let value = 0;
        if (this.get('_width') > 1200) {
          value = this.get('_width') * 0.9;
        } else if (this.get('_width') > 800) {
          value = this.get('_width') * 0.86;
        } else {
          value = this.get('_width') * 0.8;
        }
        if (this.get('protocol')) {
          value = this.get('_width') * 0.85;
        }
        return value + this.get('xOffset');
      })
      .attr('y1', (d) => {
        const value = (heightmax - ((d - startY) * rectHeight));
        return value;
      })
      .attr('y2', (d) => {
        const value = (heightmax - ((d - startY) * rectHeight));
        return value;
      })
      .style({
        stroke: '#7F7F7F',
        'stroke-width': '1px',
        opacity: '0.7',
      });
    return canvas;
  },

  /**
   * Adds axis to the chart
   *
   * @function
   * @param {Object} canvas
   * @param {Number} rectHeight
   * @returns nothing
   */
  _addAxis(canvas, rectHeight) {
    // domain: label from 0 to number of yvalues with an offset of 0.4,
    // in order to place label height-centered
    // range: from startpoint of chart to highest point of chart,
    // defined by boxheight*number of values + space between boxes
    const heightScale = d3.scale.linear()
      .domain([this.get('_lowestYValue') + 0.5, this.get('_highestYValue') + 0.5])
      .range([0, ((this.get('_highestYValue') - this.get('_lowestYValue')) * rectHeight)]);
    // domain: from 0 to number of xvalues with an offset of 0.5,
    // in order to place labels width-centered
    // range: from startpoint of chart to farest point of chart,
    // defined by number of drills*width of each box
    let widthScale;

    let numberY = this.get('axisTickTransform').length;

    // let transformArray = this.get('axisTickTransform');

    // draw axis
    let xValues;
    let numberX = this.get('xTicks');

    let timeformat = 'HH:mm';

    if (this.get('_highestXValue') - this.get('_lowestXValue') > 2 * 86400000) {
      numberX = parseInt((this.get('_highestXValue') - this.get('_lowestXValue')) / 86400000, 10);
      numberX = Math.min(numberX, 12);
      timeformat = 'DD.MM.YYYY';
    }

    if (this.get('xLabel') === 'time') {
      if (this.get('_width') > 1200) {
        widthScale = d3.time.scale.utc()
          .domain([this.get('_lowestXValue'), this.get('_highestXValue')])
          .range([0, (this.get('_width') * 0.9)]);
      } else if (this._width > 800) {
        widthScale = d3.time.scale.utc()
          .domain([this.get('_lowestXValue'), this.get('_highestXValue')])
          .range([0, (this.get('_width') * 0.86)]);
      } else {
        widthScale = d3.time.scale.utc()
          .domain([this.get('_lowestXValue'), this.get('_highestXValue')])
          .range([0, (this.get('_width') * 0.8)]);
      }
      if (this.get('protocol')) {
        widthScale = d3.time.scale.utc()
          .domain([this.get('_lowestXValue'), this.get('_highestXValue')])
          .range([0, (this.get('_width') * 0.85)]);
      }
      if (timeformat !== 'HH:mm') {
        xValues = d3.svg.axis()
          .scale(widthScale)
          .tickValues(widthScale.ticks(numberX).concat(widthScale.domain()[1]))
          .tickSize(6)
          .tickPadding(6)
          .tickFormat((d) => {
            const start = moment.utc(d).format(timeformat);
            return start;
          });
      } else {
        xValues = d3.svg.axis()
          .scale(widthScale)
          .tickSize(6)
          .tickPadding(6)
          .tickFormat((d) => {
            const start = moment.utc(d).format(timeformat);
            return start;
          });
      }
    } else {
      widthScale = d3.scale.linear()
        .domain([this.get('_lowestXValue'), this.get('_highestXValue')])
        .range([0, this.get('_highestXValue')]);

      xValues = d3.svg.axis()
        .scale(widthScale)
        .tickSize(5);
    }
    const yValues = d3.svg.axis()
      .scale(heightScale)
      .tickSize(0)
      .tickFormat((d) => {
        let h = '';
        let n = [];
        if (this.get('axisTickTransform').length > 0) {
          h = this.get('axisTickTransform')[d - 1];
          if (h !== undefined) {
            n = h.split(': ');
            h = n[0];
            return h;
          }
        }
        return d;
      })
      .orient('top');
    if (rectHeight > 30) {
      numberY = Math.floor(this.get('_height') / rectHeight);
      if (numberY > this.get('_highestYValue')) {
        numberY = this.get('_highestYValue');
      }
    }

    if (this.get('axisTickTransform').length > 0) {
      numberY = this.get('axisTickTransform').length;
    }

    if (numberY > this.get('_highestYValue') - this.get('_lowestYValue')) {
      numberY = this.get('_highestYValue') - this.get('_lowestYValue');
    }

    yValues.ticks(numberY);

    canvas.selectAll('a').remove();
    if (this.get('protocol')) {
      // draw x-axis
      canvas.append('a')
        .attr('class', 'x axis')
        .attr('transform', `translate(${this.get('xOffset')},${(this.get('_height') * 0.95)})`)
        .style('font-size', 8)
        .style('dominant-baseline', 'central')
        .style('text-decoration', 'none')
        .call(xValues)
        .selectAll('text')
        .attr('y', 10)
        .attr('x', 9)
        .attr('dy', '.35em')
        .attr('transform', 'rotate(45)')
        .style('text-anchor', 'start');
    } else {
      // draw x-axis
      const transform = 'rotate(45)';
      canvas.append('a')
        .attr('class', 'x axis')
        .attr('transform', `translate(${this.get('xOffset')},${(this.get('_height') * 0.9)})`)
        .style('font-size', 13)
        .style('dominant-baseline', 'central')
        .style('text-decoration', 'none')
        .call(xValues)
        .selectAll('text')
        .attr('y', 10)
        .attr('x', 9)
        .attr('dy', '.35em')
        .attr('transform', transform)
        .style('text-anchor', 'start');
    }

    if (this.get('protocol')) {
      // draw y-axis
      canvas.append('a')
        .attr('class', 'y axis')
        .attr('transform', `translate(${this.get('xOffset')}, ${(this.get('_height') * 0.95)}) rotate(270)`)
        .style('font-size', 8)
        .style('text-decoration', 'none')
        .call(yValues)
        .selectAll('text')
        .style('dominant-baseline', 'central')
        .style('text-anchor', 'end')
        .attr('y', 0)
        .attr('x', -5)
        .attr('transform', 'rotate(90)');
    } else {
      // draw y-axis
      canvas.append('a')
        .attr('class', 'y axis')
        .attr('transform', `translate(${this.get('xOffset')}, ${(this.get('_height') * 0.9)}) rotate(270)`)
        .style('font-size', 14)
        .style('text-decoration', 'none')
        .call(yValues)
        .selectAll('text')
        .style('dominant-baseline', 'central')
        .style('text-anchor', 'end')
        .attr('y', 0)
        .attr('x', -5)
        .attr('transform', 'rotate(90)');
    }
  },
});
