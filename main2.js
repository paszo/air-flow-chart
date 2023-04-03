let data1 = {
    "10V": [
        [72.2, 449],
        [86.1, 399],
        [96.7, 368],
        [110,321],
        [132,251],
        [144, 205],
        [158,153],
        [169,113],
        [183, 52]
    ],
    "8V": [
        [56.4, 377],
        [76.5, 329],
        [102, 254],
        [120, 196],
        [128, 167],
        [138, 128],
        [146, 89.2],
        [158, 39.6]
    ],
    "7V": [
        [60.6,286],
        [89.1, 217],
        [107,164],
        [115,133],
        [123,102],
        [132,69],
        [142,32.2]
    ],
    "6V": [
        [52.9, 210],
        [69,177],
        [84,135],
        [98.1,95.6],
        [111,55.6],
        [120,24.1]
    ],
    "5V": [
        [42.8, 146],
        [55.7, 126],
        [67.6, 102],
        [79.8, 73],
        [91.9, 40.1],
        [101,14.2]
    ],
    "4V": [
        [30.3, 99.5],
        [46.8, 79.7],
        [63.2, 50.9],
        [79.5, 11.9]
    ],
    "3V": [
        [20.5, 61.2],
        [33.6, 49.1],
        [46.7, 30.9],
        [59.5,7.9]
    ],
    "2V": [
        [10.8, 30.6],
        [20.2, 25.4],
        [29.9, 16.9],
        [39.8, 4.7]
    ],
}
let data2 = {
    "10V": [
        [72.2, 82.8],
        [86.1, 82.2],
        [96.7, 83.8],
        [110, 83.5],
        [132,84.2],
        [144,83.8],
        [158,83.5],
        [169,83.9],
        [183,81.8]
    ],
    "8V": [
        [56.4, 57.9],
        [76.5, 60.4],
        [102,61.8],
        [120,60.6],
        [128,59.2],
        [138,57.8],
        [146,56.3],
        [158,53.6]
    ],
    "7V": [
        [60.6, 43.8],
        [89.1, 45.8],
        [107, 45],
        [115, 44.1],
        [123, 43],
        [132, 41.5],
        [142, 39.7]
    ],
    "6V": [
        [52.8, 29],
        [69, 29.8],
        [84, 29.6],
        [98.1, 28.7],
        [111, 27.5],
        [120, 26.2]
    ],
    "5V": [
        [42.8, 18.5],
        [55.7, 19],
        [67.6, 19],
        [79.8, 18.6],
        [91.9, 17.7],
        [101, 16.3]
    ],
    "4V": [
        [30.3, 11.2],
        [46.8, 11.6],
        [63.2, 11.4],
        [79.5, 10.5]
    ],
    "3V": [
        [20.5, 6.6],
        [33.6, 6.9],
        [46.7, 6.8],
        [59.5, 6.4]
        ],
    "2V": [
        [10.8, 4],
        [20.2, 4.1],
        [29.9, 4.1],
        [39.8, 4]
    ]
}
let containerId1 = 'first-container';
let containerId2 = 'second-container';
let options1 = {
    width: 600,
    height: 400,
    margin: {left: 100, right: 40, top: 80, bottom: 50},
    title: "Roof fan pressure / Air flow rate",
    xLabel: "Air flow rate (dm3/s)",
    xLabelUnit: "dm3/s",
    yLabel: "Roof fan pressure (Pa)",
    yLabelUnit: "Pa",
    colorRange: ["#862a19", "#b35326", "#797979", "#b35326", "#1c6bc4", "#286726", "#4a3222", "#c3c3c3"],
}
let options2 = {
    width: 600,
    height: 400,
    margin: {left: 100, right: 40, top: 80, bottom: 50},
    title: "Roof fan power consumption / Air flow rate",
    xLabel: "Air flow rate (dm3/s)",
    xLabelUnit: "dm3/s",
    yLabel: "Roof Fan Power Consumption (W)",
    yLabelUnit: "W",
    colorRange: ["#862a19", "#b35326", "#797979", "#b35326", "#1c6bc4", "#286726", "#4a3222", "#c3c3c3"],
}

function generateChart(container, data, options) {
    const width = options.width;
    const height = options.height;
    const margin = options.margin;
    const title = options.title;
    const xLabel = options.xLabel;
    const xLabelUnit = options.xLabelUnit;
    const yLabel = options.yLabel;
    const yLabelUnit = options.yLabelUnit;
    const colorRange = options.colorRange;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const formatNumbers = d3.format(".0f");
    let activeDataset = [];
    let maxXValue = 0;
    let maxYValue = 0;

    let keys = Object.keys(data);

    let svgContainer = d3.select(`#${container}`)
        .append("div")
        .attr("class", "svg-container")

    let dropdownContainer = d3.select(`#${container}`)
        .append("div")
        .attr("class", "dropdown-container")

    dropdownContainer
        .append("div")
        .append("label")
        .text("Voltage");

    let dropdown = dropdownContainer
        .append("div")
        .append("select")
        .on('change', function (event) {
            let selectedVoltage = event.target.value;
            update(selectedVoltage);
        })

    dropdown.selectAll("option")
        .data(keys)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d)


    let svg = svgContainer.append('svg')
        .attr("width", width)
        .attr("height", height);

    svg.append('text')
        .attr('class', 'title')
        .text(title)
        .attr('transform', `translate(${width / 2}, 40)`)
        .attr('text-anchor', 'middle')

    svg.append('text')
        .attr('class', 'y-axis-label')
        .text(yLabel)
        .attr('transform', `translate(50,${height / 2}) rotate(-90)`)
        .attr('text-anchor', 'middle')

    svg.append('text')
        .attr('class', 'x-axis-label')
        .text(xLabel)
        .attr('transform', `translate(${width / 2},${height - margin.bottom + 40})`)
        .attr('text-anchor', 'middle')

    let colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range(options.colorRange)

    let xScale = d3.scaleLinear()
        .range([0, innerWidth])

    let yScale = d3.scaleLinear()
        .range([innerHeight, 0])

    let xAxis = svg.append('g')
        .attr("class", "x-axis")
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)

    let yAxis = svg.append('g')
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    let chartGroup = svg.append('g')
        .attr("class", "chart")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    let myLine = d3.line()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]))
        .curve(d3.curveNatural)

    let horizontal = chartGroup.append('line')
        .attr('class', 'pointer-line-horizontal')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', 0)

    let vertical = chartGroup.append('line')
        .attr('class', 'pointer-line-vertical')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', 0)

    let pointer = chartGroup.append('circle')
        .attr('class', 'pointer-circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 3)
        .attr("display", "none")

    let pointerTextHorizontal = chartGroup.append('text')
        .attr("class", "pointer-text-horizontal")
        .text('')
        .attr('x', 0)
        .attr('y', 0)

    let pointerTextVertical = chartGroup.append('text')
        .attr("class", "pointer-text-vertical")
        .text('')
        .attr('x', 0)
        .attr('y', 0)

    const toolTipBox = chartGroup.append("rect")
        .attr('class', 'toolTipBox')
        .attr("opacity", 0)
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("transform", `translate(${0},${0})`)
        .on("mousemove", moveLines)
        .on("click", printCurve)
        .on("mouseout", clearLines)

    function moveLines(e) {
        let pointer = d3.pointer(event, this);
        let pointerX = pointer[0];
        let pointerY = pointer[1];
        let x0 = xScale.invert(pointerX);
        let y0 = yScale.invert(pointerY);

        svg.selectAll('line.pointer-line-horizontal')
            .attr("display", null)
            .attr("x1", xScale(0))
            .attr("x2", pointerX)
            .attr("y1", pointerY)
            .attr("y2", pointerY)
            .raise()

        svg.selectAll('line.pointer-line-vertical')
            .attr("display", null)
            .attr("x1", pointerX)
            .attr("x2", pointerX)
            .attr("y1", yScale(0))
            .attr("y2", pointerY)
            .raise()

        svg.selectAll('circle.pointer-circle')
            .attr("display", null)
            .attr("cx", pointerX)
            .attr("cy", pointerY)
            .raise()

        svg.selectAll('text.pointer-text-horizontal')
            .attr("display", null)
            .attr("x", pointerX + 5)
            .attr("y", yScale(0) - 5)
            .text(formatNumbers(x0))
            .raise()


        svg.selectAll('text.pointer-text-vertical')
            .attr("display", null)
            .attr("x", xScale(0) + 5)
            .attr("y", pointerY - 5)
            .text(formatNumbers(y0))
            .raise()

        // clear All Tooltips display to none

        chartGroup.selectAll('g.tooltip')
            .attr("display", "none");

        // check Tooltip
        let chosenPoint;
        activeDataset.forEach((d, i) => {
            if ((d[0] - x0) ** 2 + (d[1] - y0) ** 2 < 9) {
                chosenPoint = i;
            }
        })

        if (chosenPoint !== undefined) {
            chartGroup.selectAll(`g.t-${chosenPoint}`)
                .attr("display", null)
                .raise();
        }
    }

    function clearLines() {
        svg.selectAll('line.pointer-line-horizontal')
            .attr("display", "none");
        svg.selectAll('line.pointer-line-vertical')
            .attr("display", "none")
        svg.selectAll('circle.pointer-circle')
            .attr("display", "none")
        svg.selectAll('text.pointer-text-horizontal')
            .attr("display", "none")
        svg.selectAll('text.pointer-text-vertical')
            .attr("display", "none")


    }

    function printCurve() {
        let pointer = d3.pointer(event, this);
        let pointerX = pointer[0];
        let pointerY = pointer[1];
        let x0 = xScale.invert(pointerX);
        let y0 = yScale.invert(pointerY);


        // finding closer point

        let minDelta = Math.sqrt(innerWidth ** 2 + innerHeight ** 2);
        let closerPoint = 0;

        activeDataset.forEach((d, i) => {
            let delta = Math.sqrt((xScale(d[0]) - pointerX) ** 2 + (yScale(d[1]) - pointerY) ** 2);
            if (delta < minDelta) {
                minDelta = delta;
                closerPoint = i;
            }
        })

        drawLine(activeDataset[closerPoint]);
    }

    function drawLine(cp){

        let X = cp[0];
        let Y = cp[1];
        let factor = Y / X**2;
        let smallDataSet = [[0,0]];

        for(let i = 1; i <= 10; i++){
            let smallX = X/10 * i;
            smallDataSet.push([smallX, smallX**2 * factor])
        }

        // CLEAR OLD VALUE LINES

        svg.selectAll('line.value-line')
            .remove();

        // CURVE
        svg.selectAll('path.line-curve')
            .remove()

        chartGroup.datum(smallDataSet)
            .append('path')
            .attr("class", "line-curve")
            .attr("d", myLine)

        // VALUE LINES

        svg.selectAll('line.line-value')
            .remove()

        chartGroup.append('line')
            .attr('class', 'line-value')
            .attr('x1', xScale(0))
            .attr('x2', xScale(X))
            .attr('y1', yScale(Y))
            .attr('y2', yScale(Y))

        chartGroup.append('line')
            .attr('class', 'line-value')
            .attr('x1', xScale(X))
            .attr('x2', xScale(X))
            .attr('y1', yScale(0))
            .attr('y2', yScale(Y))

        // VALUE TEXTS

        svg.selectAll('text.text-value')
            .remove();

        chartGroup.append('text')
            .attr('class', 'text-value')
            .attr('x', xScale(0) + 5)
            .attr('y', yScale(Y) - 5)
            .text(Y);

        chartGroup.append('text')
            .attr('class', 'text-value')
            .attr('x', xScale(X) + 5)
            .attr('y', yScale(0) - 5)
            .text(X);

        // bring to top the lightblue lines and circle

        svg.selectAll('line.pointer-line-horizontal')
            .raise();

        svg.selectAll('line.pointer-line-vertical')
            .raise();

        svg.selectAll('circle.pointer-circle')
            .raise();

        svg.selectAll('text.pointer-text-horizontal')
            .raise();

        svg.selectAll('text.pointer-text-vertical')
            .raise();
    }

    function update(voltage){

        activeDataset = data[voltage];

        xScale
            .domain([0, d3.max(activeDataset, d => d[0])])
            .nice();

        yScale
            .domain([0, d3.max(activeDataset, d => d[1])])
            .nice();

        maxXValue = xScale.domain()[1];
        maxYValue = yScale.domain()[1];

        xAxis.call(d3.axisBottom(xScale).tickSize(-innerHeight));
        yAxis.call(d3.axisLeft(yScale).tickSize(-innerWidth));

        chartGroup.selectAll('path')
            .remove();

        svg.selectAll('line.line-value')
            .remove();

        svg.selectAll('text.text-value')
            .remove();

        let path = chartGroup.append('path')
            .datum(data[voltage])
            .attr("class", "line-connecting")
            .attr("d", myLine)
            .style("stroke", colorScale(voltage))

        chartGroup.selectAll('circle.path-circle')
            .remove();

        let circles = chartGroup.selectAll('circle.path-circle')
            .data(data[voltage])
            .enter()
            .append('circle')
            .attr("class", "path-circle")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 4)
            .attr("fill", colorScale(voltage))

        chartGroup.selectAll('g.tooltip')
            .remove();


        let toolTips = chartGroup.selectAll('g.tooltip')
            .data(data[voltage])
            .enter()
            .append('g')
            .attr('class', (d,i) => `tooltip t-${i}`)
            .attr('transform', d => {
                if(d[0] < maxXValue/2){
                    return `translate(${xScale(d[0])+5}, ${yScale(d[1])-25})`
                }else{
                    return `translate(${xScale(d[0])-75}, ${yScale(d[1])-25})`
                }
            })
            .attr("display", "none")

        chartGroup.selectAll('g.tooltip')
            .data(data[voltage])
            .append('rect')
            .attr('class', 'tooltip-rect')
            .attr("width", 70)
            .attr("height", 50)
            .attr("rx", 5)


        chartGroup.selectAll('g.tooltip')
            .data(data[voltage])
            .append('text')
            .attr('class', 'voltage-text')
            .attr('transform', 'translate(5,15)')
            .text(voltage)

        chartGroup.selectAll('g.tooltip')
            .data(data[voltage])
            .append('text')
            .attr('class', 'x-text')
            .text(d => `${d[0]} ${xLabelUnit}`)
            .attr('transform', 'translate(5,30)')


        chartGroup.selectAll('g.tooltip')
            .data(data[voltage])
            .append('text')
            .attr('class', 'y-text')
            .text(d => `${d[1]} ${yLabelUnit}`)
            .attr('transform', 'translate(5,45)')

        toolTipBox.raise();
    }

    update(keys[0]);
}

generateChart(containerId1, data1, options1);
generateChart(containerId2, data2, options2);




