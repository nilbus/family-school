(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/themes/angular/app.js":[function(require,module,exports){
// Essentials
require('essential/js/main');

// Layout
require('layout/js/main');

// Sidebar
require('sidebar/js/main');

// Charts
require('charts/js/main');

// Messages
require('messages/js/main');

// Media
require('media/js/main');

// Material
require('material/js/main');

// Maps
window.initGoogleMaps = require('maps/js/google/main');

// CORE
require('./main');
},{"./main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/main.js","charts/js/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/main.js","essential/js/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/main.js","layout/js/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/main.js","maps/js/google/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/main.js","material/js/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/main.js","media/js/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/main.js","messages/js/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/messages/js/main.js","sidebar/js/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/main.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/easy-pie/_easy-pie.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('../lib/_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkEasyPie = function () {

        if (! this.length) return;

        if (!$.fn.easyPieChart) return;

        var color = config.skins[ skin ][ 'primary-color' ];
        if (this.is('.info')) color = colors[ 'info-color' ];
        if (this.is('.danger')) color = colors[ 'danger-color' ];
        if (this.is('.success')) color = colors[ 'success-color' ];
        if (this.is('.warning')) color = colors[ 'warning-color' ];
        if (this.is('.inverse')) color = colors[ 'inverse-color' ];

        this.easyPieChart({
            barColor: color,
            animate: ($('html').is('.ie') ? false : 3000),
            lineWidth: 4,
            size: 50
        });

    };

    $.each($('.easy-pie'), function (k, v) {
        $(this).tkEasyPie();
    });

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/easy-pie/main.js":[function(require,module,exports){
require('./_easy-pie');
},{"./_easy-pie":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/easy-pie/_easy-pie.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_autoupdate.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_live =
    {
        // chart data
        data: [],
        totalPoints: 300,
        updateInterval: 200,

        // we use an inline data source in the example, usually data would
        // be fetched from a server
        getRandomData: function () {
            if (this.data.length > 0)
                this.data = this.data.slice(1);

            // do a random walk
            while (this.data.length < this.totalPoints) {
                var prev = this.data.length > 0 ? this.data[ this.data.length - 1 ] : 50;
                var y = prev + Math.random() * 10 - 5;
                if (y < 0)
                    y = 0;
                if (y > 100)
                    y = 100;
                this.data.push(y);
            }

            // zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < this.data.length; ++ i)
                res.push([ i, this.data[ i ] ]);
            return res;
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                grow: {active: false},
                shadowSize: 0,
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 2,
                    steps: false
                }
            },
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: false,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "Value is : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            },
            yaxis: {
                min: 0,
                max: 100,
                tickColor: '#efefef'
            },
            xaxis: {
                show: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (!wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot(wrapper, [ this.getRandomData() ], this.options);
            setTimeout(this.update, charts.chart_live.updateInterval);
        },

        // update
        update: function () {
            charts.chart_live.plot.setData([ charts.chart_live.getRandomData() ]);
            charts.chart_live.plot.draw();

            setTimeout(charts.chart_live.update, charts.chart_live.updateInterval);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLive = function () {

        if (! this.length) return;

        charts.chart_live.init(this);

    };

    $('[data-toggle="flot-chart-live"]').tkFlotChartLive();

})(jQuery);
},{"./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_bars-ordered.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_ordered_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            bars: {
                show: true,
                barWidth: 0.2,
                fill: 1
            },
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: false,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {active: false}
            },
            legend: {
                position: "ne",
                backgroundColor: null,
                backgroundOpacity: 0,
                noColumns: 3
            },
            yaxis: {
                ticks: 3,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            //some data
            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
                d1.push([ i, parseInt(Math.random() * 30) ]);

            var d2 = [];
            for (var j = 0; j <= 10; j += 1)
                d2.push([ j, parseInt(Math.random() * 30) ]);

            var d3 = [];
            for (var k = 0; k <= 10; k += 1)
                d3.push([ k, parseInt(Math.random() * 30) ]);

            var ds = [];

            ds.push({
                label: "Data One",
                data: d1,
                bars: {order: 1}
            });
            ds.push({
                label: "Data Two",
                data: d2,
                bars: {order: 2}
            });
            ds.push({
                label: "Data Three",
                data: d3,
                bars: {order: 3}
            });

            this.data = ds;

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartOrderedBars = function () {

        if (! this.length) return;

        charts.chart_ordered_bars.init(this);

    };

    $('[data-toggle="flot-chart-ordered-bars"]').tkFlotChartOrderedBars();

})(jQuery);
},{"./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_bars-stacked.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_stacked_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: true,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {active: false},
                stack: 0,
                lines: {show: false, fill: true, steps: false},
                bars: {show: true, barWidth: 0.5, fill: 1}
            },
            yaxis: {
                ticks: 3,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 11,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            legend: {
                position: "ne",
                backgroundColor: null,
                backgroundOpacity: 0,
                noColumns: 3
            },
            colors: [],
            shadowSize: 1,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
                d1.push([ i, parseInt(Math.random() * 30) ]);

            var d2 = [];
            for (var j = 0; j <= 10; j += 1)
                d2.push([ j, parseInt(Math.random() * 20) ]);

            var d3 = [];
            for (var k = 0; k <= 10; k += 1)
                d3.push([ k, parseInt(Math.random() * 20) ]);

            this.data = [];

            this.data.push({
                label: "Data One",
                data: d1
            });
            this.data.push({
                label: "Data Two",
                data: d2
            });
            this.data.push({
                label: "Data Tree",
                data: d3
            });

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartStackedBars = function () {

        if (! this.length) return;

        charts.chart_stacked_bars.init(this);

    };

    $('[data-toggle="flot-chart-stacked-bars"]').tkFlotChartStackedBars();

})(jQuery);
},{"./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_donut.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_donut =
    {
        // chart data
        data: [
            {label: "USA", data: 38},
            {label: "Brazil", data: 23},
            {label: "India", data: 15},
            {label: "Turkey", data: 9},
            {label: "France", data: 7},
            {label: "China", data: 5},
            {label: "Germany", data: 3}
        ],

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.4,
                    highlight: {
                        opacity: 0.1
                    },
                    radius: 1,
                    stroke: {
                        color: '#fff',
                        width: 8
                    },
                    startAngle: 2,
                    combine: {
                        color: '#EEE',
                        threshold: 0.05
                    },
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function (label, series) {
                            return '<div class="label label-default">' + label + '&nbsp;' + Math.round(series.percent) + '%</div>';
                        }
                    }
                },
                grow: {active: false}
            },
            legend: {show: false},
            grid: {
                hoverable: true,
                clickable: true,
                backgroundColor: {}
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.1" + "%",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartDonut = function () {

        if (! this.length) return;

        charts.chart_donut.init(this);

    };

    $('[data-toggle="flot-chart-donut"]').tkFlotChartDonut();

})(jQuery);
},{"./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js":[function(require,module,exports){
var skin = require('../lib/_skin')();

var charts =
{
    // utility class
    utility: {
        chartColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ], colors[ 'danger-color' ], colors[ 'success-color' ], colors[ 'warning-color' ] ],
        chartBackgroundColors: [ "rgba(255,255,255,0)", "rgba(255,255,255,0)" ],

        applyStyle: function (that) {
            that.options.colors = charts.utility.chartColors;
            that.options.grid.backgroundColor = { colors: charts.utility.chartBackgroundColors };
            that.options.grid.borderColor = charts.utility.chartColors[ 0 ];
            that.options.grid.color = charts.utility.chartColors[ 0 ];
        },

        // generate random number for charts
        randNum: function () {
            return (Math.floor(Math.random() * (1 + 40 - 20)) ) + 20;
        }
    }

};

module.exports = charts;
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_horizontal.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_horizontal_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                color: "#dedede",
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                bars: {
                    show: true,
                    horizontal: true,
                    barWidth: 0.2,
                    fill: 1
                }
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickColor: 'transparent',
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0
            },
            colors: [ config.skins[ skin ][ 'primary-color' ] ],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (!wrapper.length) return;

            // apply styling
            // charts.utility.applyStyle(this);

            var d1 = [];
            for (var i = 1; i <= 5; i += 1)
                d1.push([ parseInt(Math.random() * 30), i ]);

            this.data = [];

            this.data.push({
                label: "Sales Volume",
                data: d1,
                bars: {
                    horizontal: true,
                    show: true,
                    barWidth: 0.5
                }
            });

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartHorizontalBars = function () {

        if (! this.length) return;

        charts.chart_horizontal_bars.init(this);

    };

    $('[data-toggle="flot-chart-horizontal-bars"]').tkFlotChartHorizontalBars();

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js","./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_line.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_lines_fill_nopoints_3 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [  colors[ 'success-color' ]],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 2,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (!wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 80 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 70 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 60 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 100 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLines3 = function () {

        if (! this.length) return;

        charts.chart_lines_fill_nopoints_3.init(this);

    };

    $('[data-toggle="flot-chart-lines-3"]').tkFlotChartLines3();

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js","./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_line_fill_nopoints.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_lines_fill_nopoints =
    {
        // chart data
        data: {
            d1: [],
            d2: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {
                    active: false
                },
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 2,
                    steps: false
                },
                points: {
                    show: false
                }
            },
            legend: {
                position: "nw",
                noColumns: 2
            },
            yaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 11,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            colors: [],
            shadowSize: 1,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 9 + charts.utility.randNum() ], [ 4, 12 + charts.utility.randNum() ], [ 5, 15 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 21 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 21 + charts.utility.randNum() ], [ 11, 24 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 27 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 45 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 38 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 60 + charts.utility.randNum() ] ];
            this.data.d2 = [ [ 1, charts.utility.randNum() - 5 ], [ 2, charts.utility.randNum() - 4 ], [ 3, charts.utility.randNum() - 4 ], [ 4, charts.utility.randNum() ], [ 5, 4 + charts.utility.randNum() ], [ 6, 4 + charts.utility.randNum() ], [ 7, 5 + charts.utility.randNum() ], [ 8, 5 + charts.utility.randNum() ], [ 9, 6 + charts.utility.randNum() ], [ 10, 6 + charts.utility.randNum() ], [ 11, 6 + charts.utility.randNum() ], [ 12, 2 + charts.utility.randNum() ], [ 13, 3 + charts.utility.randNum() ], [ 14, 4 + charts.utility.randNum() ], [ 15, 4 + charts.utility.randNum() ], [ 16, 4 + charts.utility.randNum() ], [ 17, 5 + charts.utility.randNum() ], [ 18, 5 + charts.utility.randNum() ], [ 19, 2 + charts.utility.randNum() ], [ 20, 2 + charts.utility.randNum() ], [ 21, 3 + charts.utility.randNum() ], [ 22, 3 + charts.utility.randNum() ], [ 23, 3 + charts.utility.randNum() ], [ 24, 2 + charts.utility.randNum() ], [ 25, 4 + charts.utility.randNum() ], [ 26, 4 + charts.utility.randNum() ], [ 27, 5 + charts.utility.randNum() ], [ 28, 2 + charts.utility.randNum() ], [ 29, 2 + charts.utility.randNum() ], [ 30, 3 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Visits",
                    data: this.data.d1
                },
                {
                    label: "Unique Visits",
                    data: this.data.d2
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLines1 = function () {

        if (! this.length) return;

        charts.chart_lines_fill_nopoints.init(this);

    };

    $('[data-toggle="flot-chart-lines-1"]').tkFlotChartLines1();

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js","./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_line_fill_nopoints_2.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_lines_fill_nopoints_2 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ config.skins[ skin ][ 'primary-color' ] ],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 5,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 80 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 70 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 60 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 100 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLines2 = function () {

        if (! this.length) return;

        charts.chart_lines_fill_nopoints_2.init(this);

    };

    $('[data-toggle="flot-chart-lines-2"]').tkFlotChartLines2();

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js","./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_mixed.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_mixed_1 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ "#dedede", config.skins[ skin ][ 'primary-color' ] ],
            grid: {
                color: "#dedede",
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 2,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1,
                    bars: {show: true, fill: 1, barWidth: 0.75, align: "center"}
                },
                {
                    data: this.data.d1,
                    lines: {show: true, fill: false},
                    points: {
                        show: true,
                        radius: 5,
                        symbol: "circle",
                        fill: true,
                        fillColor: config.skins[ skin ][ 'primary-color' ],
                        borderColor: "#fff"
                    }
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartMixed = function () {

        if (! this.length) return;

        charts.chart_mixed_1.init(this);

    };

    $('[data-toggle="flot-chart-mixed"]').tkFlotChartMixed();

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js","./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_pie.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_pie =
    {
        // chart data
        data: [
            {label: "USA", data: 38},
            {label: "Brazil", data: 23},
            {label: "India", data: 15},
            {label: "Turkey", data: 9},
            {label: "France", data: 7},
            {label: "China", data: 5},
            {label: "Germany", data: 3}
        ],

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                pie: {
                    show: true,
                    highlight: {
                        opacity: 0.1
                    },
                    radius: 1,
                    stroke: {
                        color: '#fff',
                        width: 2
                    },
                    startAngle: 2,
                    combine: {
                        color: '#353535',
                        threshold: 0.05
                    },
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function (label, series) {
                            return '<div class="label label-default">' + label + '&nbsp;' + Math.round(series.percent) + '%</div>';
                        }
                    }
                },
                grow: {active: false}
            },
            colors: [],
            legend: {show: false},
            grid: {
                hoverable: true,
                clickable: true,
                backgroundColor: {}
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.1" + "%",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartPie = function () {

        if (! this.length) return;

        charts.chart_pie.init(this);

    };

    $('[data-toggle="flot-chart-pie"]').tkFlotChartPie();

})(jQuery);
},{"./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_simple.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_simple =
    {
        // data
        data: {
            sin: [],
            cos: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ] ],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 4,
                    steps: false
                },
                points: {
                    show: true,
                    radius: 5,
                    symbol: "circle",
                    fill: true,
                    borderColor: "#fff"
                }
            },
            legend: {position: "se", backgroundColor: null, backgroundOpacity: 0, noColumns: 2},
            shadowSize: 0,
            yaxis: {ticks: 3},
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            tooltip: true, //activate tooltip
            tooltipOpts: {
                content: "%s : %y.3",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            if (this.plot === null) {
                for (var i = 0; i < 14; i += 0.5) {
                    this.data.sin.push([ i, Math.sin(i) ]);
                    this.data.cos.push([ i, Math.cos(i) ]);
                }
            }
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Sin",
                    data: this.data.sin,
                    lines: {fillColor: colors[ 'default-color' ]},
                    points: {fillColor: "#fff"}
                },
                {
                    label: "Cos",
                    data: this.data.cos,
                    lines: {fillColor: "#444"},
                    points: {fillColor: "#fff"}
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartSimple = function () {

        if (! this.length) return;

        charts.chart_simple.init(this);

    };

    $('[data-toggle="flot-chart-simple"]').tkFlotChartSimple();

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js","./_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/main.js":[function(require,module,exports){
require('./_simple');
require('./_mixed');
require('./_line');
require('./_horizontal');
require('./_line_fill_nopoints');
require('./_line_fill_nopoints_2');
require('./_bars-ordered');
require('./_donut');
require('./_bars-stacked');
require('./_pie');
require('./_autoupdate');
},{"./_autoupdate":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_autoupdate.js","./_bars-ordered":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_bars-ordered.js","./_bars-stacked":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_bars-stacked.js","./_donut":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_donut.js","./_horizontal":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_horizontal.js","./_line":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_line.js","./_line_fill_nopoints":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_line_fill_nopoints.js","./_line_fill_nopoints_2":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_line_fill_nopoints_2.js","./_mixed":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_mixed.js","./_pie":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_pie.js","./_simple":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_simple.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/main.js":[function(require,module,exports){
require('./morris/main');
require('./sparkline/main');
require('./flot/main');
require('./easy-pie/main');

},{"./easy-pie/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/easy-pie/main.js","./flot/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/main.js","./morris/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/main.js","./sparkline/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/sparkline/main.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/_area.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartArea = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Area({
            lineColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
            pointFillColors: config.skins[ skin ][ 'primary-color' ],
            fillOpacity: '0.3',
            element: this.attr('id'),
            data: [
                {y: '1.1.', a: 30, b: 90},
                {y: '2.1.', a: 35, b: 65},
                {y: '3.1.', a: 50, b: 40},
                {y: '4.1.', a: 75, b: 65},
                {y: '5.1.', a: 50, b: 40},
                {y: '6.1.', a: 75, b: 65},
                {y: '7.1.', a: 60, b: 90}
            ],
            xkey: 'y',
            ykeys: [ 'a' ],
            labels: [ 'Series A' ],
            gridTextColor: colors[ 'default-color' ],
            gridTextWeight: 'bold',
            resize: true
        });

    };

    $(function () {

        $('[data-toggle="morris-chart-area"]').tkMorrisChartArea();

        $('[data-skin]').on('click', function () {
            $('[data-toggle="morris-chart-area"]').tkMorrisChartArea();
        });

    });

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/_bar.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartBar = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Bar({
            barColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ], colors[ 'danger-color' ] ],
            element: this.attr('id'),
            data: [
                {y: '2006', a: 100, b: 90, c: 40},
                {y: '2007', a: 75, b: 65, c: 100},
                {y: '2008', a: 50, b: 40, c: 30},
                {y: '2009', a: 75, b: 65, c: 85},
                {y: '2010', a: 50, b: 40, c: 45},
                {y: '2011', a: 75, b: 65, c: 90},
                {y: '2012', a: 100, b: 90, c: 80}
            ],
            gridTextColor: colors[ 'default-color' ],
            gridTextWeight: 'bold',
            resize: true,
            xkey: 'y',
            ykeys: [ 'a', 'b', 'c' ],
            labels: [ 'Series A', 'Series B', 'Series C' ]
        });
    };

    $(function () {

        $('[data-toggle="morris-chart-bar"]').tkMorrisChartBar();

        $('[data-skin]').on('click', function(){

            $('[data-toggle="morris-chart-bar"]').tkMorrisChartBar();

        });

    });

})(jQuery);

},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/_donut.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartDonut = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Donut({
            element: this.attr('id'),
            colors: [ colors[ 'danger-color' ], config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ] ],
            data: [
                {label: "Download Sales", value: 12},
                {label: "In-Store Sales", value: 30},
                {label: "Mail-Order Sales", value: 20}
            ]
        });

    };

    $(function () {

        $('[data-toggle="morris-chart-donut"]').tkMorrisChartDonut();

        $('[data-skin]').on('click', function(){

            $('[data-toggle="morris-chart-donut"]').tkMorrisChartDonut();

        });

    });

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/_line.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartLine = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Line({
            lineColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
            pointFillColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
            pointStrokeColors: [ '#ffffff', '#ffffff' ],
            gridTextColor: colors[ 'default-color' ],
            gridTextWeight: 'bold',

            // ID of the element in which to draw the chart.
            element: this.attr('id'),
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: [
                {date: '2014-02', a: 2000, b: 2400},
                {date: '2014-03', a: 1200, b: 2500},
                {date: '2014-04', a: 3200, b: 2000},
                {date: '2014-05', a: 1600, b: 1440},
                {date: '2014-06', a: 1290, b: 2830},
                {date: '2014-07', a: 1930, b: 1200},
                {date: '2014-08', a: 2120, b: 3000}
            ],
            // The name of the data record attribute that contains x-values.
            xkey: 'date',
            // A list of names of data record attributes that contain y-values.
            ykeys: [ 'a', 'b' ],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels: [ 'Series A', 'Series B' ],
            resize: true
        });

    };

    $(function () {

        $('[data-toggle="morris-chart-line"]').tkMorrisChartLine();

        $('[data-skin]').on('click', function(){

            $('[data-toggle="morris-chart-line"]').tkMorrisChartLine();

        });

    });

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/main.js":[function(require,module,exports){
require('./_area');
require('./_bar');
require('./_donut');
require('./_line');
},{"./_area":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/_area.js","./_bar":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/_bar.js","./_donut":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/_donut.js","./_line":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/morris/_line.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/sparkline/_sparkline.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('../lib/_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSparkLine = function () {

        if (! this.length) return;

        this.sparkline(
            this.data('data') || "html", {
                type: 'line',
                height: '24',
                width: '100%',
                spotRadius: '3.2',
                spotColor: config.skins[ skin ][ 'primary-color' ],
                minSpotColor: config.skins[ skin ][ 'primary-color' ],
                maxSpotColor: config.skins[ skin ][ 'primary-color' ],
                highlightSpotColor: colors[ 'danger-color' ],
                lineWidth: '2',
                lineColor: config.skins[ skin ][ 'primary-color' ],
                fillColor: colors[ 'body-bg' ]
            }
        );

    };

    $.fn.tkSparkBar = function () {

        if (! this.length) return;

        this.text(this.find('span').text());

        this.sparkline(
            this.data('data') || "html", {
                type: 'bar',
                height: '70',
                barWidth: 10,
                barSpacing: 8,
                zeroAxis: false,
                stackedBarColor: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-light-color' ] ],
                colorMap: this.data('colors') ? [ config.skins[ skin ][ 'primary-color' ], colors[ 'success-color' ], colors[ 'danger-color' ], colors[ 'default-light-color' ] ] : [],
                enableTagOptions: true
            }
        );

    };

    $(".sparkline-bar").each(function () {
        $(this).tkSparkBar();
    });

    $(".sparkline-line").each(function () {
        $(this).tkSparkLine();
    });

})(jQuery);
},{"../lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/sparkline/main.js":[function(require,module,exports){
require('./_sparkline');

},{"./_sparkline":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/sparkline/_sparkline.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_bootstrap-carousel.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCarousel = function () {

        if (! this.length) return;

        this.carousel();

        this.find('[data-slide]').click(function (e) {
            e.preventDefault();
        });

    };

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_bootstrap-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCollapse = function () {

        if (! this.length) return;

        var target = this.attr('href') || this.attr('target');
        if (! target) return;

        this.click(function(e){
            e.preventDefault();
        });

        $(target).collapse({toggle: false});

    };

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_bootstrap-modal.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkModal = function () {

        if (! this.length) return;

        var target = this.attr('href') || this.attr('target');
        if (! target) return;

        this.click(function (e) {
            e.preventDefault();
        });

        $(target).modal({show: false});

    };

    /**
     * Modal creator for the demo page.
     * Allows to explore different modal types.
     * For demo purposes only.
     */

    // Process the modal via Handlebars templates
    var modal = function (options) {
        var source = $("#" + options.template).html();
        var template = Handlebars.compile(source);
        return template(options);
    };

    var randomId = function () {
        /** @return String */
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    $.fn.tkModalDemo = function () {

        if (! this.length) return;

        var targetId = this.attr('href') || this.attr('target'),
            target = $(targetId);

        if (! targetId) {
            targetId = randomId();
            this.attr('data-target', '#' + targetId);
        }

        targetId.replace('#', '');

        if (! target.length) {
            target = $(modal({
                id: targetId,
                template: this.data('template') || 'tk-modal-demo',
                modalOptions: this.data('modalOptions') || '',
                dialogOptions: this.data('dialogOptions') || '',
                contentOptions: this.data('contentOptions') || ''
            }));
            $('body').append(target);
            target.modal({show: false});
        }

        this.click(function (e) {
            e.preventDefault();
            target.modal('toggle');
        });

    };

    $('[data-toggle="tk-modal-demo"]').each(function () {
        $(this).tkModalDemo();
    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_bootstrap-switch.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('[data-toggle="switch-checkbox"]').each(function () {

        $(this).bootstrapSwitch({
            offColor: 'danger'
        });

    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_check-all.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCheckAll = function(){

        if (! this.length) return;

        this.on('click', function () {
            $($(this).data('target')).find(':checkbox').prop('checked', this.checked);
        });

    };

    // Check All Checkboxes
    $('[data-toggle="check-all"]').tkCheckAll();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_cover.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
     * images to fit into a certain area.
     *
     * @param {Number} srcWidth Source area width
     * @param {Number} srcHeight Source area height
     * @param {Number} maxWidth Fittable area maximum available width
     * @param {Number} maxHeight Fittable area maximum available height
     * @return {Object} { width, heigth }
     */
    var aspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {

        var wRatio = maxWidth / srcWidth,
            hRatio = maxHeight / srcHeight,
            width = srcWidth,
            height = srcHeight;

        if (srcWidth / maxWidth < srcHeight / maxHeight) {
            width = maxWidth;
            height = srcHeight * wRatio;
        } else {
            width = srcWidth * hRatio;
            height = maxHeight;
        }

        return {width: width, height: height};
    };

    $.fn.tkCover = function () {

        if (! this.length) return;

        this.filter(':visible').not('[class*="height"]').each(function () {
            var t = $(this),
                i = t.find('img:first');

            if (i.length) {
                $.loadImage(i.attr('src')).done(function (img) {
                    t.height(i.height());
                    $('.overlay-full', t).innerHeight(i.height());
                    $(document).trigger('domChanged');
                });
            }
            else {
                i = t.find('.img:first');
                t.height(i.height());
                $('.overlay-full', t).innerHeight(i.height());
                $(document).trigger('domChanged');
            }
        });

        this.filter(':visible').filter('[class*="height"]').each(function () {
            var t = $(this),
                img = t.find('img') || t.find('.img');

            img.each(function () {
                var i = $(this);
                if (i.data('autoSize') === false) {
                    return true;
                }
                if (i.is('img')) {
                    $.loadImage(i.attr('src')).done(function (img) {
                        i.removeAttr('style');
                        i.css(aspectRatioFit(i.width(), i.height(), t.width(), t.height()));
                    });
                }
                else {
                    i.removeAttr('style');
                    i.css(aspectRatioFit(i.width(), i.height(), t.width(), t.height()));
                }
            });
        });

    };

    function height() {

        $('.cover.overlay').each(function () {
            $(this).tkCover();
        });

    }

    $(document).ready(height);
    $(window).on('load', height);

    var t;
    $(window).on("debouncedresize", function () {
        clearTimeout(t);
        t = setTimeout(height, 200);
    });

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_datepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDatePicker = function () {

        if (! this.length) return;

        if (typeof $.fn.datepicker != 'undefined') {

            this.datepicker();

        }

    };

    $('.datepicker').tkDatePicker();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_daterangepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkDaterangepickerReport = function () {
        var e = this;
        this.daterangepicker(
            {
                ranges: {
                    'Today': [ moment(), moment() ],
                    'Yesterday': [ moment().subtract('days', 1), moment().subtract('days', 1) ],
                    'Last 7 Days': [ moment().subtract('days', 6), moment() ],
                    'Last 30 Days': [ moment().subtract('days', 29), moment() ],
                    'This Month': [ moment().startOf('month'), moment().endOf('month') ],
                    'Last Month': [ moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month') ]
                },
                startDate: moment().subtract('days', 29),
                endDate: moment()
            },
            function (start, end) {
                var output = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');
                e.find('span').html(output);
            }
        );
    };

    $.fn.tkDaterangepickerReservation = function () {
        this.daterangepicker({
            timePicker: true,
            timePickerIncrement: 30,
            format: 'MM/DD/YYYY h:mm A'
        });
    };

    $('.daterangepicker-report').tkDaterangepickerReport();

    $('.daterangepicker-reservation').tkDaterangepickerReservation();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_expandable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkExpandable = function () {

        if (! this.length) return;

        this.find('.expandable-content').append('<div class="expandable-indicator"><i></i></div>');

    };

    $('.expandable').each(function () {
        $(this).tkExpandable();
    });

    $('body').on('click', '.expandable-indicator', function(){
        $(this).closest('.expandable').toggleClass('expandable-open');
    });

    $('body').on('click', '.expandable-trigger:not(.expandable-open)', function(){
        $(this).addClass('expandable-open');
    });

}(jQuery));
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_iframe.js":[function(require,module,exports){
(function () {
    "use strict";

    // if we're inside an iframe, reload without iframe
    if (window.location != window.parent.location)
        top.location.href = document.location.href;

})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_minicolors.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkMiniColors = function () {

        if (! this.length) return;

        if (typeof $.fn.minicolors != 'undefined') {

            this.minicolors({
                control: this.attr('data-control') || 'hue',
                defaultValue: this.attr('data-defaultValue') || '',
                inline: this.attr('data-inline') === 'true',
                letterCase: this.attr('data-letterCase') || 'lowercase',
                opacity: this.attr('data-opacity'),
                position: this.attr('data-position') || 'bottom left',
                change: function (hex, opacity) {
                    if (! hex) return;
                    if (opacity) hex += ', ' + opacity;
                    if (typeof console === 'object') {
                        console.log(hex);
                    }
                },
                theme: 'bootstrap'
            });

        }

    };

    $('.minicolors').each(function () {

        $(this).tkMiniColors();

    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_nestable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkNestable = function () {

        if (! this.length) return;

        if (typeof $.fn.nestable != 'undefined') {

            this.nestable({
                rootClass: 'nestable',
                listNodeName: 'ul',
                listClass: 'nestable-list',
                itemClass: 'nestable-item',
                dragClass: 'nestable-drag',
                handleClass: 'nestable-handle',
                collapsedClass: 'nestable-collapsed',
                placeClass: 'nestable-placeholder',
                emptyClass: 'nestable-empty'
            });

        }

    };

    $('.nestable').tkNestable();

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_panel-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var randomId = function() {
        /** @return String */
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkPanelCollapse = function () {

        if (! this.length) return;

        var body = $('.panel-body', this),
            id = body.attr('id') || randomId(),
            collapse = $('<div/>');

        collapse
            .attr('id', id)
            .addClass('collapse' + (this.data('open') ? ' in' : ''))
            .append(body.clone());

        body.remove();

        $(this).append(collapse);

        $('.panel-collapse-trigger', this)
            .attr('data-toggle', 'collapse' )
            .attr('data-target', '#' + id)
            .collapse({ trigger: false });

    };

    $('[data-toggle="panel-collapse"]').each(function(){
        $(this).tkPanelCollapse();
    });

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_progress-bars.js":[function(require,module,exports){
(function ($) {

    // Progress Bar Animation
    $('.progress-bar').each(function () {
        $(this).width($(this).attr('aria-valuenow') + '%');
    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_select2.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2 = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            var t = this,
                options = {
                    allowClear: t.data('allowClear')
                };

            if (t.is('button')) return true;
            if (t.is('input[type="button"]')) return true;

            if (t.is('[data-toggle="select2-tags"]')) {
                options.tags = t.data('tags').split(',');
            }

            t.select2(options);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Enable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $($(this).data('target')).select2("enable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Disable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $(this.data('target')).select2("disable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Flags = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            // templating
            var format = function (state) {
                if (! state.id) return state.text;
                return "<img class='flag' src='http://select2.github.io/select2/images/flags/" + state.id.toLowerCase() + ".png'/>" + state.text;
            };

            this.select2({
                formatResult: format,
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });

        }

    };

    $('[data-toggle*="select2"]').each(function() {

        $(this).tkSelect2();

    });

    $('[data-toggle="select2-enable"]').tkSelect2Enable();

    $('[data-toggle="select2-disable"]').tkSelect2Disable();

    $("#select2_7").tkSelect2Flags();

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_selectpicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelectPicker = function () {

        if (! this.length) return;

        if (typeof $.fn.selectpicker != 'undefined') {

            this.selectpicker({
                width: this.data('width') || '100%'
            });

        }

    };

    $(function () {

        $('.selectpicker').each(function () {
           $(this).tkSelectPicker();
        });

    });

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_show-hover.js":[function(require,module,exports){
(function ($) {

    var showHover = function () {
        $('[data-show-hover]').hide().each(function () {
            var self = $(this),
                parent = $(this).data('showHover');

            self.closest(parent).on('mouseover', function (e) {
                e.stopPropagation();
                self.show();
            }).on('mouseout', function () {
                self.hide();
            });
        });
    };

    showHover();

    window.showHover = showHover;

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_skin.js":[function(require,module,exports){
module.exports=require("/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js")
},{"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_slider.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var bars = function(el){
        $('.slider-handle', el).html('<i class="fa fa-bars fa-rotate-90"></i>');
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlider = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider();

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderFormatter = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider({
                formatter: function (value) {
                    return 'Current value: ' + value;
                }
            });

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderUpdate = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.on("slide", function (slideEvt) {
                $(this.attr('data-on-slide')).text(slideEvt.value);
            });

            bars(this);

        }

    };

    $('[data-slider="default"]').tkSlider();

    $('[data-slider="formatter"]').tkSliderFormatter();

    $('[data-on-slide]').tkSliderUpdate();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_summernote.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSummernote = function () {

        if (! this.length) return;

        if (typeof $.fn.summernote != 'undefined') {

            this.summernote({
                height: 300
            });

        }

    };

    $(function () {

        $('.summernote').each(function () {
           $(this).tkSummernote();
        });

    });

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_tables.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDataTable = function(){

        if (! this.length) return;

        if (typeof $.fn.dataTable != 'undefined') {

            this.dataTable();

        }

    };

    $('[data-toggle="data-table"]').tkDataTable();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_tabs.js":[function(require,module,exports){
(function ($) {

    var skin = require('./_skin')();

    $('.tabbable .nav-tabs').each(function(){
        var tabs = $(this).niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: true,
            oneaxismousemode: true
        });

        var _super = tabs.getContentSize;
        tabs.getContentSize = function() {
            var page = _super.call(tabs);
            page.h = tabs.win.height();
            return page;
        };
    });

    $('[data-scrollable]').getNiceScroll().resize();

    $('.tabbable .nav-tabs a').on('shown.bs.tab', function(e){
        var tab = $(this).closest('.tabbable');
        var target = $(e.target),
            targetPane = target.attr('href') || target.data('target');

        // refresh tabs with horizontal scroll
        tab.find('.nav-tabs').getNiceScroll().resize();

        // refresh [data-scrollable] within the activated tab pane
        $(targetPane).find('[data-scrollable]').getNiceScroll().resize();
    });

}(jQuery));
},{"./_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_tooltip.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Tooltip
    $("body").tooltip({selector: '[data-toggle="tooltip"]', container: "body"});

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_touchspin.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkTouchSpin = function () {

        if (! this.length) return;

        if (typeof $.fn.TouchSpin != 'undefined') {

            this.TouchSpin();

        }

    };

    $('[data-toggle="touch-spin"]').tkTouchSpin();

}(jQuery));
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_tree.js":[function(require,module,exports){
(function ($) {

    var tree_glyph_options = {
        map: {
            checkbox: "fa fa-square-o",
            checkboxSelected: "fa fa-check-square",
            checkboxUnknown: "fa fa-check-square fa-muted",
            error: "fa fa-exclamation-triangle",
            expanderClosed: "fa fa-caret-right",
            expanderLazy: "fa fa-angle-right",
            expanderOpen: "fa fa-caret-down",
            doc: "fa fa-file-o",
            noExpander: "",
            docOpen: "fa fa-file",
            loading: "fa fa-refresh fa-spin",
            folder: "fa fa-folder",
            folderOpen: "fa fa-folder-open"
        }
    },
    tree_dnd_options = {
        autoExpandMS: 400,
            focusOnClick: true,
            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
            dragStart: function(node, data) {
            /** This function MUST be defined to enable dragging for the tree.
             *  Return false to cancel dragging of node.
             */
            return true;
        },
        dragEnter: function(node, data) {
            /** data.otherNode may be null for non-fancytree droppables.
             *  Return false to disallow dropping on node. In this case
             *  dragOver and dragLeave are not called.
             *  Return 'over', 'before, or 'after' to force a hitMode.
             *  Return ['before', 'after'] to restrict available hitModes.
             *  Any other return value will calc the hitMode from the cursor position.
             */
            // Prevent dropping a parent below another parent (only sort
            // nodes under the same parent)
            /*
            if(node.parent !== data.otherNode.parent){
                return false;
            }
            // Don't allow dropping *over* a node (would create a child)
            return ["before", "after"];
            */
            return true;
        },
        dragDrop: function(node, data) {
            /** This function MUST be defined to enable dropping of items on
             *  the tree.
             */
            data.otherNode.moveTo(node, data.hitMode);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFancyTree = function(){

        if (! this.length) return;

        if (typeof $.fn.fancytree == 'undefined') return;

        var extensions = [ "glyph" ];
        if (typeof this.attr('data-tree-dnd') !== "undefined") {
            extensions.push( "dnd" );
        }
        this.fancytree({
            extensions: extensions,
            glyph: tree_glyph_options,
            dnd: tree_dnd_options,
            clickFolderMode: 3,
            checkbox: typeof this.attr('data-tree-checkbox') !== "undefined" || false,
            selectMode: typeof this.attr('data-tree-select') !== "undefined" ? parseInt(this.attr('data-tree-select')) : 2
        });

    };

    // using default options
    $('[data-toggle="tree"]').each(function () {
        $(this).tkFancyTree();
    });

}(jQuery));
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_wizard.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkWizard = function () {

        if (! this.length) return;

        if (typeof $.fn.slick == 'undefined') return;

        var t = this,
            container = t.closest('.wizard-container');

        t.slick({
            dots: false,
            arrows: false,
            slidesToShow: 1,
            rtl: this.data('rtl'),
            slide: 'fieldset',
            onAfterChange: function (wiz, index) {
                $(document).trigger('after.wizard.step', {
                    wiz: wiz,
                    target: index,
                    container: container,
                    element: t
                });
            }
        });

        container.find('.wiz-next').click(function (e) {
            e.preventDefault();
            t.slickNext();
        });

        container.find('.wiz-prev').click(function (e) {
            e.preventDefault();
            t.slickPrev();
        });

        container.find('.wiz-step').click(function (e) {
            e.preventDefault();
            t.slickGoTo($(this).data('target'));
        });

        $(document).on('show.bs.modal', function () {
            t.closest('.modal-body').hide();
        });

        $(document).on('shown.bs.modal', function () {
            t.closest('.modal-body').show();
            t.slickSetOption('dots', false, true);
        });

    };

    $('[data-toggle="wizard"]').each(function () {
        $(this).tkWizard();
    });

    /**
     * By leveraging events we can hook into the wizard to add functionality.
     * This example updates the progress bar after the wizard step changes.
     */
    $(document).on('after.wizard.step', function (event, data) {

        if (data.container.is('#wizard-demo-1')) {

            var target = data.container.find('.wiz-progress li:eq(' + data.target + ')');

            data.container.find('.wiz-progress li').removeClass('active complete');

            target.addClass('active');

            target.prevAll().addClass('complete');

        }

    });

}(jQuery));
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_carousel.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('carousel', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkCarousel();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_check-all.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'check-all') {
                        el.tkCheckAll();
                    }

                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_collapse.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'collapse') {
                        el.tkCollapse();
                    }
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_cover.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('cover', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function () {
                        el.tkCover();
                    }, 200);
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_datepicker.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('datepicker', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkDatePicker();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_daterangepicker.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('daterangepickerReport', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkDaterangepickerReport();
                }
            };
        } ])
        .directive('daterangepickerReservation', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkDaterangepickerReservation();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_expandable.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('expandable', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkExpandable();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_minicolors.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('minicolors', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkMiniColors();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_modal.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'modal') {
                        el.tkModal();
                    }
                    if (attrs.toggle == 'tk-modal-demo') {
                        el.tkModalDemo();
                    }

                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_nestable.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('nestable', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkNestable();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_panel-collapse.js":[function(require,module,exports){
(function () {
    "use strict";

    var randomId = function () {
        /** @return String */
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    angular.module('app')
        .directive('toggle', [ '$compile', function ($compile) {
            return {
                restrict: 'A',
                priority: 100,
                compile: function (el, attrs) {

                    if (attrs.toggle !== 'panel-collapse') return;

                    var body = angular.element('.panel-body', el),
                        id = body.attr('id') || randomId(),
                        collapse = angular.element('<div/>');

                    collapse
                        .attr('id', id)
                        .addClass('collapse' + (el.data('open') ? ' in' : ''))
                        .append(body.clone());

                    body.remove();

                    el.append(collapse);

                    $('.panel-collapse-trigger', el)
                        .attr('data-toggle', 'collapse')
                        .attr('data-target', '#' + id)
                        .collapse({trigger: false})
                        .removeAttr('style');

                    return function (scope, el, attrs) {
                    };

                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_select2.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'select2' || attrs.toggle == 'select2-tags') {
                        el.tkSelect2();
                    }
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_selectpicker.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('selectpicker', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkSelectPicker();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_slider.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('slider', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.slider == 'default') {
                        el.tkSlider();
                    }

                    if (attrs.slider == 'formatter') {
                        el.tkSliderFormatter();
                    }

                }
            };
        } ]);

    angular.module('app')
        .directive('onSlide', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    el.tkSliderUpdate();

                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_summernote.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('summernote', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkSummernote();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_tables.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'data-table') {
                        el.tkDataTable();
                    }

                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_tabs.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'tab') {
                        el.click(function(e){
                            e.preventDefault();
                        });
                    }

                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_touchspin.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'touch-spin') {
                        el.tkTouchSpin();
                    }

                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_tree.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle == 'tree') {
                        el.tkFancyTree();
                    }

                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_wizard.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'wizard') {
                        el.tkWizard();
                    }
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/main.js":[function(require,module,exports){
require('./_panel-collapse');
require('./_carousel');
require('./_check-all');
require('./_collapse');
require('./_cover');
require('./_datepicker');
require('./_daterangepicker');
require('./_expandable');
require('./_minicolors');
require('./_modal');
require('./_nestable');
require('./_select2');
require('./_selectpicker');
require('./_slider');
require('./_summernote');
require('./_touchspin');
require('./_tables');
require('./_tabs');
require('./_tree');
require('./_wizard');
},{"./_carousel":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_carousel.js","./_check-all":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_check-all.js","./_collapse":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_collapse.js","./_cover":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_cover.js","./_datepicker":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_datepicker.js","./_daterangepicker":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_daterangepicker.js","./_expandable":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_expandable.js","./_minicolors":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_minicolors.js","./_modal":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_modal.js","./_nestable":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_nestable.js","./_panel-collapse":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_panel-collapse.js","./_select2":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_select2.js","./_selectpicker":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_selectpicker.js","./_slider":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_slider.js","./_summernote":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_summernote.js","./_tables":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_tables.js","./_tabs":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_tabs.js","./_touchspin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_touchspin.js","./_tree":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_tree.js","./_wizard":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/_wizard.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/main.js":[function(require,module,exports){
require('./_tabs');
require('./_tree');
require('./_show-hover');
require('./_daterangepicker');
require('./_expandable');
require('./_nestable');
require('./_cover');
require('./_tooltip');
require('./_tables');
require('./_check-all');
require('./_progress-bars');
require('./_iframe');
require('./_bootstrap-collapse');
require('./_bootstrap-carousel');
require('./_bootstrap-modal');
require('./_panel-collapse');

// Forms
require('./_touchspin');
require('./_select2');
require('./_slider');
require('./_selectpicker');
require('./_datepicker');
require('./_minicolors');
require('./_bootstrap-switch');
require('./_wizard');
require('./_summernote');
},{"./_bootstrap-carousel":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_bootstrap-carousel.js","./_bootstrap-collapse":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_bootstrap-collapse.js","./_bootstrap-modal":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_bootstrap-modal.js","./_bootstrap-switch":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_bootstrap-switch.js","./_check-all":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_check-all.js","./_cover":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_cover.js","./_datepicker":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_datepicker.js","./_daterangepicker":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_daterangepicker.js","./_expandable":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_expandable.js","./_iframe":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_iframe.js","./_minicolors":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_minicolors.js","./_nestable":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_nestable.js","./_panel-collapse":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_panel-collapse.js","./_progress-bars":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_progress-bars.js","./_select2":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_select2.js","./_selectpicker":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_selectpicker.js","./_show-hover":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_show-hover.js","./_slider":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_slider.js","./_summernote":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_summernote.js","./_tables":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_tables.js","./_tabs":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_tabs.js","./_tooltip":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_tooltip.js","./_touchspin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_touchspin.js","./_tree":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_tree.js","./_wizard":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/_wizard.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_async.js":[function(require,module,exports){
function contentLoaded(win, fn) {

    var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[ rem ](pre + e.type, init, false);
            if (! done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (! modern && root.doScroll) {
            try {
                top = ! win.frameElement;
            } catch (e) {
            }
            if (top) poll();
        }
        doc[ add ](pre + 'DOMContentLoaded', init, false);
        doc[ add ](pre + 'readystatechange', init, false);
        win[ add ](pre + 'load', init, false);
    }
}

module.exports = function(urls, callback) {

    var asyncLoader = function (urls, callback) {

        urls.foreach(function (i, file) {
            loadCss(file);
        });

        // checking for a callback function
        if (typeof callback == 'function') {
            // calling the callback
            contentLoaded(window, callback);
        }
    };

    var loadCss = function (url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[ 0 ].appendChild(link);
    };

    // simple foreach implementation
    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.length; i ++) {
            callback(i, this[ i ]);
        }
    };

    asyncLoader(urls, callback);

};
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_breakpoints.js":[function(require,module,exports){
(function ($) {

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 320, 480, 768, 1024 ]
    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_gridalicious.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkGridalicious = function () {

        if (! this.length) return;

        this.gridalicious({
            gutter: this.data('gutter') || 15,
            width: this.data('width') || 370,
            selector: '> div',
            animationOptions: {
                complete: function () {
                    $(window).trigger('resize');
                }
            }
        });

    };

    $('[data-toggle*="gridalicious"]').each(function () {
        $(this).tkGridalicious();
    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_isotope.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkIsotope = function () {

        if (! this.length) return;

        this.isotope({
            layoutMode: this.data('layoutMode') || "packery",
            itemSelector: '.item'
        });

        /*
        this.isotope('on', 'layoutComplete', function(){
            $(window).trigger('resize');
        });
        */

    };

    $(function(){

        setTimeout(function () {
            $('[data-toggle="isotope"]').each(function () {
                $(this).tkIsotope();
            });
        }, 300);

        $(document).on('domChanged', function(){
            $('[data-toggle="isotope"]').each(function(){
                $(this).isotope();
            });
        });

    });

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_parallax.js":[function(require,module,exports){
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
    for (var x = 0; x < vendors.length && ! window.requestAnimationFrame; ++ x) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if (! window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (! window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

(function ($, window) {
    "use strict";

    $.fn.tkParallax = function () {

        if (Modernizr.touch) return;

        var getOptions = function (e) {
            return {
                speed: e.data('speed') || 4,
                translate: e.data('speed') || true,
                translateWhen: e.data('translateWhen') || 'inViewportTop',
                autoOffset: e.data('autoOffset'),
                offset: e.data('offset') || 0,
                opacity: e.data('opacity')
            };
        };

        var $window = $(window),
            $windowContent = $('.st-content-inner'),
            $element = this;

        var ticking = false,
            $scrollable = null,
            lastScrollTop = 0;

        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

        var requestTick = function (e) {
            if (! ticking) {
                $scrollable = $(e.currentTarget);
                // although Safari has support for requestAnimationFrame,
                // the animation in this case is choppy so we'll just run it directly
                if (isSafari) {
                    animate();
                } else {
                    window.requestAnimationFrame(animate);
                    ticking = true;
                }
            }
        };

        // Translates an element on the Y axis using translate3d to ensure
        // that the rendering is done by the GPU
        var translateY = function (elm, value) {
            var translate = 'translate3d(0px,' + value + 'px, 0px)';
            elm.style[ '-webkit-transform' ] = translate;
            elm.style[ '-moz-transform' ] = translate;
            elm.style[ '-ms-transform' ] = translate;
            elm.style[ '-o-transform' ] = translate;
            elm.style.transform = translate;
        };

        var layers = $element.find('.parallax-layer');

        var init = function () {
            layers.each(function () {

                var layer = $(this),
                    layerOptions = getOptions(layer),
                    height = $element.outerHeight(true);

                if (layerOptions.translate) {
                    if (layer.is('img') && layerOptions.autoOffset) {
                        $.loadImage(layer.attr('src')).done(function () {
                            layer.removeAttr('style');
                            var layerHeight = layer.height();
                            var offset = layerHeight * 0.33;
                            if ((offset + height) > layerHeight) {
                                offset = layerHeight - height;
                            }
                            offset = offset * - 1;
                            layer.attr('data-offset', offset);
                            translateY(layer.get(0), offset);
                        });
                    }
                }

            });
        };

        init();
        $(window).on("debouncedresize", init);

        var animate = function () {
            var scrollTop = parseInt($scrollable.scrollTop());
            var scrollableTop = $scrollable.is($window) ? 0 : $scrollable.offset().top;
            var height = $element.outerHeight(true);
            var bodyPadding = {
                top: parseInt($(document.body).css('padding-top')),
                bottom: parseInt($(document.body).css('padding-bottom'))
            };
            var windowHeight = $scrollable.innerHeight();
            var windowBottom = scrollTop + windowHeight - (bodyPadding.bottom + bodyPadding.top);
            var top = $element.offset().top - scrollableTop - bodyPadding.top;
            var bottom = top + height;
            var topAbs = Math.abs(top);
            var pos = top / windowHeight * 100;
            var opacityKey = height * 0.5;
            var when = {};

            /*
             * ONLY when the scrollable element IS NOT the window
             */

            // when the element is anywhere in viewport
            when.inViewport = (bottom > 0) && (top < windowHeight);

            // when the top of the viewport is crossing the element
            when.inViewportTop = (bottom > 0) && (top < 0);

            // when the bottom of the viewport is crossing the element
            when.inViewportBottom = (bottom > 0) && (top < windowHeight) && (bottom > windowHeight);

            /*
             * ONLY when the scrollable element IS the window
             */

            if ($scrollable.is($window)) {

                // when the window is scrollable and the element is completely in the viewport
                when.inWindowViewportFull = (top >= scrollTop) && (bottom <= windowBottom);

                when.inWindowViewport2 = (top >= scrollTop) && (top <= windowBottom);

                when.inWindowViewport3 = (bottom >= scrollTop) && (bottom <= windowBottom);

                when.inWindowViewport4 = (bottom >= scrollTop) && (bottom >= windowHeight) && (height > windowHeight);

                // when the window is scrollable and the top of the viewport is crossing the element
                when.inWindowViewportTop = ! when.inWindowViewport2 && (when.inWindowViewport3 || when.inWindowViewport4);

                // when the window is scrollable and the bottom of the viewport is crossing the element
                when.inWindowViewportBottom = when.inWindowViewport2 && ! when.inWindowViewport3;

                // when the window is scrollable and the element is anywhere in viewport
                when.inWindowViewport = when.inWindowViewportTop || when.inWindowViewportBottom || when.inWindowViewportFull;

                when.inViewport = when.inWindowViewport;
                when.inViewportTop = when.inWindowViewportTop;
                when.inViewportBottom = when.inWindowViewportBottom;

                pos = (top - scrollTop) / windowHeight * 100;
            }

            if (when.inViewportTop && when.inViewportBottom) {
                when.inViewportBottom = false;
            }

            if (! isNaN(scrollTop)) {
                layers.each(function () {

                    var layer = $(this);
                    var layerOptions = getOptions(layer);

                    var ty = (windowHeight + height) - bottom;

                    if ($scrollable.is($window)) {
                        ty = windowBottom - top;
                    }

                    if (layerOptions.translate) {

                        var layerPos = (- 1 * pos * layerOptions.speed) + layerOptions.offset;
                        var layerHeight = layer.height();

                        if (when.inViewport && ! when.inViewportTop && ! when.inViewportBottom) {
                            if (layer.is('img') && layerHeight > height) {
                                if ((Math.abs(layerPos) + height) > layerHeight) {
                                    layerPos = (layerHeight - height) * - 1;
                                }
                            }
                            if (! layer.is('img')) {
                                layerPos = 0;
                            }
                        }

                        if (when.inViewportTop && ((layer.is('img') && layerHeight == height) || ! layer.is('img') )) {
                            layerPos = Math.abs(layerPos);
                        }

                        if (when.inViewportBottom && ! layer.is('img')) {
                            layerPos = height - ty;

                            // scrolling up
                            if (scrollTop < lastScrollTop) {
                                layerPos = layerPos * - 1;
                            }
                        }

                        if (when.inViewport) {
                            layerPos = (layerPos).toFixed(5);
                            if (layerHeight > $window.height() && scrollTop <= 0) {
                                layerPos = 0;
                            }
                            translateY(layer.get(0), layerPos);
                        }

                    }

                    if (layerOptions.opacity) {

                        // fade in
                        if (when.inViewportBottom) {

                            var y, yP;

                            if ($scrollable.is($window)) {

                                y = ty;
                                yP = (y / height).toFixed(5);

                                if (y > opacityKey) {
                                    layer.css({opacity: yP});
                                }
                                else {
                                    layer.css({opacity: 0});
                                }
                            }
                            else {
                                if (bottom < (windowHeight + opacityKey)) {

                                    y = (windowHeight + opacityKey) - bottom;
                                    yP = (y / opacityKey).toFixed(5);

                                    layer.css({opacity: yP});
                                } else {
                                    layer.css({opacity: 0});
                                }
                            }
                        }

                        // fade out
                        else if (when.inViewportTop) {
                            var topOrigin = $scrollable.is($window) ? scrollTop - top : topAbs;
                            if (topOrigin > opacityKey) {
                                layer.css({
                                    'opacity': (1 - (topOrigin / height)).toFixed(5)
                                });
                            } else {
                                layer.css({'opacity': 1});
                            }
                        }

                        // reset
                        else {
                            layer.css({'opacity': 1});
                        }

                        if (when.inViewportBottom && scrollTop <= 0) {
                            layer.css({'opacity': 1});
                        }

                    }

                });

                lastScrollTop = scrollTop;
            }

            ticking = false;
        };

        if ($windowContent.length) {
            $windowContent.scroll(requestTick);
        } else {
            $window.scroll(requestTick);
        }

    };

    $('.parallax').each(function () {
        $(this).tkParallax();
    });

})(jQuery, window);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_scrollable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('./_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkScrollable = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            horizontal: false
        }, options);

        var nice = this.niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: settings.horizontal
        });

        if (! settings.horizontal) return;

        var _super = nice.getContentSize;

        nice.getContentSize = function () {
            var page = _super.call(nice);
            page.h = nice.win.height();
            return page;
        };

    };

    $('[data-scrollable]').tkScrollable();

    $('[data-scrollable-h]').each(function () {

       $(this).tkScrollable({ horizontal: true });

    });

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            $('[data-scrollable], [data-scrollable-h]').getNiceScroll().resize();
        }, 100);
    });

}(jQuery));
},{"./_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_sidebar-pc.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkSidebarSizePcDemo = function(){

        var t, spc_demo = this;

        if (! spc_demo.length) return;

        $(document)
            .on('sidebar.show', function(){
                $('#pc-open').prop('disabled', true);
            })
            .on('sidebar.hidden', function(){
                $('#pc-open').prop('disabled', false);
            });

        spc_demo.on('submit', function (e) {
            e.preventDefault();
            var s = $('.sidebar'), ve = $('#pc-value'), v = ve.val();
            ve.blur();
            if (! v.length || v < 25) {
                v = 25;
                ve.val(v);
            }
            s[ 0 ].className = s[ 0 ].className.replace(/sidebar-size-([\d]+)pc/ig, 'sidebar-size-' + v + 'pc');
            sidebar.open('sidebar-menu');
            clearTimeout(t);
            t = setTimeout(function () {
                sidebar.close('sidebar-menu');
            }, 5000);
        });

    };

    $('[data-toggle="sidebar-size-pc-demo"]').tkSidebarSizePcDemo();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_skin.js":[function(require,module,exports){
module.exports=require("/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js")
},{"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_skins.js":[function(require,module,exports){
var asyncLoader = require('./_async');

(function ($) {

    var changeSkin = function () {
        var skin = $.cookie("skin"),
            file = $.cookie("skin-file");
        if (typeof skin != 'undefined') {
            asyncLoader([ 'css/' + file + '.min.css' ], function () {
                $('[data-skin]').removeProp('disabled').parent().removeClass('loading');
            });
        }
    };

    $('[data-skin]').on('click', function () {

        if ($(this).prop('disabled')) return;

        $('[data-skin]').prop('disabled', true);

        $(this).parent().addClass('loading');

        $.cookie("skin", $(this).data('skin'));

        $.cookie("skin-file", $(this).data('file'));

        changeSkin();

    });

    var skin = $.cookie("skin");

    if (typeof skin != 'undefined' && skin != 'default') {
        changeSkin();
    }

})(jQuery);
},{"./_async":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_async.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_gridalicious.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ '$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'gridalicious') {
                        $timeout(function(){
                            el.tkGridalicious();
                        }, 100);
                    }
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_isotope.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ '$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'isotope') {
                        $timeout(function(){
                            el.tkIsotope();
                        }, 100);
                    }
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_parallax.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('parallax', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkParallax();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_scrollable.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('scrollable', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el) {
                    el.tkScrollable();
                }
            };
        } ])
        .directive('scrollableH', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el) {
                    el.tkScrollable({ horizontal: true });
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_sidebar-pc.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'sidebar-size-pc-demo') {
                        el.tkSidebarSizePcDemo();
                    }
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/main.js":[function(require,module,exports){
require('./_scrollable');
require('./_isotope');
require('./_parallax');
require('./_gridalicious');
require('./_sidebar-pc');
},{"./_gridalicious":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_gridalicious.js","./_isotope":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_isotope.js","./_parallax":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_parallax.js","./_scrollable":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_scrollable.js","./_sidebar-pc":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/_sidebar-pc.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/main.js":[function(require,module,exports){
require('./_breakpoints.js');
require('./_gridalicious.js');
require('./_scrollable.js');
require('./_skins');
require('./_isotope');
require('./_parallax');

// Sidebar Percentage Sizes Demo
require('./_sidebar-pc');
},{"./_breakpoints.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_breakpoints.js","./_gridalicious.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_gridalicious.js","./_isotope":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_isotope.js","./_parallax":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_parallax.js","./_scrollable.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_scrollable.js","./_sidebar-pc":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_sidebar-pc.js","./_skins":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_skins.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/_skin.js":[function(require,module,exports){
module.exports=require("/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js")
},{"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/angular/_google-maps.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (attrs.toggle !== 'google-maps') return;

                    el.tkGoogleMap();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/_edit.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var find = function (mapData, location, marker, markerData) {

        var eventData = $.extend({}, {marker: marker}, markerData, mapData),
            state = '',
            country = '',
            address = '';

        mapData.container.gmap('search', {'location': location}, function (results, status) {

            if (status === 'OK') {
                address = results[ 0 ].formatted_address;
                $.each(results[ 0 ].address_components, function (i, v) {
                    if (v.types[ 0 ] == "administrative_area_level_1" || v.types[ 0 ] == "administrative_area_level_2") {
                        state = v.long_name;
                    } else if (v.types[ 0 ] == "country") {
                        country = v.long_name;
                    }
                });
                eventData = $.extend({}, eventData, {state: state, country: country, address: address});
            }

            $(document).trigger('map.marker.find', eventData);

        });

    };

    var bindFind = function(marker, markerData, data) {

        if (typeof markerData.open !== 'undefined' && markerData.open === true) {
            find(data, markerData.latLng, marker, markerData);
        }

        google.maps.event.addListener(marker, 'dragend', function (e) {
            find(data, e.latLng, this, markerData);
        });

        google.maps.event.addListener(marker, 'click', function (e) {
            find(data, e.latLng, this, markerData);
        });

    };

    $(document).on('map.init', function (event, data) {

        if (data.container.data('id') == 'map-edit') {

            var markers = data.container.gmap('get', 'markers'),
                markerOptions = {
                    "draggable": true
                },
                markerData = {
                    "open": true,
                    "template": "tpl-edit",
                    "icon": "building-01"
                };

            google.maps.event.addListener(data.map, 'click', function (event) {

                markerData = $.extend({}, markerData, {"latLng": event.latLng});

                var marker = data.addMarker(markers.length, markerData, markerOptions);

                bindFind(marker, markerData, data);

            });

            google.maps.event.addListener(data.iw.window, 'domready', function () {

                $('#map-delete-marker').on('click', function (e) {
                    e.stopPropagation();
                    var id = $(this).data('id');
                    data.iw.close(id);
                    markers[ id ].setMap(null);
                });

            });

            $.each(markers, function(i, marker){

                var markerData = marker.get('content');

                bindFind(marker, markerData, data);

            });

        }

    });

    $(document).on('map.marker.find', function (event, data) {

        data.marker.setTitle(data.address);

        if (data.iw.window.isOpen === false) return;

        data.iw.open(data.marker.get('id'), data);

    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/_filters.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    };

    var filter = function(data){

        data.iw.close();
        data.container.gmap('set', 'bounds', null);

        var filters = [];

        $('#radios :checked').each(function (i, checkbox) {
            filters.push($(checkbox).val());
        });

        if (filters.length) {
            data.container.gmap('find', 'markers', {
                'property': 'tags',
                'value': filters,
                'operator': 'OR'
            }, function (marker, found) {
                if (found) {
                    data.container.gmap('addBounds', marker.position);
                }
                marker.setVisible(found);
            });
        } else {
            $.each(data.container.gmap('get', 'markers'), function (i, marker) {
                data.container.gmap('addBounds', marker.position);
                marker.setVisible(false);
            });
        }

    };

    $(document).on('map.init', function (event, data) {

        if (data.container.data('filters') === true) {

            var map = data,
                markers = data.container.gmap('get', 'markers'),
                tags = [],
                templateId = data.container.data('filtersTemplate') || '#map-filters-template';

            $.each(markers, function(i, marker){
                $.each(marker.tags, function(i, tag){
                    tags.push(tag);
                });
            });

            tags = arrayUnique(tags);

            var source = $(templateId).html();
            var template = Handlebars.compile(source);
            var $el = $(template({ tags: tags }));

            $el.insertAfter(data.container);

            var skin = require('../../../layout/js/_skin')();

            $('[data-scrollable]', $el).niceScroll({
                cursorborder: 0,
                cursorcolor: config.skins[ skin ][ 'primary-color' ],
                horizrailenabled: false
            });

            setTimeout(function(){
                filter(data);
            }, 100);

            $('body').on('click', '#radios :checkbox', function(){
                filter(data);
            });

        }

    });

})(jQuery);
},{"../../../layout/js/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/_library.js":[function(require,module,exports){
module.exports = function () {

    var centerWindow = function (container, map, data) {

        if (data.lat && data.lng) {

            container.gmap('option', 'center', new google.maps.LatLng(data.lat, data.lng));

            map.panBy(0, -170);

            return true;

        }
        return false;
    };

    var centerMap = function (container, data) {

        if (data && data.length === 2) {

            container.gmap('option', 'center', new google.maps.LatLng(data[ 0 ], data[ 1 ]));

            return true;

        }
        return false;
    };

    var resize = function (container, map, windowData, mapData) {

        if (typeof google == 'undefined') return;

        google.maps.event.trigger(map, 'resize');

        if (! centerMap(container, mapData)) centerWindow(container, map, windowData);

    };

    return {
        centerWindow: centerWindow,
        centerMap: centerMap,
        resize: resize
    };

};
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/main.js":[function(require,module,exports){
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
    'callback=initGoogleMaps';
    document.body.appendChild(script);
}

// window.onload = loadScript;

function initScripts() {
    var $scripts = [
        "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.js",
        "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.extensions.js",
        "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.services.js",
        "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.microdata.js",
        "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.microformat.js",
        "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.overlays.js",
        "js/vendor/maps/google/jquery-ui-map/ui/jquery.ui.map.rdfa.js",
        "js/vendor/maps/google/jquery-ui-map/addons/infobox_packed.js",
        "js/vendor/maps/google/jquery-ui-map/addons/markerclusterer.min.js"
    ];

    $.each($scripts, function (k, v) {
        if ($('[src="' + v + '"]').length) return true;
        var scriptNode = document.createElement('script');

        scriptNode.src = v;
        $('head').prepend($(scriptNode));
    });

    $.extend($.ui.gmap.prototype, {
        pagination: function (prop, mapData) {
            var source = $("#map-pagination").html();
            var template = Handlebars.compile(source);
            var $el = $(template());

            var self = this, i = 0;
            prop = prop || 'title';
            self.set('pagination', function (a, b) {
                if (a) {
                    i = i + b;
                    var m = self.get('markers')[ i ];
                    mapData.iw.open(i, m.get('content'));
                    $el.find('.display').text(m[ prop ]);
                    self.get('map').panTo(m.getPosition());
                }
            });
            self.get('pagination')(true, 0);
            $el.find('.back-btn').click(function (e) {
                e.preventDefault();
                self.get('pagination')((i > 0), - 1, this);
            });
            $el.find('.fwd-btn').click(function (e) {
                e.preventDefault();
                self.get('pagination')((i < self.get('markers').length - 1), 1, this);
            });
            self.addControl($el, google.maps.ControlPosition[ mapData.options.paginationPosition ]);
        }
    });
}

var library = require('./_library.js')();

// Holds google maps styles
var styles = {
    "light-grey": require('./styles/_light-grey.js'),
    "light-monochrome": require('./styles/_light-monochrome.js'),
    "cool-grey": require('./styles/_cool-grey.js'),
    "blue-gray": require('./styles/_blue-gray.js'),
    "paper": require('./styles/_paper.js'),
    "apple": require('./styles/_apple.js'),
    "light-green": require('./styles/_light-green.js'),
    "lemon-tree": require('./styles/_lemon-tree.js'),
    "clean-cut": require('./styles/_clean-cut.js'),
    "nature": require('./styles/_nature.js')
};

// Process the infoWindow content via Handlebars templates
var infoWindowContent = function (marker) {
    var source = $("#" + marker.template).html();
    var template = Handlebars.compile(source);
    return template(marker);
};

/**
 * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
 */
$.fn.tkGoogleMap = function () {

    if (! this.length) return;

    var container = this;

    if (typeof google == 'undefined' || typeof InfoBox == 'undefined') {
        setTimeout(function(){
            container.tkGoogleMap();
        }, 200);

        return;
    }

    var options = {
        mapZoomPosition: container.data('zoomPosition') || "TOP_LEFT",
        mapZoom: container.data('zoom') || 16,
        mapStyle: container.data('style') || "light-grey",
        mapType: container.data('type') || "ROADMAP",
        file: container.data('file'),
        center: container.data('center') ? container.data('center').split(",") : false,
        pagination: container.data('pagination') || false,
        paginationPosition: container.data('paginationPosition') || 'TOP_LEFT',
        draggable: container.data('draggable') !== false
    };

    var mapData;

    // provide a default object for data collected from the currently opened infoWindow
    var infoWindowData = {
        lat: false,
        lng: false
    };

    var infoWindowOpen = function (i, marker) {

        var markerInst = container.gmap('get', 'markers')[ i ];

        infoWindow.setContent(infoWindowContent(marker));
        infoWindow.open(map, markerInst);
        infoWindow.isOpen = i;

        infoWindowData = {
            lat: marker.latitude,
            lng: marker.longitude
        };
    };

    var infoWindowClose = function (i) {
        if (typeof i == 'undefined') {
            infoWindow.close();
            infoWindow.isOpen = false;
            return true;
        }
        if (typeof infoWindow.isOpen != 'undefined' && infoWindow.isOpen === i) {
            infoWindow.close();
            infoWindow.isOpen = false;
            return true;
        }
        return false;
    };

    /* InfoBox */
    var infoWindow = new InfoBox({
        maxWidth: 240,
        alignBottom: true
    });

    var addMarker = function (i, marker, options) {
        var iconBase = 'images/markers/';
        var position = typeof marker.latLng !== 'undefined' ? marker.latLng : false;
        if (! position && typeof marker.latitude !== 'undefined' && typeof marker.longitude !== 'undefined') position = new google.maps.LatLng(marker.latitude, marker.longitude);
        if (! position) return false;

        var markerOptions = {
            "id": i,
            "position": position,
            "draggable": true,
            "icon": iconBase + marker.icon + ".png"
        };

        if (typeof options == 'object') markerOptions = $.extend({}, markerOptions, options);

        var open = typeof marker.open !== 'undefined' && marker.open === true;

        container.gmap('addMarker', markerOptions);

        var markerInst = container.gmap('get', 'markers')[ i ];

        markerInst.setTitle(marker.title);

        google.maps.event.addListener(markerInst, 'click', function () {
            if (! infoWindowClose(i)) {
                infoWindowOpen(i, marker);
                library.centerWindow(container, map, infoWindowData);
            }
        });

        google.maps.event.addListener(markerInst, 'dragend', function () {
            var lat = markerInst.getPosition().lat();
            var lng = markerInst.getPosition().lng();
            console.log('"latitude": ' + lat + ', "longitude": ' + lng);
        });

        var markerData = $.extend({}, marker, {
            "id": i,
            "latLng": new google.maps.LatLng(marker.latitude, marker.longitude)
        });

        markerInst.set('content', markerData);

        if (open) infoWindowOpen(i, marker);

        return markerInst;
    };

    container.gmap(
        {
            'zoomControl': true,
            'zoomControlOptions': {
                'style': google.maps.ZoomControlStyle.SMALL,
                'position': google.maps.ControlPosition[ options.mapZoomPosition ]
            },
            'panControl': false,
            'streetViewControl': false,
            'mapTypeControl': false,
            'overviewMapControl': false,
            'scrollwheel': false,
            'draggable': options.draggable,
            'mapTypeId': google.maps.MapTypeId[ options.mapType ],
            'zoom': options.mapZoom,
            'styles': styles[ options.mapStyle ]
        })
        .bind('init', function () {

            mapData = {
                container: container,
                map: map,
                options: options,
                addMarker: addMarker,
                library: library,
                iw: {
                    data: infoWindowData,
                    window: infoWindow,
                    content: infoWindowContent,
                    open: infoWindowOpen,
                    close: infoWindowClose
                }
            };

            if (options.file) {

                $.getJSON(options.file, function (data) {

                    $.each(data.markers, function (i, marker) {
                        var o = typeof marker.options !== 'undefined' ? marker.options : {};
                        addMarker(i, marker, o);
                    });

                    google.maps.event.addListenerOnce(map, 'idle', function () {

                        library.resize(container, map, infoWindowData, options.center);

                        if (options.pagination) {
                            container.gmap('pagination', 'title', mapData);
                        }

                    });
                });

            }
            else {
                library.centerMap(container, options.center);
            }

            google.maps.event.addListenerOnce(map, 'idle', function () {

                $(document).trigger('map.init', mapData);

            });

            google.maps.event.addListener(infoWindow, 'domready', function () {
                var iw = $('.infoBox');
                infoWindow.setOptions({
                    pixelOffset: new google.maps.Size(- Math.abs(iw.width() / 2), - 45)
                });
                setTimeout(function(){

                    $('.cover', iw).each(function(){
                        $(this).tkCover();
                    });

                }, 200);
            });
        });

    var map = container.gmap('get', 'map');

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            library.resize(container, map, infoWindowData, options.center);
        }, 100);
    });

    // handle maps in collapsibles
    $('.collapse').on('shown.bs.collapse', function(){
        if ($(container, this).length) {
            library.resize(container, map, infoWindowData, options.center);
        }
    });

};

module.exports = function () {
    initScripts();

    /*
     * Clustering
     */
    if ($('#google-map-clustering').length) {
        // We need to bind the map with the "init" event otherwise bounds will be null
        $('#google-map-clustering').gmap({'zoom': 2, 'disableDefaultUI': true}).bind('init', function (evt, map) {
            var bounds = map.getBounds();
            var southWest = bounds.getSouthWest();
            var northEast = bounds.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();

            function openInfoWindow() {
                $('#google-map-clustering').gmap('openInfoWindow', {content: 'Hello world!'}, this);
            }

            for (var i = 0; i < 1000; i ++) {
                var lat = southWest.lat() + latSpan * Math.random();
                var lng = southWest.lng() + lngSpan * Math.random();
                $('#google-map-clustering').gmap('addMarker', {
                    'position': new google.maps.LatLng(lat, lng)
                }).click(openInfoWindow);
            }

            $('#google-map-clustering').gmap('set', 'MarkerClusterer', new MarkerClusterer(map, $(this).gmap('get', 'markers')));
        });
    }

};

(function($){
    "use strict";

    $(document).on('map.init', function (event, data) {

        var styleTpl = $('#map-style-switch'),
            toggleStyleWrapper = $('[data-toggle="map-style-switch"]');

        if (styleTpl.length && toggleStyleWrapper.length) {

            var target = $(toggleStyleWrapper.data('target'));

            if (! target) return;

            if (data.container.is(target)) {

                var s = styleTpl.html();
                var t = Handlebars.compile(s);

                toggleStyleWrapper.html(t({
                    styles: styles
                }));

                $('select', toggleStyleWrapper).val(data.options.mapStyle);

                if (typeof $.fn.selectpicker != 'undefined') {

                    $('.selectpicker', toggleStyleWrapper).each(function () {
                        $(this).selectpicker({
                            width: $(this).data('width') || '100%'
                        });
                    });

                }

                var skin = require('../_skin')();

                $('[data-scrollable]', toggleStyleWrapper).niceScroll({
                    cursorborder: 0,
                    cursorcolor: config.skins[ skin ][ 'primary-color' ],
                    horizrailenabled: false
                });

                $('select', toggleStyleWrapper).on('change', function () {
                    var style = typeof styles[ $(this).val() ] ? styles[ $(this).val() ] : false;
                    if (! style) return;

                    target.gmap('option', 'styles', style);
                });

            }

        }

    });

    $('[data-toggle="google-maps"]').each(function () {

        $(this).tkGoogleMap();

    });

})(jQuery);

require('./_edit');
require('./_filters');
},{"../_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/_skin.js","./_edit":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/_edit.js","./_filters":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/_filters.js","./_library.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/_library.js","./styles/_apple.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_apple.js","./styles/_blue-gray.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_blue-gray.js","./styles/_clean-cut.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_clean-cut.js","./styles/_cool-grey.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_cool-grey.js","./styles/_lemon-tree.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_lemon-tree.js","./styles/_light-green.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_light-green.js","./styles/_light-grey.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_light-grey.js","./styles/_light-monochrome.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_light-monochrome.js","./styles/_nature.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_nature.js","./styles/_paper.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_paper.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_apple.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [ {"color": "#f7f1df"} ]
}, {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [ {"color": "#d0e3b4"} ]
}, {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi.business",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi.medical",
    "elementType": "geometry",
    "stylers": [ {"color": "#fbd3da"} ]
}, {"featureType": "poi.park", "elementType": "geometry", "stylers": [ {"color": "#bde6ab"} ]}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffe15f"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#efd151"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffffff"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "black"} ]
}, {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#cfb2db"} ]
}, {"featureType": "water", "elementType": "geometry", "stylers": [ {"color": "#a2daf2"} ]} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_blue-gray.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "water",
    "stylers": [ {"visibility": "on"}, {"color": "#b5cbe4"} ]
}, {"featureType": "landscape", "stylers": [ {"color": "#efefef"} ]}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"color": "#83a5b0"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [ {"color": "#bdcdd3"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"} ]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [ {"color": "#e3eed3"} ]
}, {
    "featureType": "administrative",
    "stylers": [ {"visibility": "on"}, {"lightness": 33} ]
}, {"featureType": "road"}, {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [ {"visibility": "on"}, {"lightness": 20} ]
}, {}, {"featureType": "road", "stylers": [ {"lightness": 20} ]} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_clean-cut.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [ {"lightness": 100}, {"visibility": "simplified"} ]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"visibility": "on"}, {"color": "#C6E2FF"} ]
}, {"featureType": "poi", "elementType": "geometry.fill", "stylers": [ {"color": "#C5E3BF"} ]}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#D1D1B8"} ]
} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_cool-grey.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "transit", "elementType": "labels", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "water", "elementType": "labels", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [ {"visibility": "off"} ]
}, {"stylers": [ {"hue": "#00aaff"}, {"saturation": - 100}, {"gamma": 2.15}, {"lightness": 12} ]}, {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [ {"visibility": "on"}, {"lightness": 24} ]
}, {"featureType": "road", "elementType": "geometry", "stylers": [ {"lightness": 57} ]} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_lemon-tree.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "off"} ]
}, {
    "featureType": "landscape.natural",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "on"} ]
}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [ {"hue": "#ffe94f"}, {"saturation": 100}, {"lightness": 4}, {"visibility": "on"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"hue": "#ffe94f"}, {"saturation": 100}, {"lightness": 4}, {"visibility": "on"} ]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"hue": "#333333"}, {"saturation": - 100}, {"lightness": - 74}, {"visibility": "off"} ]
} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_light-green.js":[function(require,module,exports){
module.exports = [ {"stylers": [ {"hue": "#baf4c4"}, {"saturation": 10} ]}, {
    "featureType": "water",
    "stylers": [ {"color": "#effefd"} ]
}, {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [ {"visibility": "on"} ]
}, {"featureType": "road", "elementType": "all", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_light-grey.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"color": "#e9e9e9"}, {"lightness": 17} ]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [ {"color": "#f5f5f5"}, {"lightness": 20} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 17} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 18} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 16} ]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [ {"color": "#f5f5f5"}, {"lightness": 21} ]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [ {"color": "#dedede"}, {"lightness": 21} ]
}, {
    "elementType": "labels.text.stroke",
    "stylers": [ {"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16} ]
}, {
    "elementType": "labels.text.fill",
    "stylers": [ {"saturation": 36}, {"color": "#333333"}, {"lightness": 40} ]
}, {"elementType": "labels.icon", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [ {"color": "#f2f2f2"}, {"lightness": 19} ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#fefefe"}, {"lightness": 20} ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2} ]
} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_light-monochrome.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [ {"hue": "#2c2e33"}, {"saturation": 7}, {"lightness": 19}, {"visibility": "on"} ]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "simplified"} ]
}, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "off"} ]
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": 31}, {"visibility": "simplified"} ]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": 31}, {"visibility": "on"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": - 2}, {"visibility": "simplified"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": - 90}, {"lightness": - 8}, {"visibility": "simplified"} ]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": 10}, {"lightness": 69}, {"visibility": "on"} ]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": - 78}, {"lightness": 67}, {"visibility": "simplified"} ]
} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_nature.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape",
    "stylers": [ {"hue": "#FFA800"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1} ]
}, {
    "featureType": "road.highway",
    "stylers": [ {"hue": "#53FF00"}, {"saturation": - 73}, {"lightness": 40}, {"gamma": 1} ]
}, {
    "featureType": "road.arterial",
    "stylers": [ {"hue": "#FBFF00"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1} ]
}, {
    "featureType": "road.local",
    "stylers": [ {"hue": "#00FFFD"}, {"saturation": 0}, {"lightness": 30}, {"gamma": 1} ]
}, {
    "featureType": "water",
    "stylers": [ {"hue": "#00BFFF"}, {"saturation": 6}, {"lightness": 8}, {"gamma": 1} ]
}, {
    "featureType": "poi",
    "stylers": [ {"hue": "#679714"}, {"saturation": 33.4}, {"lightness": - 25.4}, {"gamma": 1} ]
} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/google/styles/_paper.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"}, {"hue": "#0066ff"}, {"saturation": 74}, {"lightness": 100} ]
}, {"featureType": "poi", "elementType": "all", "stylers": [ {"visibility": "simplified"} ]}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"} ]
}, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [ {"visibility": "off"}, {"weight": 0.6}, {"saturation": - 85}, {"lightness": 61} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"visibility": "on"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "road.local", "elementType": "all", "stylers": [ {"visibility": "on"} ]}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"} ]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"}, {"color": "#5f94ff"}, {"lightness": 26}, {"gamma": 5.86} ]
} ];
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/_forms.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkFormControlMaterial = function(){
        this
            .blur(function () {
                if ($(this).val())
                    $(this).addClass('used');
                else
                    $(this).removeClass('used');
            })
            .after('<span class="ma-form-highlight"></span><span class="ma-form-bar"></span>');
    };

    $('.form-control-material .form-control').each(function () {
        $(this).tkFormControlMaterial();
    });

    $(document).on('show.bs.dropdown', function (e) {

        if (Modernizr.touch && $(window).width() < 768) return true;

        var dd = $(e.relatedTarget).next('.dropdown-menu');
        var ddHeight = dd.outerHeight();
        dd.css({
            height: 0,
            display: 'block',
            overflow: 'hidden'
        });
        dd.velocity({opacity: 1}, {duration: 650, queue: false, easing: 'easeOutQuad'});
        dd.velocity({
            height: ddHeight,
            top: dd.data('top') || 0
        }, {
            duration: 650,
            queue: false,
            easing: 'easeOutCubic',
            complete: function () {
                dd.css({overflow: 'visible'});
            }
        });
    });

    $(document).on('hide.bs.dropdown', function (e) {

        if (Modernizr.touch && $(window).width() < 768) return true;

        var dd = $(e.relatedTarget).next('.dropdown-menu');
        dd.velocity({
            opacity: 0,
            top: '100%'
        }, {
            duration: 650, queue: false, easing: 'easeOutQuad', complete: function () {
                dd.css({
                    display: 'none',
                    height: 'auto'
                });
            }
        });
    });

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/_ripple.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var ripple = function (e) {

        var el, ink, d, x, y;

        el = $(this);

        el.addClass('ripple');

        if (el.parents('.sidebar-skin-white').length) {
            el.addClass('ripple-dark-fade');
        }

        if (el.parents('.sidebar-skin-dark').length) {
            el.addClass('ripple-light-fade');
        }

        if (el.is('.btn-white')) {
            el.addClass('ripple-dark-fade');
        }

        if (el.attr('href') && ! el.data('toggle')) {
            e.preventDefault();
            if (el.closest('.dropdown-menu').length) {
                e.stopPropagation();
            }
            setTimeout(function () {
                document.location = el.attr('href');
            }, 400);
        }

        // create .ink element if it doesn't exist
        if (el.find(".ink").length === 0)
            el.prepend("<span class='ink'></span>");

        ink = el.find(".ink");
        // in case of quick double clicks stop the previous animation
        ink.removeClass("animate");

        // set size of .ink
        if (! ink.height() && ! ink.width()) {
            // use el's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(el.outerWidth(), el.outerHeight());
            ink.css({height: d, width: d});
        }

        // get click coordinates
        // logic = click coordinates relative to page - el's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - el.offset().left - ink.width() / 2;
        y = e.pageY - el.offset().top - ink.height() / 2;

        // set the position and add class .animate
        ink.css({top: y + 'px', left: x + 'px'}).addClass("animate");

    };

    var listGroupMenu = $('.list-group-menu > .list-group-item > a'),
        button = $('.btn'),
        navbarNav = $('.navbar-nav > li > a'),
        dropdownMenu = $('.dropdown-menu > li > a'),
        sidebarMenu = $('.sidebar-menu > li > a');

    var addRipple = $()
        .add(listGroupMenu)
        .add(button)
        .add(navbarNav)
        .add(dropdownMenu)
        .add(sidebarMenu);

    if (addRipple.length) {
        addRipple.click(ripple);
    }

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/angular/_forms.js":[function(require,module,exports){
(function ($) {
    "use strict";

    angular.module('app')
        .directive('formControlMaterial', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.find('.form-control').tkFormControlMaterial();
                }
            };
        } ]);

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/angular/_ripple.js":[function(require,module,exports){
(function () {
    "use strict";

    var ripple = function (e) {

        var el, ink, d, x, y;

        el = angular.element(this);

        el.addClass('ripple');

        if (el.parents('.sidebar-skin-white').length) {
            el.addClass('ripple-dark-fade');
        }

        if (el.parents('.sidebar-skin-dark').length) {
            el.addClass('ripple-light-fade');
        }

        if (el.is('.btn-white')) {
            el.addClass('ripple-dark-fade');
        }

        if (el.attr('href') && ! el.data('toggle')) {

            e.preventDefault();
            e.stopPropagation();

            setTimeout(function () {
                document.location = el.attr('href');
            }, 400);
        }

        // create .ink element if it doesn't exist
        if (el.find(".ink").length === 0)
            el.prepend("<span class='ink'></span>");

        ink = el.find(".ink");
        // in case of quick double clicks stop the previous animation
        ink.removeClass("animate");

        // set size of .ink
        if (! ink.height() && ! ink.width()) {
            // use el's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(el.outerWidth(), el.outerHeight());
            ink.css({height: d, width: d});
        }

        // get click coordinates
        // logic = click coordinates relative to page - el's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - el.offset().left - ink.width() / 2;
        y = e.pageY - el.offset().top - ink.height() / 2;

        // set the position and add class .animate
        ink.css({top: y + 'px', left: x + 'px'}).addClass("animate");

    };

    angular.module('app')
        .directive('uiSref', [ function () {
            return {
                restrict: 'A',
                priority: 999,
                link: function (scope, el) {
                    if (el[ 0 ].nodeName == 'A' || el[ 0 ].nodeName == 'BUTTON') {
                        el.click(ripple);
                    }
                }
            };
        } ])
        .directive('btn', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.click(ripple);
                }
            };
        } ])
        .directive('sidebarMenu', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                priority: 999,
                link: function (scope, el) {
                    $timeout(function () {
                        el.find('>li>a').click(ripple);
                    });
                }
            };
        } ])
        .directive('navbarNav', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.find('>li>a').click(ripple);
                }
            };
        } ])
        .directive('dropdownMenu', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.find('>li>a').click(ripple);
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/angular/main.js":[function(require,module,exports){
require('./_ripple');
require('./_forms');
},{"./_forms":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/angular/_forms.js","./_ripple":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/angular/_ripple.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/main.js":[function(require,module,exports){
require('./_forms');
require('./_ripple');
},{"./_forms":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/_forms.js","./_ripple":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/_ripple.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/_responsive-videos.js":[function(require,module,exports){
(function ($) {

    // Find all YouTube videos
    var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com']"),

    // The element that is fluid width
    $fluidEl = $("panel");

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

        $(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });

    // When the window is resized
    $(".gallery-grid .panel").resize(function() {

        var newWidth = $fluidEl.width();

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

        });

    // Kick off one resize to fix all videos on page load
    }).resize();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/angular/_owl.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('owlBasic', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function(){
                        el.tkOwlDefault();
                    }, 200);
                }
            };
        } ])
        .directive('owlMixed', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function(){
                        el.tkOwlMixed();
                    }, 200);
                }
            };
        } ])
        .directive('owlPreview', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function(){
                        el.tkOwlPreview();
                    }, 200);
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/angular/_slick.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('slickBasic', [ '$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function(){
                        el.tkSlickDefault();
                    }, 200);
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/angular/main.js":[function(require,module,exports){
require('./_owl');
require('./_slick');
},{"./_owl":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/angular/_owl.js","./_slick":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/angular/_slick.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/main.js":[function(require,module,exports){
require('./owl/main');
require('./slick/_default');
},{"./owl/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/owl/main.js","./slick/_default":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/slick/_default.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/owl/_default.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlDefault = function () {

        if (! this.length) return;

        var c = this;
        c.owlCarousel({
            dots: true,
            items: c.data('items') || 4,
            responsive: {
                1200: {
                    items: c.data('itemsLg') || 4
                },
                992: {
                    items: c.data('itemsMg') || 3
                },
                768: {
                    items: c.data('itemsSm') || 3
                },
                480: {
                    items: c.data('itemsXs') || 2
                },
                0: {
                    items: 1
                }
            },
            rtl: this.data('rtl'),
            afterUpdate: function () {
                $(window).trigger('resize');
            }
        });

    };

    $(".owl-basic").each(function () {
        $(this).tkOwlDefault();
    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/owl/_mixed.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlMixed = function () {

        if (! this.length) return;

        this.owlCarousel({
            items: 2,
            nav: true,
            dots: false,
            rtl: this.data('rtl'),
            navText: [ '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>' ],
            responsive: {
                1200: {
                    items: 2
                },
                0: {
                    items: 1
                }
            }
        });

    };

    $(".owl-mixed").tkOwlMixed();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/owl/_preview.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var syncPosition = function (e, target) {
        if (e.namespace && e.property.name === 'items') {
            target.trigger('to.owl.carousel', [e.item.index, 300, true]);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkOwlPreview = function () {

        if (! this.length) return;

        var target = $(this.data('sync')),
            preview = this,
            rtl = this.data('rtl');

        if (! target.length) return;

        this.owlCarousel({
            items: 1,
            slideSpeed: 1000,
            dots: false,
            responsiveRefreshRate: 200,
            rtl: rtl,
            nav: true,
            navigationText: [ '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>' ]
        });

        this.on('change.owl.carousel', function(e){
            syncPosition(e, target);
        });

        target.owlCarousel({
            items: 5,
            responsive: {
                1200: {
                    items: 7
                },
                768: {
                    items: 6
                },
                480: {
                    items: 3
                },
                0: {
                    items: 2
                }
            },
            dots: false,
            nav: true,
            responsiveRefreshRate: 100,
            rtl: rtl,
            afterInit: function (el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        target.on('change.owl.carousel', function(e){
            syncPosition(e, preview);
        });

        target.find('.owl-item').click(function (e) {
            e.preventDefault();
            var item = $(this).data("owl-item");
            preview.trigger("to.owl.carousel", [item.index, 300, true]);
        });

    };

    $(".owl-preview").tkOwlPreview();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/owl/main.js":[function(require,module,exports){
require('./_default');
require('./_mixed');
require('./_preview');
},{"./_default":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/owl/_default.js","./_mixed":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/owl/_mixed.js","./_preview":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/owl/_preview.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/slick/_default.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlickDefault = function () {

        if (! this.length) return;

        if (typeof $.fn.slick == 'undefined') return;

        var c = this;
        
        c.slick({
            dots: true,
            slidesToShow: c.data('items') || 3,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: c.data('itemsLg') || 4
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: c.data('itemsMd') || 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: c.data('itemsSm') || 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: c.data('itemsXs') || 2
                    }
                },
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ],
            rtl: this.data('rtl'),
            onSetPosition: function () {
                $(window).trigger('resize');
            }
        });

        $(document).on('sidebar.shown', function(){
            c.slickSetOption('dots', true, true);
        });

    };

    $(".slick-basic").each(function () {
        $(this).tkSlickDefault();
    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/main.js":[function(require,module,exports){
// Carousels
require('./carousel/main');

// Responsive Video iFrame Fix
require('./_responsive-videos');
},{"./_responsive-videos":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/_responsive-videos.js","./carousel/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/carousel/main.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/messages/js/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint320', function () {
        var img = $('.messages-list .panel ul img');
        $('.messages-list .panel ul').width(img.first().width() * img.length);
    });

    $(window).bind('exitBreakpoint320', function () {
        $('.messages-list .panel ul').width('auto');
    });

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/messages/js/main.js":[function(require,module,exports){
require('./_breakpoints');
},{"./_breakpoints":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/messages/js/_breakpoints.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var restore = function () {
            $("html").addClass('show-sidebar');
            $('.sidebar.sidebar-visible-desktop').not(':visible').each(function () {
                var options = sidebar.options($(this));
                sidebar.open($(this).attr('id'), options);
            });
        },
        hide = function () {
            $("html").removeClass('show-sidebar');
            $('.sidebar:visible').each(function () {
                sidebar.close($(this).attr('id'));
            });
        };

    $(window).bind('enterBreakpoint768', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint1024', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar').length) return;
        hide();
    });

    if ($(window).width() <= 480) {
        if (! $('.sidebar').length) return;
        hide();
    }

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_collapsible.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarCollapse = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li.dropdown > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('click');
        sidebar.off('mouseleave');
        sidebar.find('.dropdown').off('mouseover');
        sidebar.find('.dropdown').off('mouseout');

        $('body').off('mouseout', '#dropdown-temp .dropdown');

        sidebar.find('ul.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hide.bs.collapse')
            .off('hidden.bs.collapse');

        sidebar.find('#dropdown-temp').remove();

        sidebar.find('.hasSubmenu').removeClass('dropdown')
            .find('> ul').addClass('collapse').removeClass('dropdown-menu submenu-hide submenu-show')
            .end()
            .find('> a').attr('data-toggle', 'collapse').on('click', function(e){
                e.preventDefault();
            });

        sidebar.find('.collapse').on('shown.bs.collapse', function () {
            sidebar.find('[data-scrollable]').getNiceScroll().resize();
        });

        // Collapse
        sidebar.find('.collapse').on('show.bs.collapse', function (e) {
            e.stopPropagation();
            var parents = $(this).parents('ul:first').find('> li.open > ul');
            if (parents.length) {
                parents.collapse('hide').closest('.hasSubmenu').removeClass('open');
            }
            $(this).closest('.hasSubmenu').addClass('open');
        });

        sidebar.find('.collapse').on('hidden.bs.collapse', function (e) {
            e.stopPropagation();
            $(this).closest('.hasSubmenu').removeClass('open');
        });

        sidebar.find('.collapse').collapse({ toggle: false });

    };

    $('.sidebar[data-type="collapse"]').each(function(){
        $(this).tkSidebarCollapse();
    });

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_dropdown.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarDropdown = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hidden.bs.collapse');

        var nice = sidebar.find('[data-scrollable]').getNiceScroll()[ 0 ];

        nice.scrollstart(function () {
            if (! sidebar.is('[data-type="dropdown"]')) return;
            sidebar.addClass('scrolling');
            sidebar.find('#dropdown-temp > ul > li').empty();
            sidebar.find('#dropdown-temp').hide();
            sidebar.find('.open').removeClass('open');
        });

        nice.scrollend(function () {
            if (! sidebar.is('[data-type="dropdown"]')) return;
            $.data(this, 'lastScrollTop', nice.getScrollTop());
            sidebar.removeClass('scrolling');
        });

        sidebar.find('.hasSubmenu').addClass('dropdown').removeClass('open')
            .find('> ul').addClass('dropdown-menu').removeClass('collapse in').removeAttr('style')
            .end()
            .find('> a').removeClass('collapsed')
            .removeAttr('data-toggle');

        sidebar.find('.sidebar-menu > li.dropdown > a').on('mouseenter', function () {

            var c = sidebar.find('#dropdown-temp');

            sidebar.find('.open').removeClass('open');
            c.hide();

            if (! $(this).parent('.dropdown').is('.open') && ! sidebar.is('.scrolling')) {
                var p = $(this).parent('.dropdown'),
                    t = p.find('> .dropdown-menu').clone().removeClass('submenu-hide');

                if (! c.length) {
                    c = $('<div/>').attr('id', 'dropdown-temp').appendTo(sidebar);
                    c.html('<ul><li></li></ul>');
                }

                c.show();
                c.find('.dropdown-menu').remove();
                c = c.find('> ul > li').css({overflow: 'visible'}).addClass('dropdown open');

                p.addClass('open');
                t.appendTo(c).css({
                    top: p.offset().top - c.offset().top,
                    left: '100%'
                }).show();

                if (sidebar.is('.right')) {
                    t.css({
                        left: 'auto',
                        right: '100%'
                    });
                }
            }
        });

        sidebar.find('.sidebar-menu > li > a').on('mouseenter', function () {

            if (! $(this).parent().is('.dropdown')) {
                var sidebar = $(this).closest('.sidebar');
                sidebar.find('.open').removeClass('open');
                sidebar.find('#dropdown-temp').hide();
            }

        });

        sidebar.find('.sidebar-menu > li > a').on('click', function (e) {
            if ($(this).parent().is('.dropdown')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        sidebar.on('mouseleave', function () {
            $(this).find('#dropdown-temp').hide();
            $(this).find('.open').removeClass('open');
        });

        sidebar.find('.dropdown').on('mouseover', function () {
            $(this).addClass('open').children('ul').removeClass('submenu-hide').addClass('submenu-show');
        }).on('mouseout', function () {
            $(this).children('ul').removeClass('.submenu-show').addClass('submenu-hide');
        });

        $('body').on('mouseout', '#dropdown-temp .dropdown', function () {
            $('.sidebar-menu .open', $(this).closest('.sidebar')).removeClass('.open');
        });

    };

    var transform_dd = function(){

        $('.sidebar[data-type="dropdown"]').each(function(){
            $(this).tkSidebarDropdown();
        });

    };

    var transform_collapse = function(){

        $('.sidebar[data-type="collapse"]').each(function(){
            $(this).tkSidebarCollapse();
        });

    };

    transform_dd();

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar[data-type="dropdown"]').length) return;
        $('.sidebar[data-type="dropdown"]').attr('data-type', 'collapse').attr('data-transformed', true);
        transform_collapse();
    });

    function make_dd() {
        if (! $('.sidebar[data-type="collapse"][data-transformed]').length) return;
        $('.sidebar[data-type="collapse"][data-transformed]').attr('data-type', 'dropdown').attr('data-transformed', true);
        transform_dd();
    }

    $(window).bind('enterBreakpoint768', make_dd);

    $(window).bind('enterBreakpoint1024', make_dd);

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_options.js":[function(require,module,exports){
module.exports = function (sidebar) {
    return {
        "transform-button": sidebar.data('transformButton') === true,
        "transform-button-icon": sidebar.data('transformButtonIcon') || 'fa-ellipsis-h'
    };
};
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_sidebar-menu.js":[function(require,module,exports){
(function ($) {

    var sidebars = $('.sidebar');

    sidebars.each(function () {

        var sidebar = $(this);
        var options = require('./_options')(sidebar);

        if (options[ 'transform-button' ]) {
            var button = $('<button type="button"></button>');

            button
                .attr('data-toggle', 'sidebar-transform')
                .addClass('btn btn-default')
                .html('<i class="fa ' + options[ 'transform-button-icon' ] + '"></i>');

            sidebar.find('.sidebar-menu').append(button);
        }
    });

}(jQuery));
},{"./_options":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_options.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_sidebar-toggle.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#subnav').collapse({'toggle': false});

    function mobilecheck() {
        var check = false;
        (function (a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    (function () {

        var defaults = {
                effect: 'st-effect-1',
                duration: 550,
                overlay: false
            },

            containerSelector = '.st-container',

            eventtype = mobilecheck() ? 'touchstart' : 'click',

            getLayoutClasses = function (sidebar, direction) {

                var layoutClasses = sidebar.data('layoutClasses');

                if (! layoutClasses) {
                    var toggleLayout = sidebar.data('toggleLayout');
                    if (typeof toggleLayout == 'string') {
                        layoutClasses = toggleLayout.split(",").join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                        return layoutClasses;
                    }

                    var match = new RegExp('sidebar-' + direction + '(\\S+)', 'ig');
                    layoutClasses = $('html').get(0).className.match(match);
                    if (layoutClasses !== null && layoutClasses.length) {
                        layoutClasses = layoutClasses.join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                    }
                }

                return layoutClasses;

            },

            getSidebarDataOptions = function(sidebar){

                return {
                    effect: sidebar.data('effect'),
                    overlay: sidebar.data('overlay')
                };

            },

            animating = function () {

                if ($('body').hasClass('animating')) return true;
                $('body').addClass('animating');

                setTimeout(function () {
                    $('body').removeClass('animating');
                }, defaults.duration);

                return false;

            },

            reset = function (id, options) {

                var container = $(containerSelector);

                var target = typeof id !== 'undefined' ? '#' + id : container.data('stMenuTarget'),
                    sidebar = $(target);

                if (! sidebar.length) return false;
                if (! sidebar.is(':visible')) return false;
                if (sidebar.hasClass('sidebar-closed')) return false;

                var effect = typeof options !== 'undefined' && options.effect ? options.effect : container.data('stMenuEffect'),
                    direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.hide', eventData);

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .removeClass('active')
                    .closest('li')
                    .removeClass('active');

                $('html').addClass(htmlClass);
                sidebar.addClass(effect);
                container.addClass(effect);

                container.removeClass('st-menu-open st-pusher-overlay');

                setTimeout(function () {
                    $('html').removeClass(htmlClass);
                    if (toggleLayout) $('html').removeClass(layoutClasses);
                    sidebar.removeClass(effect);
                    container.get(0).className = 'st-container'; // clear
                    sidebar.addClass('sidebar-closed').hide();
                    $(document).trigger('sidebar.hidden', eventData);
                }, defaults.duration);

            },

            open = function (target, options) {

                var container = $(containerSelector);

                var sidebar = $(target);
                if (! sidebar.length) return false;

                // on mobile, allow only one sidebar to be open at the same time
                if ($(window).width() < 768 && container.hasClass('st-menu-open')) {
                    return reset();
                }

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .addClass('active')
                    .closest('li')
                    .addClass('active');

                var effect = options.effect,
                    overlay = options.overlay;

                var direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.show', eventData);

                $('html').addClass(htmlClass);
                sidebar.show().removeClass('sidebar-closed');

                container.data('stMenuEffect', effect);
                container.data('stMenuTarget', target);

                sidebar.addClass(effect);
                container.addClass(effect);
                if (overlay) container.addClass('st-pusher-overlay');

                setTimeout(function () {
                    container.addClass('st-menu-open');
                    sidebar.find('[data-scrollable]').getNiceScroll().resize();
                    $(window).trigger('resize');
                }, 25);

                setTimeout(function () {
                    if (toggleLayout) $('html').addClass(layoutClasses);
                    $(document).trigger('sidebar.shown', eventData);
                }, defaults.duration);

            },

            toggle = function (e) {

                e.stopPropagation();
                e.preventDefault();

                var a = animating();
                if (a) return false;

                var button = $(this),
                    target = button.attr('href'),
                    sidebar;

                if (target.length > 3) {
                    sidebar = $(target);
                    if (! sidebar.length) return false;
                }

                if (target.length < 3) {
                    var currentActiveElement = $('[data-toggle="sidebar-menu"]').not(this).closest('li').length ? $('[data-toggle="sidebar-menu"]').not(this).closest('li') : $('[data-toggle="sidebar-menu"]').not(this);
                    var activeElement = $(this).closest('li').length ? $(this).closest('li') : $(this);

                    currentActiveElement.removeClass('active');
                    activeElement.addClass('active');

                    if ($('html').hasClass('show-sidebar')) activeElement.removeClass('active');

                    $('html').removeClass('show-sidebar');

                    if (activeElement.hasClass('active')) $('html').addClass('show-sidebar');
                    return;
                }

                var dataOptions = getSidebarDataOptions(sidebar),
                    buttonOptions = {};

                if (button.data('effect')) buttonOptions.effect = button.data('effect');
                if (button.data('overlay')) buttonOptions.overlay = button.data('overlay');

                var options = $.extend({}, defaults, dataOptions, buttonOptions);

                if (! sidebar.hasClass('sidebar-closed') && sidebar.is(':visible')) {
                    reset(sidebar.attr('id'), options);
                    return;
                }

                open(target, options);

            };

        $('body').on(eventtype, '[data-toggle="sidebar-menu"]', toggle);

        $(document).on('keydown', null, 'esc', function () {

            var container = $(containerSelector);

            if (container.hasClass('st-menu-open')) {
                reset();
                return false;
            }

        });

        /**
         * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
         */
        $.fn.tkSidebarToggleBar = function () {

            if (! this.length) return;

            var sidebar = this;

            /* Sidebar Toggle Bar */
            if (sidebar.data('toggleBar')) {
                var bar = $('<a></a>');
                bar.attr('href', '#' + sidebar.attr('id'))
                    .attr('data-toggle', 'sidebar-menu')
                    .addClass('sidebar-toggle-bar');

                sidebar.append(bar);
            }

        };

        $('.sidebar').each(function(){
            $(this).tkSidebarToggleBar();
        });

        window.sidebar = {

            open: function (id, options) {

                var a = animating();
                if (a) return false;

                options = $.extend({}, defaults, options);

                return open('#' + id, options);

            },

            close: function (id, options) {

                options = $.extend({}, defaults, options);

                return reset(id, options);

            },

            options: getSidebarDataOptions

        };

    })();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/angular/_sidebar-collapse.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('type', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (! el.is('.sidebar')) return;
                    if (attrs.type !== 'collapse') return;

                    el.tkSidebarCollapse();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/angular/_sidebar-dropdown.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('type', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    if (! el.is('.sidebar')) return;
                    if (attrs.type !== 'dropdown') return;

                    el.tkSidebarDropdown();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/angular/_sidebar-toggle-bar.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggleBar', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggleBar) {
                        el.tkSidebarToggleBar();
                    }
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/angular/main.js":[function(require,module,exports){
require('./_sidebar-dropdown');
require('./_sidebar-collapse');
require('./_sidebar-toggle-bar');
},{"./_sidebar-collapse":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/angular/_sidebar-collapse.js","./_sidebar-dropdown":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/angular/_sidebar-dropdown.js","./_sidebar-toggle-bar":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/angular/_sidebar-toggle-bar.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_sidebar-menu');
require('./_collapsible');
require('./_dropdown');
require('./_sidebar-toggle');

(function($){
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebar = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            menuType: false,
            toggleBar: false
        }, options);

        var sidebar = this;

        if (settings.menuType == "collapse") {
            sidebar.tkSidebarCollapse();
        }

        if (settings.menuType == "dropdown") {
            sidebar.tkSidebarDropdown();
        }

        if (settings.toggleBar === true) {
            sidebar.tkSidebarToggleBar();
        }

    };

})(jQuery);
},{"./_breakpoints":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_breakpoints.js","./_collapsible":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_collapsible.js","./_dropdown":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_dropdown.js","./_sidebar-menu":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_sidebar-menu.js","./_sidebar-toggle":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/_sidebar-toggle.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/all.js":[function(require,module,exports){
// App
require('./app.js');

// Routes
require('./routes/routes.js');

// Calendar
require('./calendar/calendar.controller.js');
require('./calendar/calendar.generator.controller.js');
require('./calendar/calendar.service.js');
require('./calendar/event.modal.controller.js');
require('./calendar/schedule.generator.service.js');

// Recurly v4
// require('./common/recurly.js');

// Common
require('./common/angular-ui-tinymce.js');
require('./common/annotator.store.min.js');
require('./common/annotator.touch.min.js');
require('./common/app.controller.js');
require('./common/imageonload.directive.js');
require('./common/jquery.grid-a-licious.js');
require('./common/jrating.directive.js');
require('./common/auth.service.js');
require('./common/backtop.directive.js');
require('./common/compile.directive.js');
require('./common/config.service.js');
require('./common/directives.js');
require('./common/filters.js');
require('./common/mw-annotator.directive.js');
require('./common/ng-switcher.directive.js');
require('./common/notification.service.js');
require('./common/push.service.js');
require('./common/session.service.js');
require('./common/setting.service.js');
require('./common/timepickerdirective.js');
require('./common/user.service.js');
require('./common/xeditable.tinymce.directive.js');
require('./common/ng-files.directive.js');
require('./common/croppie1.0.3.min.js');

// Dashboard
require('./dashboard/dashboard.controller.js');

// File
require('./file/resource.service.js');

// Categories
require('./categories/categories.controller.js');
require('./categories/featured.categories.directive.js');

// Category
require('./category/category.service.js');
require('./category/category.controller.js');
require('./category/category.slider.directive.js');

// Home
require('./home/home.controller.js');

// Forum
require('./forum/forum.service.js');
require('./forum/forum.course.controller.js');
require('./forum/forum.thread.controller.js');

// Gallery
require('./gallery/gallery.service.js');
require('./gallery/gallery.controller.js');

// Layout
require('./layout/header.controller.js');

// Lesson
require('./lesson/lesson.service.js');
require('./lesson/lesson.controller.js');
require('./lesson/flashcardmodal.directive.js');
require('./lesson/footnote.directive.js');
require('./lesson/flashcard.service.js');
require('./lesson/resource-modal.controller.js');

// Login
require('./login/login.controller.js');

// Page
require('./page/cms.service.js');
require('./page/page.controller.js');

// Pricing
require('./pricing/pricing.controller.js');

// Profile
require('./profile/profile.controller.js');
require('./profile/recurly.service.js');

// Member Map
require('./memberMap/memberMap.service.js');
require('./memberMap/memberMap.controller.js');

// Search
require('./search/search.service.js');
require('./search/search.controller.js');

// Support
require('./support/support.controller.js');

// Training
require('./training/training.controller.js');

},{"./app.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/app.js","./calendar/calendar.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/calendar.controller.js","./calendar/calendar.generator.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/calendar.generator.controller.js","./calendar/calendar.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/calendar.service.js","./calendar/event.modal.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/event.modal.controller.js","./calendar/schedule.generator.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/schedule.generator.service.js","./categories/categories.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/categories/categories.controller.js","./categories/featured.categories.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/categories/featured.categories.directive.js","./category/category.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/category/category.controller.js","./category/category.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/category/category.service.js","./category/category.slider.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/category/category.slider.directive.js","./common/angular-ui-tinymce.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/angular-ui-tinymce.js","./common/annotator.store.min.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/annotator.store.min.js","./common/annotator.touch.min.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/annotator.touch.min.js","./common/app.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/app.controller.js","./common/auth.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/auth.service.js","./common/backtop.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/backtop.directive.js","./common/compile.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/compile.directive.js","./common/config.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/config.service.js","./common/croppie1.0.3.min.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/croppie1.0.3.min.js","./common/directives.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/directives.js","./common/filters.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/filters.js","./common/imageonload.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/imageonload.directive.js","./common/jquery.grid-a-licious.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/jquery.grid-a-licious.js","./common/jrating.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/jrating.directive.js","./common/mw-annotator.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/mw-annotator.directive.js","./common/ng-files.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/ng-files.directive.js","./common/ng-switcher.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/ng-switcher.directive.js","./common/notification.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/notification.service.js","./common/push.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/push.service.js","./common/session.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/session.service.js","./common/setting.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/setting.service.js","./common/timepickerdirective.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/timepickerdirective.js","./common/user.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/user.service.js","./common/xeditable.tinymce.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/xeditable.tinymce.directive.js","./dashboard/dashboard.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/dashboard/dashboard.controller.js","./file/resource.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/file/resource.service.js","./forum/forum.course.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/forum/forum.course.controller.js","./forum/forum.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/forum/forum.service.js","./forum/forum.thread.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/forum/forum.thread.controller.js","./gallery/gallery.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/gallery/gallery.controller.js","./gallery/gallery.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/gallery/gallery.service.js","./home/home.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/home/home.controller.js","./layout/header.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/layout/header.controller.js","./lesson/flashcard.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/flashcard.service.js","./lesson/flashcardmodal.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/flashcardmodal.directive.js","./lesson/footnote.directive.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/footnote.directive.js","./lesson/lesson.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/lesson.controller.js","./lesson/lesson.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/lesson.service.js","./lesson/resource-modal.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/resource-modal.controller.js","./login/login.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/login/login.controller.js","./memberMap/memberMap.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/memberMap/memberMap.controller.js","./memberMap/memberMap.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/memberMap/memberMap.service.js","./page/cms.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/page/cms.service.js","./page/page.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/page/page.controller.js","./pricing/pricing.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/pricing/pricing.controller.js","./profile/profile.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/profile/profile.controller.js","./profile/recurly.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/profile/recurly.service.js","./routes/routes.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/routes/routes.js","./search/search.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/search/search.controller.js","./search/search.service.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/search/search.service.js","./support/support.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/support/support.controller.js","./training/training.controller.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/training/training.controller.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/app.js":[function(require,module,exports){
(function(){
    'use strict';

    angular.module('app', [
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.utils',
        'ui.jq',
        'ui.bootstrap',
        'duScroll',
        'ng-backstretch',
        'ipCookie',
        'xeditable',
        'ui.tinymce',
        'LocalStorageModule',
        'ngCroppie',
        'filereader',
        'ui.calendar',
        'ui.timepicker',
        'ngMap',
        'ui.sortable',
        '720kb.socialshare',
        'angularMoment',
        'monospaced.elastic',
        'bootstrapLightbox',
        'LocalStorageModule'
    ]);

    var app = angular.module('app')
        .config(
        [ '$controllerProvider', '$compileProvider', '$filterProvider', '$httpProvider', '$provide', '$interpolateProvider', 'LightboxProvider',
            function ($controllerProvider, $compileProvider, $filterProvider, $httpProvider, $provide, $interpolateProvider, LightboxProvider) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;

                /**
                 * CORS: allow cross-domain cookies/sessions/requests
                 */
                $httpProvider.defaults.withCredentials = true;
                //$httpProvider.defaults.useXDomain = true;
                //delete $httpProvider.defaults.headers.common['X-Requested-With'];

                //$interpolateProvider.startSymbol('::');
                //$interpolateProvider.endSymbol('::');

                // set a custom template for the angular bootstrap lightbox plugin
                LightboxProvider.templateUrl = 'tpl/gallery.modal.tpl.html';
                /*LightboxProvider.getImageUrl = function ( image ) {
                    return 'https://d3on0sn17ay79c.cloudfront.net/images/gallery/' + image.filename;
                };*/
                LightboxProvider.getImageCaption = function ( image ) {
                    return image.description;
                };

                // HTTP interceptor
                var myHttpInterceptor = ['$q', '$location', '$rootScope', 'AUTH_EVENTS', 'Config', '$injector', function ($q, $window, $rootScope,AUTH_EVENTS, Config, $injector) {

                    var response = function (response) {
                        //console.log(response);
                        if ( !response.config ) { return false; }
                        if(response.config.url.includes('api.')) {

                            // TODO: Had to do this due to circular dependency error.  Several workarounds available however: http://stackoverflow.com/questions/20647483/angularjs-injecting-service-into-a-http-interceptor-circular-dependency/21632161#21632161
                            var AuthService = $injector.get('AuthService');

                            if ( !angular.isObject( response.data ) ) {
                                console.log('uncaught api exception');
                                $rootScope.$broadcast('app-fatal-error', 'Uncaught API exception');
                                return $q.reject( 'Uncaught API exception' );
                            } else if ( response.status === 401 ) {
                                console.log('not authenticated');
                                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                                return $q.reject('Unauthenticated action');
                            } else if ( response.data.info.auth.logged_in  !== AuthService.authentication.isAuth &&
                                       !response.data.info.auth.logged_in ) {
                                console.log('not logged in');
                                $rootScope.$broadcast(AUTH_EVENTS.toLoginForm);
                                //return $q.reject('Not logged in');
                                return response.data.data;
                            } else if ( response.data.info.errors.length > 0 ){
                                console.log('returned with errors');
                                return $q.reject(response.data.info.errors);
                            } else if ( response.data.data ) {
                                return response.data.data;
                            } else {
                                console.error("Unknown routing error", response);
                                return $q.reject( 'Unknown error' );
                            }
                        } else {
                            return response;
                        }
                    };

                    return {
                        'response': response,
                        'responseError': response
                    }
                }];
                $httpProvider.interceptors.push( myHttpInterceptor );

                // SOMETHING TO ENABLE THE DYNAMIC-MAX directive or something
                var progressDecorator = function($delegate) {
                    var directive = $delegate[0];
                    var compile = directive.compile;
                    var link = directive.link;

                    directive.compile = function() {
                        compile.apply(this, arguments);
                        return function(scope, elem, attr, ctrl) {
                            link.apply(this, arguments);
                            if(angular.isDefined(attr.dynamicMax)) {
                                attr.$observe('dynamicMax', function(max) {
                                    console.log('inside dynamicMax');
                                    scope.max = max;
                                    scope.percent = +(100 * scope.value / max).toFixed(2);
                                });
                            }
                        };
                    };
                    return $delegate;
                };

                $provide.decorator('progressbarDirective', progressDecorator);
                $provide.decorator('barDirective', progressDecorator);
            }
        ])
        .run([ '$rootScope', '$state', 'Config', 'AuthService', 'Setting', '$templateCache', '$location', 'editableOptions', 'RecurlyService',
            function ( $rootScope, $state, Config, AuthService, Setting, $templateCache, $location, editableOptions, RecurlyService ) {
                $rootScope.$state = $state; // state to be accessed from view

                editableOptions.blurElem = "ignore";

                // GET / SET SITE SETTINGS
                var host = $location.host().replace( 'dev.', '' );
                Config.apiPath = $location.protocol() + '://api.' + host + '/';
                //Config.apiPath = '/api/';
                Setting.set();
                Setting.all().then(function( settings ) {
                    settings.map( function (setting) {
                        Config[setting.setting_name] = setting.setting_value;
                    });
                    $rootScope.siteConfig = Config;
                    console.log(Config);
                    RecurlyService.configure();
                });

                // Set auth data for logged-in user
                AuthService.fillAuthData();


                // Replace Angular UI Bootstrap module templates

                // Rating
                $templateCache.put("template/rating/rating.html",
                    "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
                    "    <span ng-repeat-start=\"r in range track by $index\" class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
                    "    <i ng-repeat-end ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" ng-hide=\"r.yadda\" class=\"fa fa-fw\" ng-class=\"$index < value && (r.stateOn || 'text-yellow-800 fa-star') || (r.stateOff || 'text-yellow-800 fa-star-o')\" ng-attr-title=\"{{r.title}}\" aria-valuetext=\"{{r.title}}\"></i>\n" +
                    "</span>\n" +
                    "");
            }
        ]);

    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized',
        showLoginForm: 'show-login-form',
        toLoginForm: 'to-login-form'
    });

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/calendar.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('CalendarCtrl', [
            '$scope', '$rootScope', '$stateParams', '$state', '$compile', 'uiCalendarConfig',
            '$timeout', 'Calendar', '$uibModal', 'Category', '$document', 'Config', '$timeout',
            function ( $scope, $rootScope, $stateParams, $state, $compile, uiCalendarConfig, 
                       $timeout, Calendar, $uibModal, Category, $document, Config, timeout ) {
console.log(uiCalendarConfig);
                            console.log(uiCalendarConfig.calendars);
            $scope.viewLoading = false;
            $scope.state = $state.current;
            $scope.events = [];
            $scope.asideVisible = false;
        	$scope.page.title = "Calendar";
        	$scope.page.breadcrumbText = "Plan your schedule for the school year! ";
            $scope.prepList = {
                date: {
                    startDate: moment(),
                    endDate: moment()
                }
            };
            $scope.resetCurrEvent = function () {
                $scope.currEvent = {
                    newDate: {
                        start_date: new Date(),
                        end_date: new Date()
                    }
                };
            };
            $scope.resetCurrEvent();

            $scope.fetchCalendars = function () {
                Calendar.getCalendars().then(function (calendars){
                    $scope.viewLoading = false;
                    $scope.calendars = calendars;
                    $scope.calendars.forEach(function (calendar){
                        if(calendar.active) {
                            calendar.active = true;

                            calendar.events = processRepeatingEvents( calendar.events );
                            calendar.events.forEach( function ( ev ) {
                                ev.start = moment( ev.start_date );
                                ev.end = moment( ev.end_date );
                                ev.allDay = ev.all_day;
        						ev.lid = ev.lesson_id;
                            });
                            
                            uiCalendarConfig.calendars.myCalendar1.fullCalendar('addEventSource', calendar);
                        }
                    });
                });
            };
            $scope.fetchCalendars();

            $scope.fetchLessons = function () {
                var dataRequest = {};
                dataRequest.deep = {
                    "include": ["lessons"]
                };
                dataRequest.conditions = {
                    "type": "lessons"
                };
                var DTO = {
                    "deep": JSON.stringify(dataRequest.deep),
                    "conditions": JSON.stringify(dataRequest.conditions)
                };
                Category.all( DTO ).then( function ( result ) {
                    var categories = [];
                    angular.forEach( result, function ( category ) {
                        if (category.parent_category_id == "0" || 0) {
                            categories[category.category_id] = category;
                        }
                    });
                    angular.forEach( result, function ( category ) {
                        if (category.parent_category_id !== "0" || 0) {
                            if( categories[category.parent_category_id]){
                                if( typeof categories[category.parent_category_id].sub_categories == 'undefined' ){
                                    categories[category.parent_category_id].sub_categories = [];
                                }
                                categories[category.parent_category_id].sub_categories.push( category );
                            }
                        }
                    });
                    // Reset indexes to 0, 1, 2, etc.
                    $scope.categories = categories.filter(function(){return true;});
                });
            };
            $scope.fetchLessons();

            $scope.toggleCalendar = function (calendar) {
                uiCalendarConfig.calendars['myCalendar1'].fullCalendar('refetchEvents');
                if(calendar.active){
                    calendar.active = false;
                    uiCalendarConfig.calendars['myCalendar1'].fullCalendar('removeEventSource', calendar);
                }else{
                    calendar.active = true;
                    uiCalendarConfig.calendars['myCalendar1'].fullCalendar('addEventSource', calendar);
                }
            };

            $scope.calChip = function (calendar) {
                if(calendar.active){
                    return { 'background-color': calendar.color || '#3a87ad' };
                }else{
                    return false;
                }
            };

            $scope.toNumber = function ( val ) {
                // numberic values should come first because of -0
                if (typeof val === 'number') return val;
                // we want all falsy values (besides -0) to return zero to avoid
                // headaches
                if (!val) return 0;
                if (typeof val === 'string') return parseFloat(val);
                // arrays are edge cases. `Number([4]) === 4`
                if (isArray(val)) return NaN;
                return Number(val);
            };

            $scope.addLessonEvent = function ( lesson, cat, cat2 ) {
                if ( lesson ) {
                    lesson.category = cat;
                    lesson.category.parent = cat2;
                    $scope.resetCurrEvent();
                    $scope.currEvent.lesson = lesson;
                    $scope.toggleAside( true );
                }
            };
            $scope.eventModal = function ( event ) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'tpl/event.modal.tpl.html',
                    controller: 'EventModalCtrl',
                    size: "md",
                    backdrop: "static",
                    keyboard: false,
                    resolve: {
                        event: function () {
                          return event || '';
                        },
                        bookmarkedCategories: function () { return $scope.bookmarkedCategories; }
                    }
                });
                modalInstance.result.then( function ( data ) {
                    var event = data[0];

                    if ( data[1] == 'delete' ) {

                        // Delete the event
                        if ( event.event_id ) {
                            Calendar.deleteEvent( event.event_id ).then( function () {
                                if ( event.repeatable || event.$repeated ) {
                                    $state.reload();
                                }
                            });
                        } else {
                            var newEv = {
                                event_id: event.parent_event_id,
                                date: moment( event.start_date ).format( "YYYY-MM-DD" )
                            };
                            Calendar.hideRepeatDate( newEv );
                        }

                        uiCalendarConfig.calendars['myCalendar1'].fullCalendar( 'removeEvents', event._id );

                    } else if ( data[1] == 'deleteUpcoming' ) {

                        // Update parent event, set repeat end date
                        var newEv = {
                            event_id: event.parent_event_id,
                            repeat_ends: moment( event.start_date ).subtract( 1, 'days' ).format( "YYYY-MM-DD" )
                        };

                        Calendar.updateEvent( newEv ).then( function () {
                            $state.reload();
                        });

                    } else if ( data[1] == 'process' ) {

                        // Create a simplified copy of the event object for sending to the API
                        // ALSO format the date object to a string
                        var newEv = {
                            event_id: event.event_id,
                            title: event.title,
                            start_date: formatDateObj( event.start_date ),
                            end_date: formatDateObj( event.end_date ),
                            all_day: event.all_day,
                        };
                        if ( event.lesson_id ) { newEv.lesson_id = event.lesson_id; }
                        if ( event.repeatable ) {
                            newEv.repeatable = true;
                            newEv.repeat_cycle = event.repeat_cycle;
                            newEv.repeat_ends = '';
                            if ( !event.repeat_ends_never && event.repeat_ends ) {
                                newEv.repeat_ends = moment( event.repeat_ends ).format( "YYYY-MM-DD" );
                            }
                            if ( event.repeat_every ) {
                                newEv.repeat_every = event.repeat_every;
                            }
                            if ( event.repeat_days ) { newEv.repeat_days = JSON.stringify( event.repeat_days ) };
                        } else {
                            newEv.repeatable = false;
                        }

                        if ( event.event_id ) {

                            // Make variables for the calendar to use
                            event.start = newEv.start_date;
                            event.end = newEv.end_date;
                            event.allDay = newEv.all_day;

                            // Update the event
                            Calendar.updateEvent( newEv ).then( function ( result ) {

                                if ( event.$was_repeatable || event.repeatable ) {
                                    $state.reload(); // Reload the state, until I can program a way to remove old repeated events and generate new ones
                                } else {
                                    if ( event.lesson_id ) {
                                        event.backgroundColor = result.backgroundColor;
                                        event.borderColor = result.borderColor;
                                        event.textColor = result.textColor;
                                    }
                                    // Update event programmatically
                                    uiCalendarConfig.calendars['myCalendar1'].fullCalendar('updateEvent', event);
                                }

                            });
                        } else {

                            // Create the event
                            Calendar.createEvent( newEv ).then( function ( result ) {

                                /*var ev = result;
                                ev.start = moment( ev.start_date );
                                ev.end = moment( ev.end_date );
                                ev.allDay = ev.all_day;
                                $scope.events.push( ev );*/
                                if ( event.$repeated ) {
                                    var hideEv = {
                                        event_id: event.parent_event_id,
                                        date: moment( event.start ).format( "YYYY-MM-DD" )
                                    };
                                    Calendar.hideRepeatDate( hideEv );

                                    // Make variables for the calendar to use
                                    event.start = newEv.start_date;
                                    event.end = newEv.end_date;
                                    event.allDay = newEv.all_day;
                                    delete event.$repeated;
                                    uiCalendarConfig.calendars['myCalendar1'].fullCalendar('updateEvent', event);

                                } else {
                                    var repeated = processRepeatingEvents( [ result ] );
                                    for (var i=0;i<repeated.length;i++) {
                                        repeated[i].start = moment( repeated[i].start_date );
                                        repeated[i].end = moment( repeated[i].end_date );
                                        repeated[i].allDay = repeated[i].all_day;
                                    }
                                    uiCalendarConfig.calendars.myCalendar1.fullCalendar('addEventSource', { events: repeated });
                                }

                            });
                        }
                    }
                });
            };

            // Prep List Generator
            $scope.generatePrepList = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'tpl/prep-generator.modal.tpl.html',
                    controller: function ($rootScope,$scope, $modalInstance) {
                        $scope.date1 = new Date();
                        $scope.date2 = new Date();
                        $scope.picker1 = { open: false };
                        $scope.picker2 = { open: false };
                        $scope.openPicker1 = function ( $event ) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            $scope.picker1.open = true;
                            $scope.picker2.open = false;
                        };
                        $scope.openPicker2 = function ( $event ) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            $scope.picker2.open = true;
                            $scope.picker1.open = false;
                        };
                        $scope.updateEndDate = function ( oldStartDate ) {
                            if( $scope.date1 && $scope.date2 ) {
                                var eDays = $scope.date2.getDate();
                                var sDays = new Date( oldStartDate );
                                var sNewDays = $scope.date1.getDate();
                                sDays = sDays.getDate();
                                $scope.date2.setDate( sNewDays + ( eDays - sDays ) );
                                $scope.date2 = new Date( $scope.date2 );
                            }
                        };
                        $scope.close = function ( data ) {
                            if( data ){
                                $modalInstance.close( [ $scope.date1, $scope.date2 ] );
                            } else {
                                $modalInstance.dismiss('cancel');
                            }
                        };
                    },
                    size: "md",
                });
                modalInstance.result.then( function ( dates ) {
                    // Generate the prep list
                    $scope.prepList.date.startDate = dates[0];
                    $scope.prepList.date.endDate = dates[1];
                    var params = {};
                    params.start_date = moment( dates[0] ).format( "YYYY-MM-DD" );
                    params.end_date = moment( dates[1] ).format( "YYYY-MM-DD" );
                    $scope.showPrepList = false;
                    Calendar.prepList( params ).then( function ( result ) {
                        $scope.prepList.data = result;
                        $scope.showPrepList = true;
                        console.log($scope.prepList, $scope.showPrepList);
                        $timeout( function () {
                            var ele = angular.element( document.getElementById( 'prep_list' ) );
                            $document.scrollToElement( ele, 80, 500 );
                        });
                    });
                });
            };
            $scope.closePrepList = function () {
                $scope.prepList.data = [];
                $scope.showPrepList = false;
            };
            $scope.printPdf = function (dt) { //alert('ss' + dt.startDate);
                var sdt = moment(dt.startDate).format( "YYYY-MM-DD" );
                var edt = moment(dt.endDate).format( "YYYY-MM-DD" );
                window.open(Config.apiPath + 'calendar/preplist/?start_date='+sdt+'&end_date='+edt+'&pdf=1', '_blank');
            };

            $scope.updateOnDrop = function ( event ) {
                if ( !event.end ) { event.end = event.start; }
                var newEv = {
                    event_id: event.event_id,
                    title: event.title,
                    start_date: formatDateObj( event.start ),
                    end_date: formatDateObj( event.end ),
                    all_day: event.all_day
                };

                if ( event.$repeated ) {
                    delete newEv.event_id;

                    var hideEv = {
                        event_id: event.parent_event_id,
                        date: moment( event.start_date ).format( "YYYY-MM-DD" )
                    };
                    Calendar.hideRepeatDate( hideEv );

                    // Make variables for the calendar to use
                    event.start_date = newEv.start_date;
                    event.end_date = newEv.end_date;

                    // Create the event
                    Calendar.createEvent( newEv ).then( function ( result ) {

                        /*var ev = result;
                        ev.start = moment( ev.start_date );
                        ev.end = moment( ev.end_date );
                        ev.allDay = ev.all_day;
                        $scope.events.push( ev );*/
                        if ( event.$repeated ) {
                            // Make variables for the calendar to use
                            event.start = newEv.start_date;
                            event.end = newEv.end_date;
                            event.allDay = newEv.all_day;
                            event.event_id = result.event_id;
                            delete event.$repeated;
                            uiCalendarConfig.calendars['myCalendar1'].fullCalendar('updateEvent', event);
                        }
                    });

                } else {
                    // Make variables for the calendar to use
                    event.start_date = newEv.start_date;
                    event.end_date = newEv.end_date;

                    Calendar.updateEvent( newEv ).then( function () {

                        if ( event.$was_repeatable ) {
                            $state.reload(); // Reload the state, until I can program a way to remove old repeated events and generate new ones
                        } else {
                            // Update event programmatically
                            uiCalendarConfig.calendars['myCalendar1'].fullCalendar('updateEvent', event);
                        }
                    });
                }
            };

            function formatDateObj ( date ) {
                return moment( date ).format( "YYYY-MM-DD HH:mm:ss" );
            }

            function deleteRepeatedEvents ( events ) {
                function checkRepeated ( event ) {
                    return ( event.$repeated );
                }

                return events.filter( checkRepeated );
            }

            function processRepeatingEvents ( events ) {
                var newEvents = [];
                angular.forEach( events, function ( event, key ) {
                    if ( event.repeatable ) {
                        // Go to work
                        if ( event.repeat_blocked_days ) {
                            event.repeat_blocked_days = JSON.parse( event.repeat_blocked_days );
                        } else { event.repeat_blocked_days = []; }

                            var today = moment( event.start_date );
                            var repeat_every = parseInt( event.repeat_every ) || 1;
                            var repeat_cycle = 'days';
                            var maxDays = 365;
                            if ( event.repeat_cycle == 'weekly' ) { repeat_cycle = 'weeks'; maxDays = 52 / repeat_every; } 
                            if ( event.repeat_cycle == 'monthly' ) { repeat_cycle = 'months'; maxDays = 12 / repeat_every; }
                            if ( event.repeat_ends ) {
                                var lastDay = moment( event.repeat_ends );
                                maxDays = lastDay.diff( today, repeat_cycle );
                            }

                            if ( event.repeat_cycle == 'weekly' && event.repeat_days ) {
                                repeat_cycle = 'days';
                                maxDays = 365;
                            }

                            for ( var i=0;i<=maxDays;i++ ) {
                                var day = today.add( repeat_every, repeat_cycle );
                                var formatted = day.format( 'YYYY-MM-DD HH:mm:ss' );
                                var flag = true;
                                if ( event.repeat_cycle == 'weekly' && event.repeat_days ) {
                                    flag = false;
                                    var dayOfWeek = day.format( 'dddd' ).toLowerCase();
                                    if ( event.repeat_days.hasOwnProperty( dayOfWeek ) ) {
                                        if ( event.repeat_days[ dayOfWeek ] ) {
                                            flag = true;
                                        }
                                    }
                                }
                                // Run checks to make sure it isn't a blocked day
                                angular.forEach( event.repeat_blocked_days, function ( day ) {
                                    if ( formatted == day ) {
                                        flag = false;
                                    }
                                });

                                if ( !flag ) { continue; }
                                var newbie = angular.copy( event );
                                //newbie.id = newbie.event_id;
                                delete newbie.event_id;
                                newbie.parent_event_id = event.event_id;
                                newbie.start_date = formatted;
                                newbie.$repeated = true;
                                //newbie.editable = false;
                                newbie.repeatable = false;

                                newEvents.push( newbie );
                            }
                    }
                });
                events = events.concat( newEvents );
                return events;
            }


            /* 
            ** 
            ** DEMO CONTENT BEGINS 
            **
            */

            /* alert on Drop */
            $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
                var newevent = {};
                if( event.event_id ) {
                    $scope.toggleAside( false );
                    newevent.start_date = event.start._d.toISOString().slice(0, 19).replace('T', ' ');
                    newevent.end_date = event.end;
                    if( event.end ){
                        newevent.end_date = event.end._d.toISOString().slice(0, 19).replace('T', ' ');
                    }
                    newevent.event_id = event.event_id;
                    newevent.user_id = event.user_id;
                    Calendar.updateEvent(newevent).then(function (result){
                        event.start_date = newevent.start_date;
                        event.end_date = newevent.end_date;
                    },function (errors){
                        revertFunc();
                        $scope.alertMessage = "ERRORS OCCURED: "+errors[0];
                    });
                }
            };
            /* alert on Resize */
            $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
                if( event.event_id ) {
                    var newevent = {};
                    newevent.start_date = event.start._d.toISOString().slice(0, 19).replace('T', ' ');
                    newevent.end_date = event.end._d.toISOString().slice(0, 19).replace('T', ' ');
                    newevent.event_id = event.event_id;
                    newevent.user_id = event.user_id;
                    Calendar.updateEvent(newevent).then(function (result){
                        event.start_date = newevent.start_date;
                        event.end_date = newevent.end_date;
                    },function (errors){
                        revertFunc();
                        $scope.alertMessage = "ERRORS OCCURED: "+errors[0];
                    });
                }
                $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
                $scope.toggleAside( false );
            };
            /* remove event */
            $scope.remove = function(index) {
                $scope.events.splice(index,1);
            };
            /* Change View */
            $scope.changeView = function(view,calendar) {
                uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
                $scope.toggleAside( false );
            };
            /* Change View */
            $scope.renderCalender = function(calendar) {
                if(uiCalendarConfig.calendars[calendar]){
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            };
            /* Render Tooltip */
            $scope.eventRender = function( event, element, view ) {
                element.attr({'uib-tooltip': event.title,
                    'tooltip-append-to-body': true});
                console.log(event);
                if ( event.lesson ) {
                    if ( event.lesson.is_completed ) {
                		element.find('.fc-content').prepend( '<i  class="fa fa-check"></i>' );
                        element.addClass('completed-lesson-event');
                    }
                }
                $compile(element)($scope);
            };
            /* config object */
            $scope.uiConfig = {
                calendar:{
                    height: 'auto',
                    editable: true,
                    durationEditable: true,
                    header:{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    droppable: true,
                    drop: function (date, allDay, jsEvent, ui) {
        		        var newEv = {};
                        newEv = {
        		            newDate: {
                                start_date: moment( date ).format( "YYYY-MM-DD HH:mm:ss" ),
        		                end_date: moment( date ).format( "YYYY-MM-DD HH:mm:ss" )
                            },
                            lesson_id : jsEvent.helper.context.id,
                            lesson: {lesson_id : jsEvent.helper.context.id}
                        };
        	        	newEv.all_day = '';
        	            $scope.processEvent(newEv);
                    },
                    dayClick: function( date, allDay, jsEvent, view ) {
                        var event = {};
                        event.all_day = ( date.format( "HH:mm:ss" ) == '00:00:00' );
                        event.start_date = date.format( "YYYY-MM-DD HH:mm:ss" );
                        event.end_date = event.start_date;
                        $scope.eventModal( event );
                    },
                    eventClick: $scope.eventModal,
                    eventDrop: $scope.updateOnDrop,
                    eventResize: $scope.alertOnResize,
                    eventRender: $scope.eventRender
                }
            };

            /* event sources array*/
            $scope.eventSources = [$scope.events];

            $scope.panelopen1 = false;
            $scope.panelopen2 = false;
            $scope.panelopen3 = true;

            /* Detect mobile screen*/
            $scope.isMobile = {
                Android: function() { return navigator.userAgent.match(/Android/i); },
                BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
                iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
                Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
                Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
                any: function() { return ($scope.isMobile.Android() || $scope.isMobile.BlackBerry() || $scope.isMobile.iOS() || $scope.isMobile.Opera() || $scope.isMobile.Windows());
                }
            };
            if (!$scope.isMobile.any()) {
                $scope.mobile = false;
            }
            if ($scope.isMobile.any()){
                $scope.mobile = true;
            }
            $scope.addEventPopup = function(category_name,lesson_order,lesson_id){
                var title = category_name+" : "+lesson_order;
                $scope.currEvent.title = title;
                $scope.currEvent.lesson_id = lesson_id;
                var newEv = {};
                newEv = {
                    newDate: {
                        start_date: moment( new Date() ).format( "YYYY-MM-DD HH:mm:ss" ),
                        end_date: moment( new Date() ).format( "YYYY-MM-DD HH:mm:ss" )
                    },
                    lesson_id : lesson_id,
                    lesson: {lesson_id : lesson_id}
                };

                newEv.all_day = '';
                $scope.processEvent(newEv);
                var data = $scope;
                var modalInstance = $modal.open({
                    templateUrl: 'app/calendar/event.add.modal.tpl.html',
                    controller: function ($rootScope,$scope, $modalInstance, data) {
                        $scope.data = data;
                        $rootScope.close = function (event) {
                            if( event ){
                                $modalInstance.close( event );
                            } else {
                                $modalInstance.dismiss('cancel');
                            }
                        };
                    },
                    size: "lg",
                    resolve: {
                        data: function () {
                            return data;
                        }
                    }
                });
            };

        } ]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/calendar.generator.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('CalendarGeneratorCtrl', ['$scope', 'Category', 'Calendar', 'User', 'scheduleGenerator', 'localStorageService', function ( $scope, Category, Calendar, User, scheduleGenerator, localStorageService ) {
  
            $scope.myCourses = [];
            $scope.scheduledCourses = [];

            // Pull and set data from the localstorage
            var courses = localStorageService.get('scheduledCourses');
            if ( courses ) {
              angular.forEach( courses, function ( cat, key ) {
                courses[key].units = Category.getUnitLessons( cat );
                courses[key].remaining_lessons = cat.total_lessons - cat.completed_lessons;
              });
            }

            $scope.daysLeft = 0;
            $scope.daysLeftTotal = 0;
            $scope.startDate = '2017-07-25';
            $scope.success = '';
            $scope.loadingUser = true;

            // FETCH user bookmarked categories
            $scope.loading = true;
            var request = { 'deep': { 'include': [ 'lessons', 'units', 'parent_category' ] } };
            Category.bookmarked( request ).then( function ( categories ) {
              categories = Category.addCategoryToLessons( categories );
              console.log(categories);
              var newCats = [];
              angular.forEach( categories, function ( cat, key ) {
                
                categories[key].units = Category.getUnitLessons( cat );
                categories[key].remaining_lessons = cat.total_lessons - cat.completed_lessons;

                // SET initial unit checkbox based on lessons completed or not
                for (var i=0;i<cat.units.length; i++) {
                  var flag = true;
                  for (var j=0;j<cat.units[i].lessons.length; j++) {
                    if ( typeof cat.units[i].lessons[j].hide == 'undefined' ) {
                      cat.units[i].lessons[j].hide = false;
                    }

                    if ( cat.units[i].lessons[j].is_completed ) {
                      flag = false;
                    }
                  }
                  categories[key].units[i].checked = flag;
                }

                // Filter out redundant courses already loaded from localstorage
                if ( courses ) {
                  var flag = false;
                  angular.forEach( courses, function ( course, ckey ) {
                    if ( course.category_id == cat.category_id ) {
                      flag = true;
                      
                      // update is_completed values in local storage from fresh api call
                      // loop through new lessons
                      angular.forEach( cat.lessons, function ( lesson ) {
                        // loop through old cached lessons
                        for (var o=0;o<course.lessons.length;o++) {
                          if ( course.lessons[o].lesson_id == lesson.lesson_id ) {
                            courses[ckey].lessons[o].is_completed = lesson.is_completed;
                          }
                        }
                      });

                      /*// Update unit checkboxes to reflect lessons inside
                      checkUnitToggled( $index, $parent.$index );
                      ckey*/
                    }
                  });
                  if ( flag ) {
                    return;
                  }
                }
                newCats.push( categories[key] );
              });

              $scope.myCourses = newCats;
              $scope.loading = false;
              console.log('YAPPA!', $scope.myCourses);
            });

            $scope.unitToggled = function ( checked, unit, course ) {
              console.log('unitToggled');
              for (var i=0;i<$scope.scheduledCourses[course].units[unit].lessons.length;i++) {
                $scope.scheduledCourses[course].units[unit].lessons[i].hide = !checked;
              }
            };
            $scope.checkUnitToggled = function ( unit, course ) {
              console.log('checkUnitToggled');
              var flag = true;
              for (var i=0;i<$scope.scheduledCourses[course].units[unit].lessons.length;i++) {
                if ( $scope.scheduledCourses[course].units[unit].lessons[i].is_completed ) { continue; }
                console.log('hiding?? : ' + $scope.scheduledCourses[course].units[unit].lessons[i].hide);
                if ( typeof $scope.scheduledCourses[course].units[unit].lessons[i].hide == undefined ) {
                  $scope.scheduledCourses[course].units[unit].lessons[i].hide = false;
                }
                if ( $scope.scheduledCourses[course].units[unit].lessons[i].hide ) {
                  flag = false;
                  console.log('flagged!');
                }
              }
              $scope.scheduledCourses[course].units[unit].checked = flag;
            };


            // GENERATE available dates and date total count
            $scope.fetchLatestUserData( function ( user ) {
              console.log('user from callback: ',user);
              $scope.user = user;
              if ( $scope.user.settings ) {
                if ( $scope.user.settings.calendar ) {
                  console.log($scope.user.settings);
                  $scope.availableDays = scheduleGenerator.calcAvailableDays( $scope.user.settings );
                  $scope.daysLeft = ( $scope.availableDays ) ? $scope.availableDays.length : 0;
                  $scope.daysLeftTotal = ( $scope.availableDays ) ? $scope.availableDays.length : 0;

                  // Set data from the localstorage to be used in the scope
                  if ( courses ) {
                    $scope.scheduledCourses = courses;
                  }
                }
              }
              $scope.loadingUser = false;
            });

            // COUNT remaining days available
            $scope.scheduledCoursesCount = 0;
            $scope.$watch('scheduledCourses', function () {

              console.log('watching', $scope.scheduledCourses);
              // Update completed lesson counts
              angular.forEach( $scope.scheduledCourses, function ( course, index ) {
                var count = 0;
                angular.forEach( course.units, function ( unit ) {
                  angular.forEach( unit.lessons, function ( lesson ) {
                    if ( lesson.hide || lesson.is_completed ) { count++; }
                  });
                });
                $scope.scheduledCourses[index].completed_lessons = count;
                $scope.scheduledCourses[index].remaining_lessons = course.total_lessons - count;
              });
              console.log($scope.scheduledCourses);

              var days = $scope.scheduledCourses.reduce( function (total, course) {
                  return total + parseInt(course.remaining_lessons);
              }, 0);
              $scope.daysLeft = $scope.daysLeftTotal - days;

              // Save data in the localstorage
              localStorageService.set('scheduledCourses', $scope.scheduledCourses);

            }, true);

            // GENERATE the Schedule
            $scope.generateSchedule = function () {
                $scope.error = '';$scope.success = '';$scope.generating = true;

                var eventsWithLessons = scheduleGenerator.planEvents( 
                  $scope.scheduledCourses,
                  $scope.availableDays,
                  $scope.user
                );
                console.log(eventsWithLessons);

                Calendar.createScheduleEvents( eventsWithLessons ).then( function () {
                    $scope.success = true;
                    $scope.generating = false;
                }, function () {
                    $scope.error = 'something';
                    $scope.generating = false;
                });
            };

            // DELETE generated events
            $scope.clearSchedule = function () {
              Calendar.deleteScheduleEvents().then( function () {
                $scope.clearedSchedule = true;
              });
            };

            // SORTABLE List options
            $scope.coursesSortOptions = {
                  placeholder: "btn btn-success btn-stroke btn-block btn-placeholder",
                  connectWith: ".apps-container",
                  helper: function(e, item) {
                    //console.log("list " + _listName + ": helper");
                    return item;
                  },
                  activate: function() {
                      /*console.log("list " + _listName + ": activate");*/
                  },
                  beforeStop: function() {
                      // console.log("list " + _listName + ": beforeStop");
                  },
                  change: function() {
                      // console.log("list " + _listName + ": change");
                  },
                  create: function() {
                      // console.log("list " + _listName + ": create");
                  },
                  deactivate: function() {
                      // console.log("list " + _listName + ": deactivate");
                  },
                  out: function() {
                      // console.log("list " + _listName + ": out");
                  },
                  over: function() {
                      // console.log("list " + _listName + ": over");
                  },
                  receive: function() {
                      // console.log("list " + _listName + ": receive");
                  },
                  remove: function() {
                      // console.log("list " + _listName + ": remove");
                  },
                  sort: function() {
                      // console.log("list " + _listName + ": sort");
                  },
                  start: function() {
                      // console.log("list " + _listName + ": start");
                  },
                  stop: function() {
                      // console.log("list " + _listName + ": stop");
                  }
                  /*update: function ( event, ui ) {
                      if ( ui.item[0].attributes.index ) {
                          var $index = ui.item[0].attributes.index.value;
                          var course = $scope.myCourses[$index];

                          // Check if we have enough days to add this course to the schedule
                          if ( $scope.daysLeft-parseInt(course.remaining_lessons) < 0 ) {
                              // Cancel the action
                              ui.item.sortable.cancel();
                              alert("You don't have enough days available to add this course");
                          }
                      }
                  }*/
            };

            $scope.scheduleSortOptions = {
                  placeholder: "btn btn-success btn-stroke btn-block btn-placeholder",
                  connectWith: ".apps-container",
                  handle: '> .myHandle',
            };

        } ]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/calendar.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('Calendar', ['$http', 'Config', function ( $http, Config ) {

            var prefix = Config.apiPath + 'calendar';

            function getCalendars (DTO){
                return $http( { method: 'GET', url: prefix + '/', params: DTO } );
            }

            function prepList ( date ) {
                return $http( { method: 'GET', url: prefix + '/preplist', params: date } );
            }

            function updateEvent (event) {
                return $http.put( prefix + '/event/' + event.event_id, event );
            }

            function deleteEvent (event_id) {
                return $http.delete( prefix + '/event/' + event_id );
            }

            function createEvent ( event ) {
                return $http.post( prefix + '/event', event );
            }

            function getTodaysEvents ( data ) {
                return $http.get( prefix + '/event/today', { params: data } );
            }

            function createScheduleEvents ( events ) {
                return $http.post( prefix + '/events/schedule', events );
            }

            function deleteScheduleEvents ( events ) {
                return $http.delete( prefix + '/events/schedule' );
            }

            function hideRepeatDate ( event ) {
                return $http.put( prefix + '/event/' + event.event_id + '/hideRepeatDate', event );
            }

            return {
                getCalendars: getCalendars,
                prepList: prepList,
                updateEvent: updateEvent,
                deleteEvent: deleteEvent,
                createEvent: createEvent,
                getTodaysEvents: getTodaysEvents,
                createScheduleEvents: createScheduleEvents,
                deleteScheduleEvents: deleteScheduleEvents,
                hideRepeatDate: hideRepeatDate
            }
        }]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/event.modal.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('EventModalCtrl', [ '$scope', '$uibModalInstance', 'event', 'bookmarkedCategories', function ( $scope, $uibModalInstance, event, bookmarkedCategories ) {

            $scope.bookmarkedCategories = bookmarkedCategories;

        	/*
        	 *	Set EVENT data whether editing or creating new event
        	 */
        	if ( event ) {
        		event.start_date = moment(event.start_date).toDate();
    	        event.start_time = moment(event.start_date).format( "hh:mm a" );
    		    event.end_date = ( event.end_date ) ? moment(event.end_date).toDate() : moment(event.start_date).toDate();
    			event.end_time = ( event.end_date ) ? moment(event.end_date).format( "hh:mm a" ) : moment(event.start_date).format( "hh:mm a" );
                if ( !event.repeat_ends ) { 
                    event.repeat_ends_never = true;
                } else {
                    event.repeat_ends = moment(event.repeat_ends).toDate();
                }
                if ( event.$repeated ) { 
                    event.end_date = event.start_date; event.end_time = event.start_time;
                }
                if ( event.repeatable ) { event.$was_repeatable = true; }
                event.repeat_cycle = ( event.repeat_cycle ) ? event.repeat_cycle : 'daily';
                event.repeat_every = event.repeat_every || 1;
        		$scope.event = event;
        	} else {
	            $scope.event = {
	                start_date: new Date(),
	                end_date: new Date(),
                    repeatable: false,
                    repeat_ends: '',
                    repeat_ends_never: true,
                    repeat_cycle: 'daily',
                    repeat_every: 1
	            };
	        }

            console.log( 'EVENT TO EDIT/CREATE: ', $scope.event );


	        /*
	         *	Modal close functions
			 */
            $scope.close = function () { $uibModalInstance.dismiss(); };
            $scope.delete = function ( ev ) { $uibModalInstance.close( [ ev, 'delete' ] ); };
            $scope.deleteAll = function ( ev ) { ev.event_id = ev.parent_event_id; $uibModalInstance.close( [ ev, 'delete',  ] ); };
            $scope.deleteUpcoming = function ( ev ) { $uibModalInstance.close( [ ev, 'deleteUpcoming' ] ); };
            $scope.process = function ( ev ) { $uibModalInstance.close( [ ev, 'process' ] ); };

            /*
             *  Lesson functions
             */
            $scope.chooseLesson = function ( lesson, category ) {
                lesson.category = category;
                $scope.event.title = category.parent.name.charAt(0) + lesson.lesson_order + ': ' + lesson.title;
                $scope.event.lesson = lesson;
                $scope.event.lesson_id = lesson.lesson_id;
            };
            $scope.removeLesson = function () {
                delete $scope.event.lesson;
                $scope.event.lesson_id = ''
            };

            /*
             *  Repeat functions
             */
             $scope.repeatCheckboxToggle = function () {
                if ( !$scope.event.repeatable ) {
                    $scope.isRepeatSettingsClosed = true;
                } else {
                    $scope.isRepeatSettingsClosed = false;
                }
             };


            /*
             *	Date Picker functions
             */
            $scope.picker1 = { open: false };
            $scope.picker2 = { open: false };
            $scope.picker3 = { open: false };
            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };
            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };

            $scope.openPicker1 = function ( $event ) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.picker1.open = true;
                $scope.picker2.open = false;
            };
            $scope.openPicker2 = function ( $event ) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.picker2.open = true;
                $scope.picker1.open = false;
            };
            $scope.openPicker3 = function ( $event ) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.picker3.open = true;
            };

            $scope.updateEndTime = function ( oldStartDate ) {
                if( $scope.event.start_date && $scope.event.end_date ) {
                    var eHrs = $scope.event.end_date.getTime();
                    var sHrs = new Date( oldStartDate );
                    var sNewHrs = $scope.event.start_date.getTime();
                    sHrs = sHrs.getTime();
                    $scope.event.end_date.setTime( sNewHrs + ( eHrs - sHrs ) );
                }
            };
            $scope.updateEndDate = function ( oldStartDate ) {
                if( $scope.event.start_date && $scope.event.end_date ) {
                    var eDays = $scope.event.end_date.getDate();
                    var sDays = new Date( oldStartDate );
                    var sNewDays = $scope.event.start_date.getDate();
                    sDays = sDays.getDate();
                    $scope.event.end_date.setDate( sNewDays + ( eDays - sDays ) );
                    $scope.event.end_date = new Date( $scope.event.end_date );
                }
            };
        } ]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/calendar/schedule.generator.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('scheduleGenerator', ['$http', 'Config', function ( $http, Config ) {

            function calcAvailableDays ( settings ) {
            	console.log( settings );
            	if ( settings.calendar ) {

            		// Start the process
                    var today = moment( new Date() );
                    var maxDays = 365;
                    if ( settings.calendar.first_day ) {
                        today = moment( settings.calendar.first_day );
                    }
                    if ( settings.calendar.last_day ) {
                        var lastDay = moment( settings.calendar.last_day );
                        maxDays = lastDay.diff( today, 'days' );
                    }
                    console.log(today, maxDays);
            		var days = [];
            		var weekdays = {
            			'Sunday': false,
            			'Monday': false,
            			'Tuesday': false,
            			'Wednesday': false,
            			'Thursday': false,
            			'Friday': false,
            			'Saturday': false
            		};
            		var goodDates = [];
            		angular.forEach( weekdays, function ( value, day ) {
            			// See if user has toggled on any of the days
            			if ( settings.calendar[day.toLowerCase()] ) {
            				weekdays[day] = true;
            			}
            		});

            		// Loop through 365 days, starting from today
            		for ( var i=0;i<=maxDays;i++ ) {
            			var day = today.add( 1, 'days' ); // +1 day
            			var formatted = day.format( "YYYY-MM-DD" );

            			// Check whether day should be accepted or not
            			var weekday = day.format('dddd');
            			if ( !weekdays[weekday] ) { continue; }

            			// Check wheter day falls within a forbidden range
            			if ( settings.calendar.break_ranges ) {
            				var skip = false;
            				angular.forEach( settings.calendar.break_ranges, function ( range ) {
            					if ( range[0] == formatted || range[1] == formatted ) {
            						// Date matches within the restricted range
            						skip = true;
            					} else if ( day.isAfter( moment(range[0]) ) && day.isBefore( moment(range[1]) ) ) {
            						// Date matches within the restricted range
            						skip = true;
            					}
            				});
            				if ( skip ) { continue; }
            			}

            			// ALL checks passed, this is a good date
            			goodDates.push( formatted );

            		}

            		// Finished, return the good days
            		return goodDates;

            	} else {
            		console.log('Error!', 'Can\'t find the settings anywhere');
            	}
            }

            function planEvents ( courses, days, user ) {
                console.log('courses: ', courses);
                console.log('days: ', days);
                console.log('rotation: ', user);
                var rotation = user.settings.calendar.rotation;
                var _events = [];
                var onDay = 0;

                if ( rotation == 'course' ) {
                    // DO 1 course until it is finished, then move on
                    angular.forEach( courses, function ( course ) {

                        angular.forEach( course.lessons, function ( lesson ) {
                            // SKIP completed lessons
                            if ( lesson.is_completed ) { return; }
                            // SKIP lessons marked by the user to skip
                            if ( lesson.hide ) { return; }

                            var date = days[onDay];
                            _events.push( genEvent( date, user, lesson ) );
                            onDay++;
                        });
                    });
                } else if ( rotation == 'unit' ) {
                    // Assign 1 lesson from each unit, from each course, and repeat

                    // Find the MAX number of units in a course
                    var unitTotals = courses.map( function ( course ) { return course.units.length; } );
                    var highest = Math.max.apply( this, unitTotals );

                    for ( var i=0;i<highest;i++ ) {
                        angular.forEach( courses, function ( course ) {

                            // Check if this course has that unit
                            if ( course.units[i] ) {
                                angular.forEach( course.units[i].lessons, function ( lesson ) {
                                    // SKIP completed lessons
                                    if ( lesson.is_completed ) { return; }
                                    // SKIP lessons marked by the user to skip
                                    if ( lesson.hide ) { return; }

                                    var date = days[onDay];
                                    _events.push( genEvent( date, user, lesson ) );
                                    onDay++;
                                });
                            }
                        });
                    }

                } else if ( rotation == 'lesson' ) {
                    // Assign 1 lesson from each course, and repeat

                    // Find the MAX number of lessons in a course
                    var lessonTotals = courses.map( function ( course ) { return course.lessons.length; } );
                    var highest = Math.max.apply( this, lessonTotals );

                    for ( var i=0;i<highest;i++ ) {
                        angular.forEach( courses, function ( course ) {

                            // Check if this course has that unit
                            if ( course.lessons[i] ) {
                                // SKIP completed lessons
                                if ( course.lessons[i].is_completed ) { return; }
                                // SKIP lessons marked by the user to skip
                                if ( course.lessons[i].hide ) { return; }

                                var date = days[onDay];
                                _events.push( genEvent( date, user, course.lessons[i] ) );
                                onDay++;
                            }
                        });
                    }
                }

                function genEvent ( date, user, lesson ) {
                    console.log(lesson);
                    var initial = lesson.category.parent.name.charAt(0);
                    return {
                        title: initial + lesson.lesson_order + ': ' + lesson.title,
                        start_date: date,
                        all_day: true,
                        user_id: user.user_id,
                        lesson_id: lesson.lesson_id,
                        scheduled: true
                    }
                }

                return _events;
            } 


            return {
                calcAvailableDays: calcAvailableDays,
                planEvents: planEvents
            }
        }]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/categories/categories.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('CategoriesCtrl', ['$scope', '$state', '$stateParams', 'Category', function ( $scope, $state, $stateParams, Category ) {
        	var catToLoad='';		// Used for loading a specific category as soon as the categories have loaded initially
        	$scope.level=1;			// Defines how deep in the category->sub-category chain we are currently at
        	$scope.state = $state.current.data;		// Allows the view to show the page title data from the $stateParams'
        	console.log($state.current);

        	/**
        	 * Function called from child states to load a respective category
        	 */
		    $scope.loadCategory = function ( label, sub_label ) {
		    	var lb = label;
		    	if ( sub_label ) { lb = sub_label; }

		    	if ( (sub_label && $scope.level == 1) || (!sub_label && $scope.level == 2) ) {
		    		console.log('calling fetchCategories from loadCategory');
		    		catToLoad = lb;
		    		fetchCategories( label, sub_label );
		    		$scope.state = $state.current.data;
		    	} else if ( $scope.categories ) {
		    		console.log('setting categories from loadCategory');
		    		setCategory( lb );
		    	} else {
		    		console.log('setting catToLoad from loadCategory');
		    		catToLoad = lb;
		    		fetchCategories();
		    	}
		    };

		    $scope.bookmarkCategory = function ( index ) {
		    	console.log($scope.category.sub_categories[index]);
				Category.bookmark( $scope.category.sub_categories[index].category_id );
				$scope.category.sub_categories[index].bookmarked = true;
			};

			$scope.unbookmarkCategory = function ( index ) {
				Category.removeBookmark( $scope.category.sub_categories[index].category_id );
				$scope.category.sub_categories[index].bookmarked = false;
			};

			$scope.changeRating = function ( index ) {
				var c = $scope.category.sub_categories[index];
				if ( c.my_rating ) {
					Category.rate( c.category_id, c.my_rating ).then( function ( result ) {
						c.total_rating = result.total_rating;
						c.ratings_count = result.ratings_count;
					});
				} else {
					Category.removeRating( c.category_id ).then( function ( result ) {
						c.total_rating = result.total_rating;
						c.ratings_count = result.ratings_count;
					});
				}
			};

			// Fetch featured categories
            Category.featured().then( function ( cats ) {
                $scope.featuredCats = cats;
            });


		    /**
        	 * Internal private function that sets a category based off the category's label
        	 */
		    function setCategory ( label ) {
		    	console.log('setting category');
		    	angular.forEach( $scope.categories, function ( category ) {
		    		if ( category.label == label ) {
		    			$scope.category = category;
		    		}
		    	});
		    }

		    /**
        	 * Call the Category service to retrieve categories that match the filters
        	 */
		    function fetchCategories ( label, sub_label ) {
		    	$scope.categories = '';
		    	$scope.category = '';
		    	// Fetch subject categories
			    var request = { 'deep': { 'include': [
			    	'sub_categories',
			    	'sub_categories.description',
			    	'sub_categories.lessons_count',
			    	'sub_categories.bookmarked',
			    	'sub_categories.sub_category_count',
			    	'sub_categories.my_rating', 
			    	'sub_categories.total_rating'
			    ] } };

			    if ( sub_label ) {
			    	$scope.level=2;
			    	request.filters = { 'parent_category.label': label };
			    } else {
			    	$scope.level=1;
			    	request.filters = { 'category.parent_category_id': 0 };
			    }
			    Category.all( request ).then( function ( categories ) {
			    	if ( !Array.isArray(categories) ) { categories = [ categories ]; }
			        $scope.categories = categories;
			        console.log(categories);
			        console.log('catToLoad',catToLoad);
			        if ( catToLoad ) {
			        	setCategory( catToLoad ); 
			        } else {
			        	$state.go( 'categories.group', { label: categories[1].label } );
			        }
			    });

		    }

		    if ( $state.current.name == 'categories' ) {
        		// Only need to initially load categories if we are at a root category, sub-categories already call this function
        		console.log('initial fetchCategories');
        		fetchCategories();
        	}

        	// RELOAD default category if transitioning from a sub category state to the original blank cat state with no cat selected
        	$scope.$on('$stateChangeSuccess', function ( event, toState, toParams, fromState, fromParams ) {
        		if ( fromState.name.includes( 'categories.' ) && toState.name == 'categories' ) {
        			$state.reload();
        		}
        	});
        }]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/categories/featured.categories.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('featuredCategories', function() {
			return {
				restrict: 'E',
				transclude: true,
			    scope: {
			    	size: '@size',
			    	items: '='
			    },
			    templateUrl: 'tpl/featured.categories.tpl.html',
			    link: function ( scope, element, attrs ) {
			    	if ( scope.size == 'lg' ) {
			    		scope.sizes = [ 4, 3, 2, 1 ];
			    	} else if ( scope.size == 'sm' ) { 
			    		scope.sizes = [ 1, 1, 1, 1 ]; 
			    	} else {
			    		scope.sizes = [ 4, 3, 2, 1 ];
			    	}
			    }
			};
		});

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/category/category.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('CategoryCtrl', ['$scope', '$state', '$stateParams', 'Category', '$timeout', '$uibModal', function ( $scope, $state, $stateParams, Category, $timeout, $uibModal ) {
        	/*$scope.hoveringOver = function(value) {
			    $scope.overStar = value;
			    $scope.percent = 100 * (value / 5);
			};*/

			$scope.bookmarkCategory = function () {
				Category.bookmark( $scope.category.category_id );
				$scope.category.bookmarked = true;
			};

			$scope.unbookmarkCategory = function () {
				Category.removeBookmark( $scope.category.category_id );
				$scope.category.bookmarked = false;
			};

			$scope.changeRating = function () {
				if ( $scope.category.my_rating ) {
					Category.rate( $scope.category.category_id, $scope.category.my_rating ).then( function ( result ) {
						$scope.category.total_rating = result.total_rating;
						$scope.category.ratings_count = result.ratings_count;
            $scope.reviewCourseAlert = "success";
            $scope.reviewCourseMsgTitle = "Success";
            $scope.reviewCourseMsg = "Setting updated successfully.";
					}, function(error) {
	                $scope.reviewCourseAlert = "danger";
                  $scope.reviewCourseMsgTitle = "Error";
                  $scope.reviewCourseMsg = "Setting not updated successfully.";
	            });
				} else {
					Category.removeRating( $scope.category.category_id ).then( function ( result ) {
						$scope.category.total_rating = result.total_rating;
						$scope.category.ratings_count = result.ratings_count;

					});;
				}
			};

			// Fetch featured categories
            Category.featured().then( function ( cats ) {
                $scope.featuredCats = cats;
            });

/*			// Changed category fetching to occur in resolve before controller initialization, ONLY because breadcrumbs parent setting wouldn't allow asynchronous $scope variables
			if ( category ) {
				category.units = Category.getUnitLessons( category );
				$scope.category = category;
				$scope.crumb1 = category.parent_category.parent.name;
			    $scope.crumb2 = category.parent_category.name;
			    console.log(category);
			} else {*/
	        	fetchCategory ( $stateParams.label );
	        //}

		    /**
        	 * Call the Category service to retrieve categories that match the filters
        	 */
		    function fetchCategory ( label ) {
		    	// Fetch subject categories
			    /*var request = {
			    	'deep': JSON.stringify( { 'include': [ 'sub_categories', 'sub_categories.description' ] } )
			    };
			    request.filters = JSON.stringify( { 'parent_category.label': label } );*/
			    var request = {
			    	'deep': JSON.stringify( { 'include': [ 'lessons', 'lessons_count', 'units', 'parent_category.parent', 'my_rating', 'total_rating' ] } )
			    };

			    Category.one( label, request ).then( function ( category, index ) {
			    	category.units = Category.getUnitLessons( category );
			    	console.log('units', category.units);
			    	// Figure out which unit to open
			    	for (var i=0;i<category.units.length;i++) {
						category.units[i].$openFirst = (index == 0) ? true : false;

			    		var isFull = true;
			    		angular.forEach( category.units[i].lessons, function (lesson) {
			    			if ( !lesson.is_completed ) { isFull = false; }
			    		});
						category.units[i].$openFirst = !isFull;
						if ( !isFull ) { break; }
			    	}

			        $scope.category = category;
			        /*$scope.crumb1 = category.parent_category.parent.name;
			        $scope.crumb2 = category.parent_category.name;*/
			        getCategorySlider($scope.category.category_id);
			        console.log(category);
			    });
		    }

		    // Insert/Update rating and message
	        $scope.reviewCourseFormSubmit = function(message) {
            $scope.processing = true;
	        	Category.rate( $scope.category.category_id, $scope.category.my_rating, message ).then( function ( result ) {
      						$scope.category.total_rating = result.total_rating;
      						$scope.category.ratings_count = result.ratings_count;
                  $scope.reviewCourseAlert = "success";
                  $scope.reviewCourseMsgTitle = "Success";
                  $scope.reviewCourseMsg = "Setting updated successfully.";
                  $scope.processing = false;
					}, function(error) {
	                console.log("Error :", error);
                  $scope.reviewCourseAlert = "danger";
                  $scope.reviewCourseMsgTitle = "Error";
                  $scope.reviewCourseMsg = "Setting not updated successfully.";
                  $scope.processing = false;
	            });
	        };

	        $scope.categoryMaterialsModal = function () {
        		var modalInstance = $uibModal.open({
	                templateUrl: 'tpl/category-materials.modal.tpl.html',
	                controller: function ( $scope, $uibModalInstance, category, user ) {
	                    $scope.viewLoading = true;
	                    $scope.category = category;
	                    $scope.user = user;
	                    $scope.close = function (d) {
	                        if(d) {
	                            $uibModalInstance.close(d);
	                        }else{
	                            $uibModalInstance.dismiss();
	                        }
	                    };
	                },
	                size: "lg",
	                keyboard: false,
	                resolve: {
	                	category: function () {
	                		return $scope.category;
	                	},
	                	user: function () {
	                		return $scope.user;
	                	}
	                }
	            });
	        };

          // Category slider
	        function getCategorySlider (id) {
	        	Category.getCategorySlider( id ).then( function ( result ) {
	        		var items = [];
	        		result.map( function (item) {
	        			if ( item.message ) { items.push( item ); }
	        		});
		        	$scope.catSliders = items;
		        }, function(error) {
		                console.log("Error :", error);
		        });
	        }

        }]);

})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/category/category.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('Category', ['$http', 'Config', '$q', function ( $http, Config, $q ) {

            var featuredCats;
            var prefix = Config.apiPath + 'category';

            function one ( id, data ) {
                return $http({ method: 'GET', url: prefix + '/' + id, params: data });
            }

            function all ( data ) {
                return $http.get( prefix, { params: data } );
            }

            function bookmarked ( data ) {
                return $http.get( prefix + '/bookmarked', { params: data } );
            }

            function bookmark ( id ) {
                return $http.post( prefix + '/' + id + '/bookmark' );
            }

            function removeBookmark ( id ) {
                return $http.delete( prefix + '/' + id + '/bookmark' );
            }

            function rate ( id, rate, message ) {
                if ( !message ) { var message = null; }
                return $http.post( prefix + '/' + id + '/rating', { rating: rate, message: message } );
            }

            function removeRating ( id ) {
                return $http.delete( prefix + '/' + id + '/rating' );
            }

            function featured () {
                var deferred = $q.defer();
                if ( featuredCats ) {
                    deferred.resolve( featuredCats );
                } else {
                    // Fetch featured categories
                    var request = { 'deep': { include: [ 'my_rating', 'total_rating' ] }, 'filters': { 'category.featured': '1' } };
                    all( request ).then( function ( categories ) {
                        featuredCats = categories;
                        deferred.resolve( featuredCats );
                    });
                }
                return deferred.promise;
            }

            // OLD LESSON BOOKMARK STUFF        
            function getFlashcardSetID ( category_id ) {
                return $http.get( Config.apiPath + 'flashcard/category/' + category_id );
            }

            function getUnitLessons ( category ) {
                var unitLessons = [];
                // Loop through lessons and assign to temporary array grouped by unit_id
                var mapped = category.lessons.map( function ( lesson ) {
                    var id = parseInt( lesson.unit_id, 10 );
                    if ( !unitLessons[id] ) {
                        unitLessons[id] = [];
                    }
                    unitLessons[id].push(lesson);
                });

                // Loop through units and assign lessons from temporary array
                for ( var i=0;i<category.units.length;i++ ) {
                    category.units[i].lessons = unitLessons[category.units[i].unit_id] || [];
                }

                return category.units; // array of objects, each object is each unit, along with a lessons property with an array of lessons
            }

            function addCategoryToLessons ( categories ) {
                angular.forEach( categories, function ( category, key ) {
                    // Remove unnecessary data
                    var cat = angular.copy( category );
                    delete cat.lessons;delete cat.units;

                    // Loop through lessons in the category and assign category to lesson
                    angular.forEach( categories[key].lessons, function ( lesson, indx ) {
                        categories[key].lessons[indx].category = cat;
                    });
                });
                return categories;
            }

            function getCategorySlider ( categoryId ) {
                return $http.get( prefix + '/' + categoryId + '/' + 'slider' );
            }

            return {
                one: one,
        		all: all,
                bookmarked: bookmarked,
                bookmark: bookmark,
                removeBookmark: removeBookmark,
                rate: rate,
                removeRating: removeRating,
                featured: featured,
                getFlashcardSetID: getFlashcardSetID,
                getUnitLessons: getUnitLessons,
                addCategoryToLessons: addCategoryToLessons,
                getCategorySlider: getCategorySlider
            }
        }]);
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/category/category.slider.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('categorySlider', function() {
			return {
				restrict: 'E',
				transclude: true,
			    scope: {
			    	size: '@size',
			    	items: '='
			    },
			    templateUrl: 'tpl/category.slider.tpl.html',
			    link: function ( scope, element, attrs ) {
			    	if ( scope.size == 'lg' ) {
			    		scope.sizes = [ 4, 3, 2, 1 ];
			    	} else if ( scope.size == 'sm' ) { 
			    		scope.sizes = [ 1, 1, 1, 1 ]; 
			    	} else {
			    		scope.sizes = [ 4, 3, 2, 1 ];
			    	}
			    }
			};
		});

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/angular-ui-tinymce.js":[function(require,module,exports){
/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', [])
  .value('uiTinymceConfig', {})
  .directive('uiTinymce', ['uiTinymceConfig', function (uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
      priority: 10,
      require: 'ngModel',
      link: function (scope, elm, attrs, ngModel) {
        var expression, options, tinyInstance,
          updateView = function () {
            ngModel.$setViewValue(elm.val());
            if (!scope.$root.$$phase) {
              scope.$apply();
            }
          };

        // generate an ID if not present
        if (!attrs.id) {
          attrs.$set('id', 'uiTinymce' + generatedIds++);
        }

        if (attrs.uiTinymce) {
          expression = scope.$eval(attrs.uiTinymce);
        } else {
          expression = {};
        }

        // make config'ed setup method available
        if (expression.setup) {
          var configSetup = expression.setup;
          delete expression.setup;
        }

        options = {
          // Update model when calling setContent (such as from the source editor popup)
          setup: function (ed) {
            var args;
            ed.on('init', function(args) {
              ngModel.$render();
              ngModel.$setPristine();
            });
            // Update model on button click
            ed.on('ExecCommand', function (e) {
              ed.save();
              updateView();
            });
            // Update model on keypress
            ed.on('KeyUp', function (e) {
              ed.save();
              updateView();
            });
            // Update model on change, i.e. copy/pasted text, plugins altering content
            ed.on('SetContent', function (e) {
              if (!e.initial && ngModel.$viewValue !== e.content) {
                ed.save();
                updateView();
              }
            });
            ed.on('blur', function(e) {
                elm.blur();
            });
            // Update model when an object has been resized (table, image)
            ed.on('ObjectResized', function (e) {
              ed.save();
              updateView();
            });
            if (configSetup) {
              configSetup(ed);
            }
          },
          mode: 'exact',
          elements: attrs.id
        };
        // extend options with initial uiTinymceConfig and options from directive attribute value
        angular.extend(options, uiTinymceConfig, expression);
        setTimeout(function () {
          console.log(options);
          tinymce.init(options);
        });

        ngModel.$render = function() {
          if (!tinyInstance) {
            tinyInstance = tinymce.get(attrs.id);
          }
          if (tinyInstance) {
            tinyInstance.setContent(ngModel.$viewValue || '');
          }
        };

        scope.$on('$destroy', function() {
          if (!tinyInstance) { tinyInstance = tinymce.get(attrs.id); }
          if (tinyInstance) {
            tinyInstance.remove();
            tinyInstance = null;
          }
        });
      }
    };
  }]);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/annotator.store.min.js":[function(require,module,exports){

/*
** Annotator v1.2.10
** https://github.com/okfn/annotator/
**
** Copyright 2015, the Annotator project contributors.
** Dual licensed under the MIT and GPLv3 licenses.
** https://github.com/okfn/annotator/blob/master/LICENSE
**
** Built at: 2015-02-26 03:26:47Z
 */


//

!function(){var __bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child},__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};Annotator.Plugin.Store=function(_super){__extends(Store,_super);Store.prototype.events={annotationCreated:"annotationCreated",annotationDeleted:"annotationDeleted",annotationUpdated:"annotationUpdated"};Store.prototype.options={annotationData:{},emulateHTTP:false,loadFromSearch:false,prefix:"/store",urls:{create:"/annotations",read:"/annotations/:id",update:"/annotations/:id",destroy:"/annotations/:id",search:"/search"}};function Store(element,options){this._onError=__bind(this._onError,this);this._onLoadAnnotationsFromSearch=__bind(this._onLoadAnnotationsFromSearch,this);this._onLoadAnnotations=__bind(this._onLoadAnnotations,this);this._getAnnotations=__bind(this._getAnnotations,this);Store.__super__.constructor.apply(this,arguments);this.annotations=[]}Store.prototype.pluginInit=function(){if(!Annotator.supported()){return}if(this.annotator.plugins.Auth){return this.annotator.plugins.Auth.withToken(this._getAnnotations)}else{return this._getAnnotations()}};Store.prototype._getAnnotations=function(){if(this.options.loadFromSearch){return this.loadAnnotationsFromSearch(this.options.loadFromSearch)}else{return this.loadAnnotations()}};Store.prototype.annotationCreated=function(annotation){var _this=this;if(__indexOf.call(this.annotations,annotation)<0){this.registerAnnotation(annotation);return this._apiRequest("create",annotation,function(data){if(data.id==null){console.warn(Annotator._t("Warning: No ID returned from server for annotation "),annotation)}return _this.updateAnnotation(annotation,data)})}else{return this.updateAnnotation(annotation,{})}};Store.prototype.annotationUpdated=function(annotation){var _this=this;if(__indexOf.call(this.annotations,annotation)>=0){return this._apiRequest("update",annotation,function(data){return _this.updateAnnotation(annotation,data)})}};Store.prototype.annotationDeleted=function(annotation){var _this=this;if(__indexOf.call(this.annotations,annotation)>=0){return this._apiRequest("destroy",annotation,function(){return _this.unregisterAnnotation(annotation)})}};Store.prototype.registerAnnotation=function(annotation){return this.annotations.push(annotation)};Store.prototype.unregisterAnnotation=function(annotation){return this.annotations.splice(this.annotations.indexOf(annotation),1)};Store.prototype.updateAnnotation=function(annotation,data){if(__indexOf.call(this.annotations,annotation)<0){console.error(Annotator._t("Trying to update unregistered annotation!"))}else{$.extend(annotation,data)}return $(annotation.highlights).data("annotation",annotation)};Store.prototype.loadAnnotations=function(){return this._apiRequest("read",null,this._onLoadAnnotations)};Store.prototype._onLoadAnnotations=function(data){var a,annotation,annotationMap,newData,_i,_j,_len,_len1,_ref;if(data==null){data=[]}annotationMap={};_ref=this.annotations;for(_i=0,_len=_ref.length;_i<_len;_i++){a=_ref[_i];annotationMap[a.id]=a}newData=[];for(_j=0,_len1=data.length;_j<_len1;_j++){a=data[_j];if(annotationMap[a.id]){annotation=annotationMap[a.id];this.updateAnnotation(annotation,a)}else{newData.push(a)}}this.annotations=this.annotations.concat(newData);return this.annotator.loadAnnotations(newData.slice())};Store.prototype.loadAnnotationsFromSearch=function(searchOptions){return this._apiRequest("search",searchOptions,this._onLoadAnnotationsFromSearch)};Store.prototype._onLoadAnnotationsFromSearch=function(data){if(data==null){data={}}return this._onLoadAnnotations(data.rows||[])};Store.prototype.dumpAnnotations=function(){var ann,_i,_len,_ref,_results;_ref=this.annotations;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){ann=_ref[_i];_results.push(JSON.parse(this._dataFor(ann)))}return _results};Store.prototype._apiRequest=function(action,obj,onSuccess){var id,options,request,url;id=obj&&obj.id;url=this._urlFor(action,id);options=this._apiRequestOptions(action,obj,onSuccess);request=$.ajax(url,options);request._id=id;request._action=action;return request};Store.prototype._apiRequestOptions=function(action,obj,onSuccess){var data,method,opts;method=this._methodFor(action);opts={type:method,crossDomain:true,xhrFields:{withCredentials:true},headers:this.element.data("annotator:headers"),dataType:"json",success:onSuccess||function(){},error:this._onError};if(this.options.emulateHTTP&&(method==="PUT"||method==="DELETE")){opts.headers=$.extend(opts.headers,{"X-HTTP-Method-Override":method});opts.type="POST"}if(action==="search"){opts=$.extend(opts,{data:obj});return opts}data=obj&&this._dataFor(obj);if(this.options.emulateJSON){opts.data={json:data};if(this.options.emulateHTTP){opts.data._method=method}return opts}opts=$.extend(opts,{data:data,contentType:"application/json; charset=utf-8"});return opts};Store.prototype._urlFor=function(action,id){var url;url=this.options.prefix!=null?this.options.prefix:"";url+=this.options.urls[action];url=url.replace(/\/:id/,id!=null?"/"+id:"");url=url.replace(/:id/,id!=null?id:"");return url};Store.prototype._methodFor=function(action){var table;table={create:"POST",read:"GET",update:"PUT",destroy:"DELETE",search:"GET"};return table[action]};Store.prototype._dataFor=function(annotation){var data,highlights;highlights=annotation.highlights;delete annotation.highlights;$.extend(annotation,this.options.annotationData);data=JSON.stringify(annotation);if(highlights){annotation.highlights=highlights}return data};Store.prototype._onError=function(xhr){var action,message;action=xhr._action;message=Annotator._t("Sorry we could not ")+action+Annotator._t(" this annotation");if(xhr._action==="search"){message=Annotator._t("Sorry we could not search the store for annotations")}else if(xhr._action==="read"&&!xhr._id){message=Annotator._t("Sorry we could not ")+action+Annotator._t(" the annotations from the store")}switch(xhr.status){case 401:message=Annotator._t("Sorry you are not allowed to ")+action+Annotator._t(" this annotation");break;case 404:message=Annotator._t("Sorry we could not connect to the annotations store");break;case 500:message=Annotator._t("Sorry something went wrong with the annotation store")}Annotator.showNotification(message,Annotator.Notification.ERROR);return console.error(Annotator._t("API request failed:")+(" '"+xhr.status+"'"))};return Store}(Annotator.Plugin)}.call(this);
//
//# sourceMappingURL=annotator.store.min.map
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/annotator.touch.min.js":[function(require,module,exports){
/*  Annotator Touch Plugin - v1.1.1
 *  Copyright 2012-2013, Compendio <www.compendio.ch>
 *  Released under the MIT license
 *  More Information: https://github.com/aron/annotator.touch.js
 */
((function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b=Object.prototype.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};Annotator.Plugin.Touch=function(b){function f(b,c){this._onDocumentTap=a(this._onDocumentTap,this),this._onHighlightTap=a(this._onHighlightTap,this),this._onAdderTap=a(this._onAdderTap,this),this._onToggleTap=a(this._onToggleTap,this),this._onSelection=a(this._onSelection,this),this._watchForSelection=a(this._watchForSelection,this),f.__super__.constructor.apply(this,arguments),this.utils=Annotator.Plugin.Touch.utils,this.selection=null,this.document=d(document)}var d,e;return c(f,b),e=Annotator._t,d=Annotator.$,f.states={ON:"on",OFF:"off"},f.prototype.template='<div class="annotator-touch-widget annotator-touch-controls annotator-touch-hide">\n  <div class="annotator-touch-widget-inner">\n    <a class="annotator-button annotator-add annotator-focus">'+e("Annotate")+'</a>\n<a class="annotator-button annotator-touch-toggle" data-state="off">'+e("Start Annotating")+"</a>\n  </div>\n</div>",f.prototype.classes={hide:"annotator-touch-hide"},f.prototype.options={force:!1,useHighlighter:!1},f.prototype.pluginInit=function(){if(!Annotator.supported()||!this.options.force&&!f.isTouchDevice())return;return this._setupControls(),this.options.useHighlighter&&(this.showControls(),this.highlighter=new Highlighter({root:this.element[0],prefix:"annotator-selection",enable:!1,highlightStyles:!0})),this.document.delegate(".annotator-hl","tap",{preventDefault:!1},this._onHighlightTap),this.subscribe("selection",this._onSelection),this._unbindAnnotatorEvents(),this._setupAnnotatorEvents(),this._watchForSelection()},f.prototype.pluginDestroy=function(){this.controls&&this.controls.remove(),this.highlighter&&this.highlighter.disable();if(this.annotator)return this.annotator.editor.unsubscribe("hide",this._watchForSelection)},f.prototype.startAnnotating=function(){return this.highlighter&&this.highlighter.enable(),this.toggle.attr("data-state",f.states.ON),this.toggle.html("Stop Annotating"),this},f.prototype.stopAnnotating=function(){return this.highlighter&&this.highlighter.disable(),this.toggle.attr("data-state",f.states.OFF),this.toggle.html("Start Annotating"),this},f.prototype.isAnnotating=function(){var a;return a=this.options.useHighlighter,!a||this.toggle.attr("data-state")===f.states.ON},f.prototype.showEditor=function(a){return this.annotator.showEditor(a,{}),this.hideControls(),this},f.prototype.showControls=function(){return this.controls.removeClass(this.classes.hide),this},f.prototype.hideControls=function(){return this.options.useHighlighter||this.controls.addClass(this.classes.hide),this},f.prototype._setupControls=function(){this.annotator.adder.remove(),this.controls=d(this.template).appendTo("body"),this.adder=this.controls.find(".annotator-add"),this.adder.bind("tap",{onTapDown:function(a){return a.stopPropagation()}},this._onAdderTap),this.toggle=this.controls.find(".annotator-touch-toggle"),this.toggle.bind({tap:this._onToggleTap});if(!this.options.useHighlighter)return this.toggle.hide()},f.prototype._setupAnnotatorEvents=function(){var a=this;return this.editor=new f.Editor(this.annotator.editor),this.viewer=new f.Viewer(this.annotator.viewer),this.annotator.editor.on("show",function(){a._clearWatchForSelection(),a.annotator.onAdderMousedown();if(a.highlighter)return a.highlighter.disable()}),this.annotator.viewer.on("show",function(){if(a.highlighter)return a.highlighter.disable()}),this.annotator.editor.on("hide",function(){return a.utils.nextTick(function(){return a.highlighter&&a.highlighter.enable().deselect(),a._watchForSelection()})}),this.annotator.viewer.on("hide",function(){return a.utils.nextTick(function(){if(a.highlighter)return a.highlighter.enable().deselect()})})},f.prototype._unbindAnnotatorEvents=function(){return this.document.unbind({mouseup:this.annotator.checkForEndSelection,mousedown:this.annotator.checkForStartSelection}),this.element.unbind("click mousedown mouseover mouseout")},f.prototype._watchForSelection=function(){var a,b,c,d=this;if(this.timer)return;return a=f.isAndroid()?300:1e3/60,b=(new Date).getTime(),c=function(){var e;return e=(new Date).getTime()-b,e>a&&(b=(new Date).getTime(),d._checkSelection()),d.timer=d.utils.requestAnimationFrame.call(window,c)},c()},f.prototype._clearWatchForSelection=function(){return this.utils.cancelAnimationFrame.call(window,this.timer),this.timer=null},f.prototype._checkSelection=function(){var a,b,c;b=window.getSelection(),a=this.selectionString,c=d.trim(b+""),b.rangeCount&&c!==this.selectionString&&(this.range=b.getRangeAt(0),this.selectionString=c);if(b.rangeCount===0||this.range&&this.range.collapsed)this.range=null,this.selectionString="";if(this.selectionString!==a)return this.publish("selection",[this.range,this])},f.prototype._onSelection=function(){return this.isAnnotating()&&this.range&&this._isValidSelection(this.range)?(this.adder.removeAttr("disabled"),this.showControls()):(this.adder.attr("disabled",""),this.hideControls())},f.prototype._isValidSelection=function(a){var b,c,e,f;return b=function(a){return d(a).parents(".annotator-wrapper").length},c=a.startOffset<a.startContainer.length,f=c&&b(a.startContainer),e=a.endOffset>0&&b(a.endContainer),f||e},f.prototype._onToggleTap=function(a){return a.preventDefault(),this.isAnnotating()?this.stopAnnotating():this.startAnnotating()},f.prototype._onAdderTap=function(a){var b,c,d,e=this;a.preventDefault();if(this.range){b=new Annotator.Range.BrowserRange(this.range),d=b.normalize().limit(this.element[0]);if(d&&!this.annotator.isAnnotator(d.commonAncestor))return c=function(a){return e.annotator.unsubscribe("beforeAnnotationCreated",c),a.quote=d.toString(),a.ranges=[d]},this.annotator.subscribe("beforeAnnotationCreated",c),this.annotator.onAdderClick(a)}},f.prototype._onHighlightTap=function(a){var b,c;b=d(a.currentTarget).parents().filter(function(){return d(this).is("a, [data-annotator-clickable]")});if(b.length)return;if(d.contains(this.element[0],a.currentTarget))return c=a.originalEvent,c&&c.touches&&(a.pageX=c.touches[0].pageX,a.pageY=c.touches[0].pageY),this.annotator.viewer.isShown()&&this.annotator.viewer.hide(),this.annotator.onHighlightMouseover(a),this.document.unbind("tap",this._onDocumentTap),this.document.bind("tap",{preventDefault:!1},this._onDocumentTap)},f.prototype._onDocumentTap=function(a){this.annotator.isAnnotator(a.target)||this.annotator.viewer.hide();if(!this.annotator.viewer.isShown())return this.document.unbind("tap",this._onDocumentTap)},f.isTouchDevice=function(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch},f.isAndroid=function(){return/Android/i.test(window.navigator.userAgent)},f}(Annotator.Plugin),Annotator.Plugin.Touch.Editor=function(b){function g(b,c){var d=this;this.editor=b,this._onOverlayTap=a(this._onOverlayTap,this),this._onCancel=a(this._onCancel,this),this._onSubmit=a(this._onSubmit,this),this._onExpandTap=a(this._onExpandTap,this),this._triggerAndroidRedraw=a(this._triggerAndroidRedraw,this),g.__super__.constructor.call(this,this.editor.element[0],c),this.element.addClass("annotator-touch-editor"),this.element.wrapInner('<div class="annotator-touch-widget" />'),this.element.find("form").addClass("annotator-touch-widget-inner"),this.element.find(".annotator-controls a").addClass("annotator-button"),this.element.undelegate("textarea","keydown"),this.on("hide",function(){return d.element.find(":focus").blur()}),this._setupQuoteField(),this._setupAndroidRedrawHack()}var d,e,f;return c(g,b),f=Annotator._t,e=Annotator.$,d=Annotator.Plugin.Touch,g.prototype.events={click:"_onOverlayTap",".annotator-save tap":"_onSubmit",".annotator-cancel tap":"_onCancel",".annotator-quote-toggle tap":"_onExpandTap"},g.prototype.classes={expand:"annotator-touch-expand"},g.prototype.templates={quote:'<button class="annotator-quote-toggle">'+f("expand")+'</button>\n<span class="quote"></span>'},g.prototype.showQuote=function(){return this.quote.addClass(this.classes.expand),this.quote.find("button").text(f("Collapse")),this},g.prototype.hideQuote=function(){return this.quote.removeClass(this.classes.expand),this.quote.find("button").text(f("Expand")),this},g.prototype.isQuoteHidden=function(){return!this.quote.hasClass(this.classes.expand)},g.prototype._setupQuoteField=function(){var a=this;return this.quote=e(this.editor.addField({id:"quote",load:function(b,c){return a.hideQuote(),a.quote.find("span").html(Annotator.Util.escape(c.quote||"")),a.quote.find("button").toggle(a._isTruncated())}})),this.quote.empty().addClass("annotator-item-quote"),this.quote.append(this.templates.quote)},g.prototype._setupAndroidRedrawHack=function(){var a,b,c=this;if(d.isAndroid())return b=null,a=function(){return b=null,c._triggerAndroidRedraw()},e(window).bind("scroll",function(){if(!b)return b=setTimeout(a,100)})},g.prototype._triggerAndroidRedraw=function(){return this._input||(this._input=this.element.find(":input:first")),this._default||(this._default=parseFloat(this._input.css("padding-top"))),this._multiplier=(this._multiplier||1)*-1,this._input[0].style.paddingTop=this._default+this._multiplier+"px",this._input[0].style.paddingTop=this._default-this._multiplier+"px"},g.prototype._isTruncated=function(){var a,b,c;return b=this.isQuoteHidden(),b||this.hideQuote(),c=this.quote.height(),this.showQuote(),a=this.quote.height(),b?this.hideQuote():this.showQuote(),a>c},g.prototype._onExpandTap=function(a){return a.preventDefault(),a.stopPropagation(),this.isQuoteHidden()?this.showQuote():this.hideQuote()},g.prototype._onSubmit=function(a){return a.preventDefault(),this.editor.submit()},g.prototype._onCancel=function(a){return a.preventDefault(),this.editor.hide()},g.prototype._onOverlayTap=function(a){if(a.target===this.element[0])return this.editor.hide()},g}(Annotator.Delegator),jQuery.event.special.tap={add:function(a){var b,c,d,e;return c=a.data=a.data||{},b=this,e=function(a){return c.preventDefault!==!1&&a.preventDefault(),c.onTapDown&&c.onTapDown.apply(this,arguments),c.event=a,c.touched=setTimeout(function(){return c.touched=null},c.timeout||300),jQuery(document).bind({touchend:d,mouseup:d})},d=function(e){var f;if(c.touched!=null){clearTimeout(c.touched);if(e.target===b||jQuery.contains(b,e.target))f=a.origHandler||a.handler,f.call(this,c.event);c.touched=null}return c.onTapUp&&c.onTapUp.apply(this,arguments),jQuery(document).unbind({touchstart:d,mousedown:d})},c.tapHandlers={touchstart:e,mousedown:e},a.selector?jQuery(b).delegate(a.selector,c.tapHandlers):jQuery(b).bind(c.tapHandlers)},remove:function(a){return jQuery(this).unbind(a.data.tapHandlers)}},Annotator.Delegator.natives.push("touchstart","touchmove","touchend","tap"),Annotator.Plugin.Touch.utils=function(){var a,b,c,d,e,f,g;e=["ms","moz","webkit","o"],d=window.requestAnimationFrame,a=window.cancelAnimationFrame;for(f=0,g=e.length;f<g;f++){c=e[f];if(!d)d=window[""+c+"RequestAnimationFrame"],a=window[""+c+"CancelAnimationFrame"]||window[""+c+"CancelRequestAnimationFrame"];else continue}return d||(b=0,d=function(a,c){var d,e;return d=(new Date).getTime(),e=Math.max(0,16-(d-b)),b=d+e,window.setTimeout(function(){return a(d+e)},e)}),a||(a=function(a){return clearTimeout(a)}),{requestAnimationFrame:d,cancelAnimationFrame:a,nextTick:function(a){return setTimeout(a,0)}}}(),Annotator.Plugin.Touch.Viewer=function(b){function e(b,c){this.viewer=b,this._onLoad=a(this._onLoad,this),e.__super__.constructor.call(this,this.viewer.element[0],c),this.element.unbind("click"),this.element.addClass("annotator-touch-widget annotator-touch-viewer"),this.on("load",this._onLoad)}var d;return c(e,b),d=Annotator.$,e.prototype.events={".annotator-item tap":"_onTap",".annotator-edit tap":"_onEdit",".annotator-delete tap":"_onDelete"},e.prototype.hideAllControls=function(){return this.element.find(".annotator-item").removeClass(this.viewer.classes.showControls),this},e.prototype._onLoad=function(){var a;return a=this.element.find(".annotator-controls"),a.toggleClass("annotator-controls annotator-touch-controls"),a.find("button").addClass("annotator-button")},e.prototype._onTap=function(a){var b,c;c=d(a.currentTarget),b=c.hasClass(this.viewer.classes.showControls),this.hideAllControls();if(!b)return c.addClass(this.viewer.classes.showControls)},e.prototype._onEdit=function(a){return a.preventDefault(),this.viewer.onEditClick(a)},e.prototype._onDelete=function(a){return a.preventDefault(),this.viewer.onDeleteClick(a)},e}(Annotator.Delegator)})).call(this);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/app.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app') 
        .controller('AppCtrl', [ '$scope', '$state', '$rootScope', '$location', 'Config', '$stateParams', 'AuthService', 'AUTH_EVENTS', 'localStorageService', '$uibModal',
            function ($scope, $state, $rootScope, $location, Config, $stateParams, AuthService, AUTH_EVENTS, localStorageService, $uibModal) {
                $scope.$state = $state;
                $scope.sidebar = Config.sidebar;
                $scope.user = AuthService.authentication.user;
                $scope.loggedIn = AuthService.authentication.isAuth;
                Config.controls = {};
                $scope.controls = Config.controls;
                $scope.page = {};
                $scope.dateNow = new Date();

                $scope.app = {
                    settings: {
                        htmlClass: '',
                        bodyClass: ''
                    }
                };

                $scope.$on( '$stateChangeSuccess', function ( event, toState, toParams, fromState, fromParams ) {
                    // Scroll to top of pages
                    window.scrollTo(0, 0);

                    // Set HTML and BODY tag classes based
                    if ( angular.isDefined( toState.htmlClass ) ) {
                        $scope.app.settings.htmlClass = toState.htmlClass;
                    }
                    if ( angular.isDefined( toState.bodyClass ) ) {
                        $scope.app.settings.bodyClass = toState.bodyClass;
                    }
                });

                $scope.isAdmin = function () {
                    return AuthService.hasRole('1');
                };

                $scope.stateIncludes = function (search){
                    return ( $state.current.name.indexOf(search)>-1 );
                };

                $scope.toggleEditControls = function() {
                    $scope.switchStatus = !$scope.switchStatus;
                    $scope.controls.contentEdit = $scope.switchStatus;
                    console.log($scope.switchStatus);
                    if($scope.switchStatus){
                        toaster.pop('note', "In-line editing", "controls activated.");
                    }
                };

                $scope.toggleSidebar = function () {
                    $scope.sidebar = !$scope.sidebar;
                };

                $scope.showTermsConditions = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'tpl/terms-conditions.modal.tpl.html',
                        controller: function ($scope, $uibModalInstance) {
                            $scope.close = function () {
                                $uibModalInstance.dismiss();
                            };
                        },
                        size: "lg",
                        backdrop: true,
                        keyboard: false
                    });
                };

                $scope.$on(AUTH_EVENTS.loginSuccess, function(event){
                    $scope.user = AuthService.authentication.user;
                    $scope.loggedIn = true;
                    if($stateParams.redirectTo){
                        /*$timeout(function() {
                         //$location.path($stateParams.redirectTo)
                         console.log($stateParams.redirectTo);
                         }, 2000);*/
                        $location.search('');
                        $location.path($stateParams.redirectTo);
                    } else {
                        $state.go("dashboard");
                    }
                });

                $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
                    //event.preventDefault();
                    if(AuthService.authentication.isAuth) {
                        AuthService.logOut().then(function () {
                            $scope.loggedIn = false;
                            $scope.user = {};
                            $state.go($state.current, {}, {reload: true});
                        }, function (error) {
                            console.log('ERROR: ' + error);
                        });
                    }else{
                        console.log('already logged out');
                    }
                });

                $scope.$on(AUTH_EVENTS.toLoginForm, function(){
                    var currentPlace = $location.path();
                    AuthService.logOut().then(function () {
                        $scope.loggedIn = false;
                        $scope.user = {};
                        $state.go('login',{redirectTo:currentPlace});
                    }, function (error) {
                        console.log('ERROR: ' + error);
                    });
                });


                /*$scope.$on(AUTH_EVENTS.notAuthenticated, function(){
                    var currentPlace = $location.path();
                    if(AuthService.authentication.isAuth) {
                        AuthService.logOut().finally( function () {
                            $scope.loggedIn = false;
                            $scope.user = {};
                            //$state.go('login',{redirectTo:currentPlace},{reload: true});
                            console.log('state reload');
                            $state.go($state.current, {}, {reload: true});
                        });
                    }else{
                        console.log('already logged out');
                    }
                });*/

                $scope.$on(AUTH_EVENTS.showLoginForm, function(){
                    if(!$scope.loginForm) {
                        $scope.loginForm = true;
                        var modalInstance = $modal.open({
                            templateUrl: 'app/login/login.modal.html',
                            controller: 'LoginModalCtrl',
                            background: 'static'
                            //size: size,
                            /*resolve: {
                             items: function () {
                             return $scope.items;
                             }
                             }*/
                        });

                        modalInstance.result.then(function (selectedItem) {
                            $scope.selected = selectedItem;
                            $scope.loginForm = false;
                        }, function () {
                            console.log('Modal dismissed at: ' + new Date());
                            $scope.loginForm = false;
                        });
                    }
                });
                $scope.$on('app-fatal-error', function( info, msg ){
                    // activate error screen
                    $scope.fatalError = msg || true;
                });

                var noticed = localStorageService.get('noticed_msg');
                if ( noticed == '2' ) {
                } else {
                    // Show modal
                    /*var modalInstance = $modal.open({
                        templateUrl: 'app/layout/msg.modal.tpl.html',
                        controller: function ($scope, $modalInstance) {
                            $scope.viewLoading = true;
                            $scope.close = function () {
                                $modalInstance.close();
                            };
                        },
                        size: "lg",
                        backdrop: "static",
                        keyboard: false
                    });
                    modalInstance.result.then(function() {
                        //Modal dismissed
                        localStorageService.set('noticed_msg', '2');
                    }, function() {
                    });*/
                }

            } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/auth.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('AuthService', function ($http, Session, $q, Config, User, localStorageService, $rootScope,AUTH_EVENTS) {
            var authService = {};

            var _authentication = {
                isAuth: false,
                user: ""
            };

            var _login = function (credentials) {
                return $http.post( Config.apiPath+'login', credentials );
            };

            var _register = function (user) {
                return $http.post( Config.apiPath+'register', user );
            };

            var _logOut = function () {
                return $http({method: 'GET', url: Config.apiPath+'logout'}).
                    finally( function(data) {
                        localStorageService.remove('authorizationData');
                        _authentication.isAuth = false;
                        _authentication.user = "";
                    });
            };

            var _activateUser = function (data) {
                return $http.post( Config.apiPath+'user/activate', data );
            };

            var _sendActivateEmail = function (data) {
                return $http.post( Config.apiPath+'user/activate/email', data );
            };

            var _resetPassword = function (data) {
                return $http.post( Config.apiPath+'user/reset_password', {'email':data} );
            };

            var _fillAuthData = function () {
                var authData = localStorageService.get('authorizationData');

                if (authData)
                {
                    _authentication.isAuth = true;
                    _authentication.user = authData;
                }
            };

            var _setRememberData = function ( credentials ) {
                if ( credentials.remember_me ) {
                    localStorageService.set('rememberMeData', credentials);
                } else {
                    localStorageService.remove('rememberMeData');
                }
            };

            var _getRememberData = function () {
                return localStorageService.get('rememberMeData');
            };

            var _updateAuthData = function () {
                return User.getUser("current").then(function (data) {
                    localStorageService.set('authorizationData', data);
                    _authentication.isAuth = true;
                    _authentication.user = data;
                });
            };

            var _isAuthenticated = function () {
                return !!Session.userId;
            };

            var _hasRole = function (role_id) {
                var flag = false;
                if(_authentication.user) {
                    $.each(_authentication.user.roles, function (key, role) {
                        if (role.role_id === role_id || role.label === role_id) {
                            flag = true;
                        }
                    });
                }
                return flag;
            };

            var _hasPermission = function (permission_id) {
                var flag = false;
                if(_authentication.user) {
                    $.each(_authentication.user.roles, function (key, role) {
                        $.each(role.permissions, function (key, permission) {
                            if (permission.permission_id === permission_id || permission.action === permission_id) {
                                flag = true;
                            }
                        });
                    });
                }
                return flag;
            };

            /*var _isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (authService.isAuthenticated() &&
                    authorizedRoles.indexOf(Session.userRole) !== -1);
            };*/

            authService.login = _login;
            authService.register = _register;
            authService.logOut = _logOut;
            authService.activateUser = _activateUser;
            authService.sendActivateEmail = _sendActivateEmail;
            authService.fillAuthData = _fillAuthData;
            authService.setRememberData= _setRememberData;
            authService.getRememberData= _getRememberData;
            authService.updateAuthData = _updateAuthData;
            authService.isAuthenticated = _isAuthenticated;
            authService.resetPassword = _resetPassword;
            authService.hasRole = _hasRole;
            authService.hasPermission = _hasPermission;
            //authService.isAuthorized = _isAuthorized;
            authService.authentication = _authentication;

            return authService;
        });
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/backtop.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('backTop', [ function () {
		  	return { 
			    restrict: 'E',
			    transclude: true,
			    replace: true,
			    template: '<div id="backtop" class="{{theme}}"><button><div ng-transclude></div></button></div>',
			    scope: {
			      text: "@buttonText",
			      speed: "@scrollSpeed",
			      theme: "@buttonTheme"
			    },
			    link: function(scope, element) {

			      	scope.text = scope.text || 'Scroll top';
			      	scope.theme = scope.theme || 'light';
			      	scope.speed = parseInt(scope.speed, 10) || 300;
			      
			      	var speed = Math.round(scope.speed / 100);
			      	var onscroll = function() {
			        	if (window.pageYOffset > 0) {
			          		if(!element.showing){
			            		element.addClass('show');
			            		element.showing = true;
			          		}
			        	} else {
			          		element.removeClass('show');
			          		element.showing = false;
			        	}
			      	}

			      	scope.currentYPosition = function() {
			        	if (document.documentElement && document.documentElement.scrollTop)
			          		return document.documentElement.scrollTop;
			        	if (document.body.scrollTop)
			          		return document.body.scrollTop;
			        	return 0;
			      	};

			      	element.showing = false;
			      	element.on('click', function() {
			        	window.removeEventListener("scroll", onscroll);

			        	element.removeClass('show');
			        	element.showing = false;

			        	var startY = scope.currentYPosition();

			        	var step = Math.round(startY / 25);
			        	var leapY = startY < 100 ? 0 : startY - step;

			        	var scrollInterval = setInterval(function(){
			          		window.scrollTo(0, leapY)
			          		if(!leapY){
			            		clearInterval(scrollInterval);
			            		window.addEventListener("scroll", onscroll)
			          		}

			          		leapY -= step;

			          		if(leapY < 0) leapY = 0;
			        	}, speed)
			      	});

			      	window.addEventListener("scroll", onscroll);
			      	scope.$on("$destroy", function() {
			        	window.removeEventListener("scroll", onscroll)
			      	})
			    }
		  	};
		}]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/compile.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('compile', ['$compile', function ($compile) {
            return function(scope, element, attrs) {
                scope.$watch(
                    function(scope) {
                        // watch the 'compile' expression for changes
                        return scope.$eval(attrs.compile);
                    },
                    function(value) {
                        // when the 'compile' expression changes
                        // assign it into the current DOM
                        element.html(value);

                        // compile the new DOM and link it to the current
                        // scope.
                        // NOTE: we only compile .childNodes so that
                        // we don't get into infinite loop compiling ourselves
                        $compile(element.contents())(scope);
                    }
                );
            };
        }])
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/config.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
		.service("Config", function() {
		    return {};
		});
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/croppie1.0.3.min.js":[function(require,module,exports){
!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):t("object"==typeof exports&&"string"!=typeof exports.nodeName?exports:e.commonJsStrict={})}(this,function(exports){function e(e){if(e in O)return e;for(var t=e[0].toUpperCase()+e.slice(1),n=P.length;n--;)if(e=P[n]+t,e in O)return e}function t(e,n){e=e||{};for(var i in n)n[i]&&n[i].constructor&&n[i].constructor===Object?(e[i]=e[i]||{},t(e[i],n[i])):e[i]=n[i];return e}function n(e,t,n){var i;return function(){var o=this,r=arguments,a=function(){i=null,n||e.apply(o,r)},s=n&&!i;clearTimeout(i),i=setTimeout(a,t),s&&e.apply(o,r)}}function i(e){if("createEvent"in document){var t=document.createEvent("HTMLEvents");t.initEvent("change",!1,!0),e.dispatchEvent(t)}else e.fireEvent("onchange")}function o(e,t,n){if("string"==typeof t){var i=t;t={},t[i]=n}for(var o in t)e.style[o]=t[o]}function r(e,t){e.classList?e.classList.add(t):e.className+=" "+t}function a(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(t,"")}function s(e,t){var n,i=t||new Image;return i.src===e?n=new Promise(function(e){e(i)}):(n=new Promise(function(t){"http"===e.substring(0,4).toLowerCase()&&i.setAttribute("crossOrigin","anonymous"),i.onload=function(){setTimeout(function(){t(i)},1)}}),i.src=e),i.style.opacity=0,n}function l(e,t){window.EXIF||t(0),EXIF.getData(e,function(){var e=EXIF.getTag(this,"Orientation");t(e)})}function u(e,t,n){var i=t.width,o=t.height,r=e.getContext("2d");switch(e.width=t.width,e.height=t.height,r.save(),n){case 2:r.translate(i,0),r.scale(-1,1);break;case 3:r.translate(i,o),r.rotate(180*Math.PI/180);break;case 4:r.translate(0,o),r.scale(1,-1);break;case 5:e.width=o,e.height=i,r.rotate(90*Math.PI/180),r.scale(1,-1);break;case 6:e.width=o,e.height=i,r.rotate(90*Math.PI/180),r.translate(0,-o);break;case 7:e.width=o,e.height=i,r.rotate(-90*Math.PI/180),r.translate(-i,o),r.scale(1,-1);break;case 8:e.width=o,e.height=i,r.translate(0,i),r.rotate(-90*Math.PI/180)}r.drawImage(t,0,0,i,o),r.restore()}function c(){var e,t,n,i,a=this,s="croppie-container",l=a.options.viewport.type?"cr-vp-"+a.options.viewport.type:null;a.options.useCanvas=a.options.enableOrientation||p.call(a),a.data={},a.elements={},e=a.elements.boundary=document.createElement("div"),n=a.elements.viewport=document.createElement("div"),t=a.elements.img=document.createElement("img"),i=a.elements.overlay=document.createElement("div"),a.options.useCanvas?(a.elements.canvas=document.createElement("canvas"),a.elements.preview=a.elements.canvas):a.elements.preview=a.elements.img,r(e,"cr-boundary"),o(e,{width:a.options.boundary.width+"px",height:a.options.boundary.height+"px"}),r(n,"cr-viewport"),l&&r(n,l),o(n,{width:a.options.viewport.width+"px",height:a.options.viewport.height+"px"}),n.setAttribute("tabindex",0),r(a.elements.preview,"cr-image"),r(i,"cr-overlay"),a.element.appendChild(e),e.appendChild(a.elements.preview),e.appendChild(n),e.appendChild(i),r(a.element,s),a.options.customClass&&r(a.element,a.options.customClass),g.call(this),a.options.enableZoom&&d.call(a)}function p(){return(this.options.enableExif||this.options.exif)&&window.EXIF}function h(e){this.options.enableZoom&&(this.elements.zoomer.value=F(e,4))}function d(){function e(){m.call(n,{value:parseFloat(o.value),origin:new D(n.elements.preview),viewportRect:n.elements.viewport.getBoundingClientRect(),transform:T.parse(n.elements.preview)})}function t(t){var i,o;i=t.wheelDelta?t.wheelDelta/1200:t.deltaY?t.deltaY/1060:t.detail?t.detail/-60:0,o=n._currentZoom+i,t.preventDefault(),h.call(n,o),e.call(n)}var n=this,i=n.elements.zoomerWrap=document.createElement("div"),o=n.elements.zoomer=document.createElement("input");r(i,"cr-slider-wrap"),r(o,"cr-slider"),o.type="range",o.step="0.0001",o.value=1,o.style.display=n.options.showZoomer?"":"none",n.element.appendChild(i),i.appendChild(o),n._currentZoom=1,n.elements.zoomer.addEventListener("input",e),n.elements.zoomer.addEventListener("change",e),n.options.mouseWheelZoom&&(n.elements.boundary.addEventListener("mousewheel",t),n.elements.boundary.addEventListener("DOMMouseScroll",t))}function m(e){function t(){var e={};e[k]=i.toString(),e[M]=a.toString(),o(n.elements.preview,e)}var n=this,i=e?e.transform:T.parse(n.elements.preview),r=e?e.viewportRect:n.elements.viewport.getBoundingClientRect(),a=e?e.origin:new D(n.elements.preview);if(n._currentZoom=e?e.value:n._currentZoom,i.scale=n._currentZoom,t(),n.options.enforceBoundary){var s=f.call(n,r),l=s.translate,u=s.origin;i.x>=l.maxX&&(a.x=u.minX,i.x=l.maxX),i.x<=l.minX&&(a.x=u.maxX,i.x=l.minX),i.y>=l.maxY&&(a.y=u.minY,i.y=l.maxY),i.y<=l.minY&&(a.y=u.maxY,i.y=l.minY)}t(),N.call(n),y.call(n)}function f(e){var t=this,n=t._currentZoom,i=e.width,o=e.height,r=t.options.boundary.width/2,a=t.options.boundary.height/2,s=t.elements.preview.getBoundingClientRect(),l=s.width,u=s.height,c=i/2,p=o/2,h=-1*(c/n-r),d=h-(l*(1/n)-i*(1/n)),m=-1*(p/n-a),f=m-(u*(1/n)-o*(1/n)),v=1/n*c,g=l*(1/n)-v,w=1/n*p,y=u*(1/n)-w;return{translate:{maxX:h,minX:d,maxY:m,minY:f},origin:{maxX:g,minX:v,maxY:y,minY:w}}}function v(){var e=this,t=e._currentZoom,n=e.elements.preview.getBoundingClientRect(),i=e.elements.viewport.getBoundingClientRect(),r=T.parse(e.elements.preview.style[k]),a=new D(e.elements.preview),s=i.top-n.top+i.height/2,l=i.left-n.left+i.width/2,u={},c={};u.y=s/t,u.x=l/t,c.y=(u.y-a.y)*(1-t),c.x=(u.x-a.x)*(1-t),r.x-=c.x,r.y-=c.y;var p={};p[M]=u.x+"px "+u.y+"px",p[k]=r.toString(),o(e.elements.preview,p)}function g(){function e(e,t){var n=m.elements.preview.getBoundingClientRect(),i=d.y+t,o=d.x+e;m.options.enforceBoundary?(p.top>n.top+t&&p.bottom<n.bottom+t&&(d.y=i),p.left>n.left+e&&p.right<n.right+e&&(d.x=o)):(d.y=i,d.x=o)}function t(e){function t(e){switch(e){case i:return[1,0];case o:return[0,1];case r:return[-1,0];case a:return[0,-1]}}var i=37,o=38,r=39,a=40;if(!e.shiftKey||e.keyCode!=o&&e.keyCode!=a){if(e.keyCode>=37&&e.keyCode<=40){e.preventDefault();var s=t(e.keyCode);d=T.parse(m.elements.preview),document.body.style[z]="none",p=m.elements.viewport.getBoundingClientRect(),n(s)}}else{var l=0;l=e.keyCode==o?parseFloat(m.elements.zoomer.value,10)+parseFloat(m.elements.zoomer.step,10):parseFloat(m.elements.zoomer.value,10)-parseFloat(m.elements.zoomer.step,10),m.setZoom(l)}}function n(t){var n=t[0],i=t[1],r={};e(n,i),r[k]=d.toString(),o(m.elements.preview,r),w.call(m),document.body.style[z]="",v.call(m),y.call(m),c=0}function r(e){if(e.preventDefault(),!f){if(f=!0,l=e.pageX,u=e.pageY,e.touches){var t=e.touches[0];l=t.pageX,u=t.pageY}d=T.parse(m.elements.preview),window.addEventListener("mousemove",a),window.addEventListener("touchmove",a),window.addEventListener("mouseup",s),window.addEventListener("touchend",s),document.body.style[z]="none",p=m.elements.viewport.getBoundingClientRect()}}function a(t){t.preventDefault();var n=t.pageX,r=t.pageY;if(t.touches){var a=t.touches[0];n=a.pageX,r=a.pageY}var s=n-l,p=r-u,f={};if("touchmove"==t.type&&t.touches.length>1){var v=t.touches[0],g=t.touches[1],y=Math.sqrt((v.pageX-g.pageX)*(v.pageX-g.pageX)+(v.pageY-g.pageY)*(v.pageY-g.pageY));c||(c=y/m._currentZoom);var x=y/c;return h.call(m,x),void i(m.elements.zoomer)}e(s,p),f[k]=d.toString(),o(m.elements.preview,f),w.call(m),u=r,l=n}function s(){f=!1,window.removeEventListener("mousemove",a),window.removeEventListener("touchmove",a),window.removeEventListener("mouseup",s),window.removeEventListener("touchend",s),document.body.style[z]="",v.call(m),y.call(m),c=0}var l,u,c,p,d,m=this,f=!1;m.elements.overlay.addEventListener("mousedown",r),m.elements.viewport.addEventListener("keydown",t),m.elements.overlay.addEventListener("touchstart",r)}function w(){var e=this,t=e.elements.boundary.getBoundingClientRect(),n=e.elements.preview.getBoundingClientRect();o(e.elements.overlay,{width:n.width+"px",height:n.height+"px",top:n.top-t.top+"px",left:n.left-t.left+"px"})}function y(){var e,t=this,n=t.get();if(x.call(t))if(t.options.update.call(t,n),t.$)t.$(t.element).trigger("update",n);else{var e;window.CustomEvent?e=new CustomEvent("update",{detail:n}):(e=document.createEvent("CustomEvent"),e.initCustomEvent("update",!0,!0,n)),t.element.dispatchEvent(e)}}function x(){return this.elements.preview.offsetHeight>0&&this.elements.preview.offsetWidth>0}function b(){var e,t,n,r,a,s=this,l=0,u=1.5,c=1,p={},d=s.elements.preview,m=s.elements.zoomer,f=new T(0,0,c),g=new D,y=x.call(s);y&&!s.data.bound&&(s.data.bound=!0,p[k]=f.toString(),p[M]=g.toString(),p.opacity=1,o(d,p),e=d.getBoundingClientRect(),t=s.elements.viewport.getBoundingClientRect(),n=s.elements.boundary.getBoundingClientRect(),s._originalImageWidth=e.width,s._originalImageHeight=e.height,s.options.enableZoom&&(s.options.enforceBoundary&&(r=t.width/e.width,a=t.height/e.height,l=Math.max(r,a)),l>=u&&(u=l+1),m.min=F(l,4),m.max=F(u,4),c=Math.max(n.width/e.width,n.height/e.height),h.call(s,c),i(m)),s._currentZoom=f.scale=c,p[k]=f.toString(),o(d,p),s.data.points.length?C.call(s,s.data.points):E.call(s),v.call(s),w.call(s))}function C(e){if(4!=e.length)throw"Croppie - Invalid number of points supplied: "+e;var t=this,n=e[2]-e[0],i=t.elements.viewport.getBoundingClientRect(),r=t.elements.boundary.getBoundingClientRect(),a={left:i.left-r.left,top:i.top-r.top},s=i.width/n,l=e[1],u=e[0],c=-1*e[1]+a.top,p=-1*e[0]+a.left,d={};d[M]=u+"px "+l+"px",d[k]=new T(p,c,s).toString(),o(t.elements.preview,d),h.call(t,s),t._currentZoom=s}function E(){var e=this,t=e.elements.preview.getBoundingClientRect(),n=e.elements.viewport.getBoundingClientRect(),i=e.elements.boundary.getBoundingClientRect(),r=n.left-i.left,a=n.top-i.top,s=r-(t.width-n.width)/2,l=a-(t.height-n.height)/2,u=new T(s,l,e._currentZoom);o(e.elements.preview,k,u.toString())}function _(e){var t=this,n=t.elements.canvas,i=t.elements.img,o=n.getContext("2d"),r=p.call(t),e=t.options.enableOrientation&&e;o.clearRect(0,0,n.width,n.height),n.width=i.width,n.height=i.height,r?l(i,function(t){u(n,i,parseInt(t)),e&&u(n,i,e)}):e&&u(n,i,e)}function R(e){var t=e.points,n=document.createElement("div"),i=document.createElement("img"),a=t[2]-t[0],s=t[3]-t[1];return r(n,"croppie-result"),n.appendChild(i),o(i,{left:-1*t[0]+"px",top:-1*t[1]+"px"}),i.src=e.url,o(n,{width:a+"px",height:s+"px"}),n}function I(e,t){var n=t.points,i=n[0],o=n[1],r=n[2]-n[0],a=n[3]-n[1],s=t.circle,l=document.createElement("canvas"),u=l.getContext("2d"),c=r,p=a;return t.outputWidth&&t.outputHeight&&(c=t.outputWidth,p=t.outputHeight),l.width=c,l.height=p,t.backgroundColor&&(u.fillStyle=t.backgroundColor,u.fillRect(0,0,c,p)),u.drawImage(e,i,o,r,a,0,0,c,p),s&&(u.fillStyle="#fff",u.globalCompositeOperation="destination-in",u.beginPath(),u.arc(c/2,p/2,c/2,0,2*Math.PI,!0),u.closePath(),u.fill()),l.toDataURL(t.format,t.quality)}function B(e,t){var n,i=this,o=[];if("string"==typeof e)n=e,e={};else if(Array.isArray(e))o=e.slice();else{if("undefined"==typeof e&&i.data.url)return b.call(i),y.call(i),null;n=e.url,o=e.points||[]}i.data.bound=!1,i.data.url=n||i.data.url,i.data.points=(o||i.data.points).map(function(e){return parseFloat(e)});var r=s(n,i.elements.img);return r.then(function(){i.options.useCanvas&&(i.elements.img.exifdata=null,_.call(i,e.orientation||1)),b.call(i),y.call(i),t&&t()}),r}function F(e,t){return parseFloat(e).toFixed(t||0)}function Z(){var e=this,t=e.elements.preview.getBoundingClientRect(),n=e.elements.viewport.getBoundingClientRect(),i=n.left-t.left,o=n.top-t.top,r=i+n.width,a=o+n.height,s=e._currentZoom;(s===1/0||isNaN(s))&&(s=1);var l=e.options.enforceBoundary?0:Number.NEGATIVE_INFINITY;return i=Math.max(l,i/s),o=Math.max(l,o/s),r=Math.max(l,r/s),a=Math.max(l,a/s),{points:[F(i),F(o),F(r),F(a)],zoom:s}}function L(e){var n,i=this,o=Z.call(i),r=t(H,t({},e)),a="string"==typeof e?e:r.type||"viewport",s=r.size,l=r.format,u=r.quality,c=r.backgroundColor,p="boolean"==typeof r.circle?r.circle:"circle"===i.options.viewport.type,h=i.elements.viewport.getBoundingClientRect(),d=h.width/h.height;return"viewport"===s?(o.outputWidth=h.width,o.outputHeight=h.height):"object"==typeof s&&(s.width&&s.height?(o.outputWidth=s.width,o.outputHeight=s.height):s.width?(o.outputWidth=s.width,o.outputHeight=s.width/d):s.height&&(o.outputWidth=s.height*d,o.outputHeight=s.height)),q.indexOf(l)>-1&&(o.format="image/"+l,o.quality=u),o.circle=p,o.url=i.data.url,o.backgroundColor=c,n=new Promise(function(e){e("canvas"===a?I.call(i,i.elements.preview,o):R.call(i,o))})}function X(){b.call(this)}function Y(e){if(!this.options.useCanvas)throw"Croppie: Cannot rotate without enableOrientation";var t=this,n=t.elements.canvas,i=(t.elements.img,document.createElement("canvas")),o=1;i.width=n.width,i.height=n.height;var r=i.getContext("2d");r.drawImage(n,0,0),(90===e||-270===e)&&(o=6),(-90===e||270===e)&&(o=8),(180===e||-180===e)&&(o=3),u(n,i,o),m.call(t)}function S(){var e=this;e.element.removeChild(e.elements.boundary),a(e.element,"croppie-container"),e.options.enableZoom&&e.element.removeChild(e.elements.zoomerWrap),delete e.elements}function j(e,n){if(this.element=e,this.options=t(t({},j.defaults),n),c.call(this),this.options.url){var i={url:this.options.url,points:this.options.points};delete this.options.url,delete this.options.points,B.call(this,i)}}"function"!=typeof Promise&&!function(e){function t(e,t){return function(){e.apply(t,arguments)}}function n(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],l(e,t(o,this),t(r,this))}function i(e){var t=this;return null===this._state?void this._deferreds.push(e):void c(function(){var n=t._state?e.onFulfilled:e.onRejected;if(null===n)return void(t._state?e.resolve:e.reject)(t._value);var i;try{i=n(t._value)}catch(o){return void e.reject(o)}e.resolve(i)})}function o(e){try{if(e===this)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void l(t(n,e),t(o,this),t(r,this))}this._state=!0,this._value=e,a.call(this)}catch(i){r.call(this,i)}}function r(e){this._state=!1,this._value=e,a.call(this)}function a(){for(var e=0,t=this._deferreds.length;t>e;e++)i.call(this,this._deferreds[e]);this._deferreds=null}function s(e,t,n,i){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=i}function l(e,t,n){var i=!1;try{e(function(e){i||(i=!0,t(e))},function(e){i||(i=!0,n(e))})}catch(o){if(i)return;i=!0,n(o)}}var u=setTimeout,c="function"==typeof setImmediate&&setImmediate||function(e){u(e,1)},p=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(e,t){var o=this;return new n(function(n,r){i.call(o,new s(e,t,n,r))})},n.all=function(){var e=Array.prototype.slice.call(1===arguments.length&&p(arguments[0])?arguments[0]:arguments);return new n(function(t,n){function i(r,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(e){i(r,e)},n)}e[r]=a,0===--o&&t(e)}catch(l){n(l)}}if(0===e.length)return t([]);for(var o=e.length,r=0;r<e.length;r++)i(r,e[r])})},n.resolve=function(e){return e&&"object"==typeof e&&e.constructor===n?e:new n(function(t){t(e)})},n.reject=function(e){return new n(function(t,n){n(e)})},n.race=function(e){return new n(function(t,n){for(var i=0,o=e.length;o>i;i++)e[i].then(t,n)})},n._setImmediateFn=function(e){c=e},"undefined"!=typeof module&&module.exports?module.exports=n:e.Promise||(e.Promise=n)}(this);var M,k,z,P=["Webkit","Moz","ms"],O=document.createElement("div").style;k=e("transform"),M=e("transformOrigin"),z=e("userSelect");var W="translate3d",A=", 0px",T=function(e,t,n){this.x=parseFloat(e),this.y=parseFloat(t),this.scale=parseFloat(n)};T.parse=function(e){return e.style?T.parse(e.style[k]):e.indexOf("matrix")>-1||e.indexOf("none")>-1?T.fromMatrix(e):T.fromString(e)},T.fromMatrix=function(e){var t=e.substring(7).split(",");return t.length&&"none"!==e||(t=[1,0,0,1,0,0]),new T(parseInt(t[4],10),parseInt(t[5],10),parseFloat(t[0]))},T.fromString=function(e){var t=e.split(") "),n=t[0].substring(W.length+1).split(","),i=t.length>1?t[1].substring(6):1,o=n.length>1?n[0]:0,r=n.length>1?n[1]:0;return new T(o,r,i)},T.prototype.toString=function(){return W+"("+this.x+"px, "+this.y+"px"+A+") scale("+this.scale+")"};var D=function(e){if(!e||!e.style[M])return this.x=0,void(this.y=0);var t=e.style[M].split(" ");this.x=parseFloat(t[0]),this.y=parseFloat(t[1])};D.prototype.toString=function(){return this.x+"px "+this.y+"px"};var N=n(w,500),H={type:"canvas",format:"png",quality:1},q=["jpeg","webp","png"];if(window.jQuery){var $=window.jQuery;$.fn.croppie=function(e){var t=typeof e;if("string"===t){var n=Array.prototype.slice.call(arguments,1),i=$(this).data("croppie");return"get"===e?i.get():"result"===e?i.result.apply(i,n):this.each(function(){var t=$(this).data("croppie");if(t){var i=t[e];if(!$.isFunction(i))throw"Croppie "+e+" method not found";i.apply(t,n),"destroy"===e&&$(this).removeData("croppie")}})}return this.each(function(){var t=new j(this,e);t.$=$,$(this).data("croppie",t)})}}j.defaults={viewport:{width:100,height:100,type:"square"},boundary:{width:300,height:300},orientationControls:{enabled:!0,leftClass:"",rightClass:""},customClass:"",showZoomer:!0,enableZoom:!0,mouseWheelZoom:!0,enableExif:!1,enforceBoundary:!0,enableOrientation:!1,update:function(){}},t(j.prototype,{bind:function(e,t){return B.call(this,e,t)},get:function(){return Z.call(this)},result:function(e){return L.call(this,e)},refresh:function(){return X.call(this)},setZoom:function(e){h.call(this,e),i(this.elements.zoomer)},rotate:function(e){Y.call(this,e)},destroy:function(){return S.call(this)}}),exports.Croppie=window.Croppie=j,"object"==typeof module&&module.exports&&(module.exports=j)});
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/directives.js":[function(require,module,exports){
/***
Global Directives
***/

// Route State Load Spinner(used on page or content load)
(function () {
    "use strict";

    angular.module('app')
        .directive('ngSpinnerBar', ['$rootScope', function ($rootScope) {
	        return {
	            link: function(scope, element, attrs) {
	                // by defult hide the spinner bar
	                element.addClass('hide'); // hide spinner bar by default

	                // display the spinner bar whenever the route changes(the content part started loading)
	                $rootScope.$on('$stateChangeStart', function() {
	                    element.removeClass('hide'); // show spinner bar
	                });

	                // hide the spinner bar on rounte change success(after the content loaded)
	                $rootScope.$on('$stateChangeSuccess', function() {
	                    element.addClass('hide'); // hide spinner bar
	                    $('body').removeClass('page-on-load'); // remove page loading indicator
	                    Layout.setSidebarMenuActiveLink('match'); // activate selected link in the main menu
	                    
	                    // auto scorll to page top
	                    setTimeout(function () {
	                        Metronic.scrollTop(); // scroll to the top on content load
	                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
	                });

	                // handle errors
	                $rootScope.$on('$stateNotFound', function() {
	                    element.addClass('hide'); // hide spinner bar
	                });

	                // handle errors
	                $rootScope.$on('$stateChangeError', function() {
	                    element.addClass('hide'); // hide spinner bar
	                });
	            }
	        };
        }])

        .directive('preventRightClick', ['AuthService', function (AuthService) {
	        return {
	            restrict: 'A',
	            link: function($scope, element) {
	                element.bind("contextmenu", function(e) {
	                    if(!AuthService.hasRole('1')){
	                        e.preventDefault();
	                    }
	                });
	            }
	        };
        }])

        .directive('clientHeight', ['$window', function ($window) {
		    return {
		        link: function ( scope, iElem, iAttrs ) {

		            function resizeEl () {
		                iElem.css( 'height', window.innerHeight*iAttrs.clientHeight/100+'px' );
		                //iElem.css( 'overflow-y', 'scroll' );
		            }

		            resizeEl();

		            angular.element( $window ).bind( 'resize', function () {
		                resizeEl();
		                scope.$digest();
		            });
		        }
		    }
		}])

		.directive('checkImage', [ function() {
		   return {
		      link: function( scope, element, attrs ) {
		         element.bind('error', function() {
		            element.attr('src', attrs.defaultImage); // set default image
		         });
		       }
		   }
		}])

		.directive('syncFocusWith', [ function () {
		    return {
		        restrict: 'A',
		        scope: {
		            focusValue: "=syncFocusWith"
		        },
		        link: function($scope, $element, attrs) {
		            $scope.$watch("focusValue", function(currentValue, previousValue) {
		                if (currentValue === true && !previousValue) {
		                    $element[0].focus();
		                } else if (currentValue === false && previousValue) {
		                    $element[0].blur();
		                }
		            })
		        }
		    }
		}])

		;

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/filters.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')

        .filter('capitalize', function() {
		    return function(input, scope) {
		        if (input!=null)
		            input = input.toLowerCase();
		        return input.substring(0,1).toUpperCase()+input.substring(1);
		    }
		})

		.filter('dateToISO', function() {
		    return function(input) {
		        input = (input) ? new Date(input).toISOString() : input;
		        return input;
		    };
		})

		.filter('naturalSort', function() {
		    function naturalSort (a, b) {
		        var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
		            sre = /(^[ ]*|[ ]*$)/g,
		            dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
		            hre = /^0x[0-9a-f]+$/i,
		            ore = /^0/,
		            i = function(s) { return naturalSort.insensitive && (''+s).toLowerCase() || ''+s },
		            // convert all to strings strip whitespace
		            x = i(a).replace(sre, '') || '',
		            y = i(b).replace(sre, '') || '',
		            // chunk/tokenize
		            xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		            yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		            // numeric, hex or date detection
		            xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
		            yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null,
		            oFxNcL, oFyNcL;
		        // first try and sort Hex codes or Dates
		        if (yD)
		            if ( xD < yD ) return -1;
		        else if ( xD > yD ) return 1;
		        // natural sorting through split numeric strings and default strings
		        for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
		            // find floats not starting with '0', string or 0 if not defined (Clint Priest)
		            oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
		            oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
		            // handle numeric vs string comparison - number < string - (Kyle Adams)
		            if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
		            // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
		            else if (typeof oFxNcL !== typeof oFyNcL) {
		                oFxNcL += '';
		                oFyNcL += '';
		            }
		            if (oFxNcL < oFyNcL) return -1;
		            if (oFxNcL > oFyNcL) return 1;
		        }
		        return 0;
		    }
		    return function(arrInput) {
		        var arr = arrInput.sort(function(a, b) {
		            return naturalSort(a.booth,b.booth);
		        });
		        return arr;
		    }
		})

		.filter('currency', function() {
			function toNumber(val){
			    // numberic values should come first because of -0
			    if (typeof val === 'number') return val;
			    // we want all falsy values (besides -0) to return zero to avoid
			    // headaches
			    if (!val) return 0;
			    if (typeof val === 'string') return parseFloat(val);
			    // arrays are edge cases. `Number([4]) === 4`
			    if (isArray(val)) return NaN;
			    return Number(val);
			}
		    return function (val, nDecimalDigits, decimalSeparator, thousandsSeparator) {
		        val = toNumber(val);
		        nDecimalDigits = nDecimalDigits == null? 2 : nDecimalDigits;
		        decimalSeparator = decimalSeparator == null? '.' : decimalSeparator;
		        thousandsSeparator = thousandsSeparator == null? ',' : thousandsSeparator;

		        //can't use enforce precision since it returns a number and we are
		        //doing a RegExp over the string
		        var fixed = val.toFixed(nDecimalDigits),
		        //separate begin [$1], middle [$2] and decimal digits [$4]
		            parts = new RegExp('^(-?\\d{1,3})((?:\\d{3})+)(\\.(\\d{'+ nDecimalDigits +'}))?$').exec( fixed );

		        if(parts){ //val >= 1000 || val <= -1000
		            return parts[1] + parts[2].replace(/\d{3}/g, thousandsSeparator + '$&') + (parts[4] ? decimalSeparator + parts[4] : '');
		        }else{
		            return fixed.replace('.', decimalSeparator);
		        }
		    };
		})

		.filter('trustAsResourceUrl', ['$sce', function ( $sce ) {
		    return function ( val ) {
		        return $sce.trustAsResourceUrl(val);
		    };
		}])

		;
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/imageonload.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('imageonload', [ function () {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.bind('load', function(vars) {
                        console.log(vars);
                        //call the function that was passed
                        console.log('success');
                        scope.$apply(attrs.imageonload);
                    });
                }
            }
        }])
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/jquery.grid-a-licious.js":[function(require,module,exports){
/**
 * jQuery Grid-A-Licious(tm) v3.01
 *
 * Terms of Use - jQuery Grid-A-Licious(tm)
 * under the MIT (http://www.opensource.org/licenses/mit-license.php) License.
 *
 * Copyright 2008-2012 Andreas Pihlström (Suprb). All rights reserved.
 * (http://suprb.com/apps/gridalicious/)
 *
 */

// Debouncing function from John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
// Copy pasted from http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/

(function ($, sr) {
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            };
            if (timeout) clearTimeout(timeout);
            else if (execAsap) func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 150);
        };
    }
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');

// The Grid-A-Licious magic

(function ($) {

    $.Gal = function (options, element) {
        this.element = $(element);
        this._init(options);
    };

    $.Gal.settings = {
        selector: '.item',
        width: 225,
        gutter: 20,
        animate: false,
        animationOptions: {
            speed: 200,
            duration: 300,
            effect: 'fadeInOnAppear',
            queue: true,
            complete: function () {}
        },
    };

    $.Gal.prototype = {

        _init: function (options) {
            var container = this;
            this.name = this._setName(5);
            this.gridArr = [];
            this.gridArrAppend = [];
            this.gridArrPrepend = [];
            this.setArr = false;
            this.setGrid = false;
            this.setOptions;
            this.cols = 0;
            this.itemCount = 0;
            this.prependCount = 0;
            this.isPrepending = false;
            this.appendCount = 0;
            this.resetCount = true;
            this.ifCallback = true;
            this.box = this.element;
            this.boxWidth = this.box.width();
            this.options = $.extend(true, {}, $.Gal.settings, options);
            this.gridArr = $.makeArray(this.box.find(this.options.selector));
            this.isResizing = false;
            this.w = 0;
            this.boxArr = [];

            // build columns
            this._setCols();
            // build grid
            this._renderGrid('append');
            // add class 'gridalicious' to container
            $(this.box).addClass('gridalicious');
            // add smartresize
            $(window).smartresize(function () {
                container.resize();
            });
        },

        _setName: function (length, current) {
            current = current ? current : '';
            return length ? this._setName(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
        },

        _setCols: function () {
            // calculate columns
            this.cols = Math.floor(this.box.width() / this.options.width);
            //If Cols lower than 1, the grid disappears
            if (this.cols < 1) { this.cols = 1; }
            diff = (this.box.width() - (this.cols * this.options.width) - this.options.gutter) / this.cols;
            w = (this.options.width + diff) / this.box.width() * 100;
            this.w = w;
            // add columns to box
            for (var i = 0; i < this.cols; i++) {
                var div = $('<div></div>').addClass('galcolumn').attr('id', 'item' + i + this.name).css({
                    'width': w + '%',
                    'paddingLeft': this.options.gutter,
                    'paddingBottom': this.options.gutter,
                    'float': 'left',
                    '-webkit-box-sizing': 'border-box',
                    '-moz-box-sizing': 'border-box',
                    '-o-box-sizing': 'border-box',
                    'box-sizing': 'border-box'
                });
                this.box.append(div);
            }
            
            
            this.box.find($('#clear' + this.name)).remove();
            // add clear float
            var clear = $('<div></div>').css({
                'clear': 'both',
                'height': '0',
                'width': '0',
                'display': 'block'
            }).attr('id', 'clear' + this.name);
            this.box.append(clear);
        },

        _renderGrid: function (method, arr, count, prepArray) {
            var items = [];
            var boxes = [];
            var prependArray = [];
            var itemCount = 0;
            var prependCount = this.prependCount;
            var appendCount = this.appendCount;
            var gutter = this.options.gutter;
            var cols = this.cols;
            var name = this.name;
            var i = 0;
            var w = $('.galcolumn').width();

            // if arr
            if (arr) {
                boxes = arr;
                // if append
                if (method == "append") {
                    // get total of items to append
                    appendCount += count;
                    // set itemCount to last count of appened items
                    itemCount = this.appendCount;
                }               
                // if prepend
                if (method == "prepend") {
                    // set itemCount
                    this.isPrepending = true;
                    itemCount = Math.round(count % cols);
                    if (itemCount <= 0) itemCount = cols; 
                }
                // called by _updateAfterPrepend()
                if (method == "renderAfterPrepend") {
                    // get total of items that was previously prepended
                    appendCount += count;
                    // set itemCount by counting previous prepended items
                    itemCount = count;
                }
            }
            else {
                boxes = this.gridArr;
                appendCount = $(this.gridArr).length;
            }

            // push out the items to the columns
            $.each(boxes, function (index, value) {
                var item = $(value);
                var width = '100%';
            
                // if you want something not to be "responsive", add the class "not-responsive" to the selector container            
                if (item.hasClass('not-responsive')) {
                  width = 'auto';
                }
                
                item.css({
                    'marginBottom': gutter,
                    'zoom': '1',
                    'filter': 'alpha(opacity=0)',
                    'opacity': '0'
                }).find('img, object, embed, iframe').css({
                    'width': width,
                    'height': 'auto',
                    'display': 'block',
                    'margin-left': 'auto',
                    'margin-right': 'auto'
                });
                
                // prepend on append to column
                if (method == 'prepend') {
                    itemCount--;
                    $("#item" + itemCount + name).prepend(item);
                    items.push(item);
                    if(itemCount == 0) itemCount = cols;
                    
                } else {
                    $("#item" + itemCount + name).append(item);
                    items.push(item);
                    itemCount++;
                    if (itemCount >= cols) itemCount = 0;
                    if (appendCount >= cols) appendCount = (appendCount - cols);
                }
            });

            this.appendCount = appendCount;
            this.itemCount = itemCount;

            if (method == "append" || method == "prepend") {
                if (method == "prepend") { 
                  // render old items and reverse the new items
                  this._updateAfterPrepend(this.gridArr, boxes);
                }
                this._renderItem(items);
                this.isPrepending = false;
            } else {
                this._renderItem(this.gridArr);
            }
        },

        _collectItems: function () {
            var collection = [];
            $(this.box).find(this.options.selector).each(function (i) {
                collection.push($(this));
            });
            return collection;
        },

        _renderItem: function (items) {

            var speed = this.options.animationOptions.speed;
            var effect = this.options.animationOptions.effect;
            var duration = this.options.animationOptions.duration;
            var queue = this.options.animationOptions.queue;
            var animate = this.options.animate;
            var complete = this.options.animationOptions.complete;

            var i = 0;
            var t = 0;

            // animate
            if (animate === true && !this.isResizing) {

                // fadeInOnAppear
                if (queue === true && effect == "fadeInOnAppear") {
                    if (this.isPrepending) items.reverse();
                    $.each(items, function (index, value) {
                        setTimeout(function () {
                            $(value).animate({
                                opacity: '1.0'
                            }, duration);
                            t++;
                            if (t == items.length) {
                                complete.call(undefined, items)
                            }
                        }, i * speed);
                        i++;
                    });
                } else if (queue === false && effect == "fadeInOnAppear") {
                    if (this.isPrepending) items.reverse();
                    $.each(items, function (index, value) {
                        $(value).animate({
                            opacity: '1.0'
                        }, duration);
                        t++;
                        if (t == items.length) {
                            if (this.ifCallback) {
                                complete.call(undefined, items);
                            }
                        }
                    });
                }

                // no effect but queued
                if (queue === true && !effect) {
                    $.each(items, function (index, value) {
                        $(value).css({
                            'opacity': '1',
                            'filter': 'alpha(opacity=100)'
                        });
                        t++;
                        if (t == items.length) {
                            if (this.ifCallback) {
                                complete.call(undefined, items);
                            }
                        }
                    });
                }

            // don not animate & no queue
            } else {
                $.each(items, function (index, value) {
                    $(value).css({
                        'opacity': '1',
                        'filter': 'alpha(opacity=100)'
                    });
                });
                if (this.ifCallback) {
                    complete.call(items);
                }
            }
        },

        _updateAfterPrepend: function (prevItems, newItems) {            
            var gridArr = this.gridArr;
            // add new items to gridArr
            $.each(newItems, function (index, value) {
                gridArr.unshift(value);
            })
            this.gridArr = gridArr;
        },

        resize: function () {
            if (this.box.width() === this.boxWidth) {
                return;
            }

            // delete columns in box
            this.box.find($('.galcolumn')).remove();
            // build columns
            this._setCols();
            // build grid
            this.ifCallback = false;
            this.isResizing = true;
            this._renderGrid('append');
            this.ifCallback = true;
            this.isResizing = false;
            this.boxWidth = this.box.width();
        },

        append: function (items) {
            var gridArr = this.gridArr;
            var gridArrAppend = this.gridArrPrepend;
            $.each(items, function (index, value) {
                gridArr.push(value);
                gridArrAppend.push(value);
            });
            this._renderGrid('append', items, $(items).size());
        },

        prepend: function (items) {
            this.ifCallback = false;
            this._renderGrid('prepend', items, $(items).size());
            this.ifCallback = true;
        },
    }

    $.fn.gridalicious = function (options, e) {
        if (typeof options === 'string') {
            this.each(function () {
                var container = $.data(this, 'gridalicious');
                container[options].apply(container, [e]);
            });
        } else {
            this.each(function () {
                $.data(this, 'gridalicious', new $.Gal(options, this));
            });
        }
        return this;
    }

})(jQuery);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/jrating.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('jRating', function() {
			return {
				restrict: 'E',
			    transclude: true,
			    scope: {
			    	rate: '=',
			    	totalRating: '=',
			    	readOnly: '=',
			    	rateChange: '&'
			    },
			    templateUrl: 'tpl/jrating.tpl.html',
			    link: function ( scope, element, attrs ) {
			    	scope.hoveringOver = function(value) {
			    		console.log('readONLY!',scope.readOnly);
			    		if ( scope.readOnly ) { return; }
					    scope.overStar = value;
					    scope.percent = 100 * (value / 5);
					};
					scope.$watch('rate', function ( newValue, oldValue ) {
						// Ignore first watch from initialization
						if (typeof oldValue === 'undefined') return;
						if ( newValue === oldValue ) return;

							//if ( newValue == 0 && oldValue ) {
								// User cleared their rating
								//console.log('cleared the rating');
			                //} else {
			                	// User set a rating
			                    console.log("I see a data change!", newValue);
			                    console.log(newValue, ' <=> ', oldValue);
			                    scope.rateChange();
			                //}
		            });
			    }
			};
		});

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/mw-annotator.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('mwAnnotator', [ function () {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var options = {};
                    if(attrs.mwAnnotator){
                        options = scope.$eval(attrs.mwAnnotator);
                    }
                    console.log(options);
                    var annotator = angular.element(element).annotator(options).data('annotator');
                    annotator.addPlugin('Unsupported');

                    if(attrs.annotatorTags){
                        annotator.addPlugin('Tags');
                    }

                    if(attrs.annotatorPermissions){
                        var permissionsOptions = scope.$eval(attrs.annotatorPermissions);
                        annotator.addPlugin('Permissions', permissionsOptions);
                    }

                    if(attrs.annotatorStore){
                        var storeOptions = scope.$eval(attrs.annotatorStore);
                        annotator.addPlugin('Store', storeOptions);
                    }

                    if(attrs.annotatorFilter){
                        var filterOptions = scope.$eval(attrs.annotatorFilter);
                        annotator.addPlugin('Filter', filterOptions);
                    }

                    if(attrs.annotatorAuth){
                        var authOptions = scope.$eval(attrs.annotatorAuth);
                        annotator.addPlugin('Auth', authOptions);
                    }


                    if(attrs.annotatorMarkdown){
                        annotator.addPlugin('Markdown');
                    }

                    if(attrs.annotatorPlugins){
                        scope.$watch( attrs.annotatorPlugins, function () {
                            var pluginList = scope.$eval(attrs.annotatorPlugins);
                            if(pluginList instanceof Array){
                                for(var i=0; i<pluginList.length; i++){
                                    var plugin = pluginList[i];


                                    var pluginName = null;
                                    var pluginOptions = null;
                                    if(typeof plugin === 'object'){
                                        pluginName = plugin.name;
                                        pluginOptions = plugin.options;
                                    }else if(typeof plugin === 'string'){
                                        pluginName = plugin;
                                    }
                                    if(pluginName){
                                        if(!pluginOptions){
                                            annotator.addPlugin(pluginName)
                                        }else{
                                            annotator.addPlugin(pluginName, pluginOptions);
                                        }

                                    }

                                }
                            }
                        }, true);
                    }
                }
            };
        }])
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/ng-files.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('ngFiles', function() {
		    return {
		      	scope: {ngFiles: "="},
            link: function(scope, element, attributes) {
              element.bind("change", function(changeEvent) {
                var reader = new FileReader();
                reader.onload = function(loadEvent) {
                  scope.$apply(function() {
                    scope.ngFiles = loadEvent.target.result;
                  });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
              });
            }
		    };
		});
    
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/ng-switcher.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('ngSwitcher', function() {
		    return {
		      	require: 'ngModel',
		      	restrict: 'AE',
		      	scope: {},
		      	template: "<div class=\"switch\" ng-class=\"{\'switch-left\': !model, \'switch-right\': model}\" ng-click=\"toggle()\">\n  <div class=\"switch-button\">&nbsp;</div>\n</div>",
		      	link: function(scope, element, attrs, ngModel) {
		        	var updateModel;
		        	updateModel = function() {
		          		return scope.model = ngModel.$viewValue;
		        	};
		        	scope.toggle = function() {
		          		ngModel.$setViewValue(!ngModel.$viewValue);
		          		return updateModel();
		        	};
		        	return ngModel.$render = function() {
		          		return updateModel();
		        	};
		      	}
		    };
		});

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/notification.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory("Notification", function($http, $q, localStorageService, Config){
            var _notification = [];
            var _notifications = {
                data: ""
            };
            var _getNotifications = function(id){
                var append = "";
                if(id){ append = "/"+id; }
                return $http({ method: 'GET', url: Config.apiPath+"notification"+append });
            };
            var _parseNotifications = function (data){
                var notifs = [];
                var newD = _getNotifData();

                $.each(data, function (index, notif) {
                    var n = notif;

                    // parse time values
                    var today = new Date();
                    var date = new Date(n.date);
                    var diffMs = (today - date); // milliseconds between now & a date
                    var diffDays = Math.round(diffMs / 86400000); // days
                    var diffWeeks = Math.round(diffDays / 7); // weeks
                    var diffMonths = Math.round(diffDays / 31); // weeks
                    var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

                    n.time = diffMins+" mins ago";
                    if(diffMins <= 5){
                        n.time = "Just now";
                    }
                    if(diffHrs >= 1){
                        n.time = diffHrs+" hrs ago";
                    }
                    if(diffDays >= 1){
                        n.time = diffDays+" days ago";
                    }
                    if(diffWeeks >= 1){
                        n.time = diffWeeks+" weeks ago";
                    }
                    if(diffMonths >= 1){
                        if(diffMonths === 1){
                            n.time = diffMonths+" month ago";
                        }else{
                            n.time = diffMonths+" months ago";
                        }
                    }
                    n.seen = false;

                    // Check for new
                    if(newD) {
                        $.each(newD, function (indx, newNotif) {
                            if (n.notification_id === newNotif.notification_id) {
                                if (newNotif.seen === true) {
                                    n.seen = true;
                                }
                                return false;
                            }
                        });
                    }

                    notifs.push(n);
                });

                return notifs;
            };
            var _getNotifData = function () {
                var notifData = localStorageService.get('notificationData');
                if (notifData)
                {
                    _notifications.data = notifData;
                }
                return notifData;
            };
            var _setNotifData = function (data) {
                localStorageService.set('notificationData', data);
                _notifications.data = data;
            };
            return{
                notification: _notification,
                notifications: _notifications,
                getNotifData: _getNotifData,
                setNotifData: _setNotifData,
                getNotifications: _getNotifications,
                parseNotifications: _parseNotifications
            };
        });
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/push.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .service('Push', function () {
        	var isSupported = Push.isSupported;

			function create ( title, options ) {
				return Push.create(title, options);
			}

			function close ( tag ) {
				Push.close( tag );
			}

			function clear () {
				Push.clear();
			}

			return {
				create: create,
				close: close,
				clear: clear,
				isSupported: isSupported
			}
        });
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/session.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .service('Session', function () {
            this.create = function (sessionId, userId, userRole) {
                this.id = sessionId;
                this.userId = userId;
                this.userRole = userRole;
            };
            this.destroy = function () {
                this.id = null;
                this.userId = null;
                this.userRole = null;
            };
            return this;
        });
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/setting.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
		.factory('Setting', ['$http', '$q', 'Config', function ( $http, $q, Config ) {

			var prefix;

			function set () {
				prefix = Config.apiPath + 'setting';	
			}

		    function all ( data ) {
		        return $http.get( prefix, { params: data } );
		    }

		    return {
		    	set: set,
		        all: all
		    }
		}]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/timepickerdirective.js":[function(require,module,exports){
/*global angular */
/*
 Directive for jQuery UI timepicker (http://jonthornton.github.io/jquery-timepicker/)

 */
var m = angular.module('ui.timepicker', []);


m.value('uiTimepickerConfig', {
    'step': 15
});

m.directive('uiTimepicker', ['uiTimepickerConfig', '$parse', '$window', function(uiTimepickerConfig, $parse, $window) {
    var moment = $window.moment;

    var isAMoment = function(date) {
        return moment !== undefined && moment.isMoment(date) && date.isValid();
    };
    var isDateOrMoment = function(date) {
        return date !== null && (angular.isDate(date) || isAMoment(date));
    };

    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            baseDate: '=',
            uiTimepicker: '=',
        },
        priority: 1,
        link: function(scope, element, attrs, ngModel) {
            'use strict';
            var config = angular.copy(uiTimepickerConfig);
            var asMoment = config.asMoment || false;
            var date = null;
            delete config.asMoment;

            ngModel.$render = function() {
                var date = ngModel.$modelValue;
                if (!angular.isDefined(date)) {
                    return;
                }
                if (date !== null && date !== '' && !isDateOrMoment(date)) {
                    throw new Error('ng-Model value must be a Date or Moment object - currently it is a ' + typeof date + '.');
                }
                if (isAMoment(date)) {
                    date = date.toDate();
                }
                if (!element.is(':focus') && !invalidInput()) {
                    element.timepicker('setTime', date);
                }
                if(date === null){
                    resetInput();
                }
            };

            scope.$watch('ngModel', function() {
                ngModel.$render();
            }, true);

            config.appendTo = config.appendTo || element.parent();

            element.timepicker(
                angular.extend(
                    config, scope.uiTimepicker ?
                        scope.uiTimepicker :
                        {}
                )
            );

            // ** Fix for issue #28 - https://github.com/Recras/angular-jquery-timepicker/issues/28
            scope.$watch('uiTimepicker', function ( options ){
                element.timepicker( 'option', options );
            }, true);

            var resetInput = function(){
                element.timepicker('setTime', null);
                ngModel.$setViewValue(date);
            };

            var userInput = function() {
                return element.val().trim();
            };

            var invalidInput = function() {
                return userInput() && ngModel.$modelValue === null;
            };

            element.on('$destroy', function() {
                element.timepicker('remove');
            });

            var asDate = function() {
                var baseDate = ngModel.$modelValue ? ngModel.$modelValue : scope.baseDate;
                return isAMoment(baseDate) ? baseDate.toDate() : baseDate;
            };

            var asMomentOrDate = function(date) {
                return asMoment ? moment(date) : date;
            };

            if (element.is('input')) {
                ngModel.$parsers.unshift(function(viewValue) {
                    var date = element.timepicker('getTime', asDate());
                    return date ? asMomentOrDate(date) : date;
                });

                // ** Fix for issue "Cannot set property 'time' of undefined"
                //    wrapped following code in an if statement
                if( ngModel.$validators ) {
                    ngModel.$validators.time = function(modelValue) {
                        return (!attrs.required && !userInput()) ? true : isDateOrMoment(modelValue);
                    };
                }
            } else {
                element.on('changeTime', function() {
                    scope.$evalAsync(function() {
                        var date = element.timepicker('getTime', asDate());
                        ngModel.$setViewValue(date);
                    });
                });
            }
        }
    };
}]);

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/user.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('User', function ( $http, $q, Config ) {
            var _errors = [];
            var _user = [];
            var _getUser = function(id){
                return $http({ method: 'GET', url: Config.apiPath+"user/"+id });
            };

            var _getCountries = function(){
                return $http({ method: 'GET', url:  Config.apiPath+"country" });
            };

            var _updateProfile = function(user){
                return $http.put( Config.apiPath+'user/profile', user );
            };

            var _updateUser = function(id, userData){
                return $http.put(Config.apiPath+"user/"+id, userData);
            };

            var _updateSubscription = function( sub ){
                return $http.put(Config.apiPath+'subscription/'+sub.subscription_id, sub);
            };

            var _createSubscription = function( sub ){
                return $http.post(Config.apiPath+'subscription', sub);
            };

            var _addAccountToGroupSub = function( subscription_id, account ){
                return $http.post( Config.apiPath+'subscription/' + subscription_id + '/group', account );
            };

            var _removeAccountFromGroupSub = function( subscription_id, subscription_group_id ){
                return $http.delete( Config.apiPath+'subscription/' + subscription_id + '/group/' + subscription_group_id );
            };

            var _getSubGroupAccountWithCode = function( group, code ){
                return $http.get( Config.apiPath+'subscription/group/'+group+'/code/' + code );
            };

            var _checkReferralCode = function( code ){
                return $http.get( Config.apiPath+'user/referral/'+code );
            };

        	var _cancelSub = function( id, data ){
                return $http.post( Config.apiPath+'subscription/'+id+'/cancel', data );
            };
            var _reactivateSub = function( id ){
                return $http.post( Config.apiPath+'subscription/'+id+'/reactivate', {} );
            };

            return{
                user: _user,
                errors: _errors,
                getUser: _getUser,
                updateProfile: _updateProfile,
                updateUser: _updateUser,
                updateSubscription: _updateSubscription,
                createSubscription: _createSubscription,
                addAccountToGroupSub: _addAccountToGroupSub,
                removeAccountFromGroupSub: _removeAccountFromGroupSub,
                getSubGroupAccountWithCode: _getSubGroupAccountWithCode,
                checkReferralCode: _checkReferralCode,
        		cancelSub: _cancelSub,
                reactivateSub: _reactivateSub,
                getCountry: _getCountries
            };
        });
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/common/xeditable.tinymce.directive.js":[function(require,module,exports){
//tinymce
angular.module('xeditable').directive('editableTinymce', ['editableDirectiveFactory',
    function(editableDirectiveFactory) {
        var tinymce = {
            plugins: ['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks code fullscreen','insertdatetime media table contextmenu paste'],
            hidden_input: false,
            branding: false,
            height: 350,
            allow_unsafe_link_target: true,
            allow_html_in_named_anchor: true,
            valid_elements : '*[*]',
            content_style: 'body { font-size: 16px !important; }',
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
            /*menu: {
                file: {title: 'File', items: 'newdocument'},
                edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
                insert: {title: 'Insert', items: 'link media | template hr'},
                view: {title: 'View', items: 'visualaid'},
                format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
                table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
                tools: {title: 'Tools', items: 'spellchecker code'}
            }*/
        };
        return editableDirectiveFactory({
            directiveName: 'editableTinymce',
            inputTpl: "<textarea ui-tinymce='" + JSON.stringify( tinymce ) + "'></textarea>",
            addListeners: function() {
                var self = this;
                self.parent.addListeners.call(self);
                // submit textarea by ctrl+enter even with buttons
                if (self.single && self.buttons !== 'no') {
                    self.autosubmit();
                }
            },
            autosubmit: function() {
                var self = this;
                self.inputEl.bind('keydown', function(e) {
                    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13)) {
                        self.scope.$apply(function() {
                            self.scope.$form.$submit();
                        });
                    }
                });
            }
        });
}]);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/dashboard/dashboard.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('DashboardCtrl', ['$scope', '$uibModal', 'Category', 'Calendar', 'User', '$window', '$interval', 'Gallery', function ( $scope, $uibModal, Category, Calendar, User, $window, $interval, Gallery ) {
        	console.log('DashboardCtrl initiated. Rogue One underway!!');
        	$scope.loaded = false;
            $scope.billingData = {};
            $scope.affiliateData = {};
        	$scope.announcements = [
                {
                    message: 'NEW! Ability to upload a profile picture',
                    tagline: 'Check it out on <a ui-sref="dashboard.profile">your profile</a>',
                    date: '2017-09-19',
                    link: 'dashboard.profile'
                },
        		{
        			message: 'NEW site released',
        			tagline: 'Explore it now.',
        			date: '2017-07-28',
                    link: 'dashboard'
        		},
        		{
        			message: 'The Member Map is now available!',
        			tagline: 'Check it out <a ui-sref="memberMap">now</a>',
        			date: '2017-07-26',
                    link: 'memberMap'
        		},
        		{
        			message: 'The Calendar is now available!',
        			tagline: 'Check it out in your <a ui-sref="dashboard.calendar">dashboard</a>',
        			date: '2017-07-21',
                    link: 'dashboard.calendar'
        		}
        	];
            var currentDay = moment( new Date() );
            $scope.today = currentDay.toDate();
            $scope.plans = [
                {
                    'name': 'FREE Member',
                    'tagline': '',
                    'price': 0.00,
                    'duration': 'month',
                    'package_id': 21,
                    'features': 'School Calendar<br/> My Way Toolset<br/> Member Connect'
                },
                {
                    'name': 'K-8 Family',
                    'tagline': '',
                    'price': 37.00,
                    'annual': 337.00,
                    'duration': 'month',
                    'package_id': 8,
                    'features': 'My Way Toolset<br /> Member Connect<br /> Schoolhouse Organizer'
                },
                {
                    'name': 'K-12 Family ',
                    'tagline': '',
                    'price': 43.00,
                    'annual': 397.00,
                    'duration': 'month',
                    'package_id': 1,
                    'features': '9 – 12 courses<br/> Self-paced<br/> Credit (Optional Add-on)'
                },
                {
                    'name': 'K-12 Co-op',
                    'tagline': '',
                    'price': 199.00,
                    'annual': 1800.00,
                    'duration': 'month',
                    'package_id': 5,
                    'features': '10 Premium Memberships<br/> Co-op & Academy Training<br/> For Local & Online Groups!'
                },
                {
                    'name': 'K-8 Family (Annual)',
                    'tagline': '',
                    'price': 33.00,
                    'duration': 'month, billed annually',
                    'package_id': 10,
                    'features': 'My Way Toolset<br /> Member Connect<br /> Schoolhouse Organizer'
                },
                {
                    'name': 'K-12 Family (Annual)',
                    'tagline': '',
                    'price': 39.00,
                    'duration': 'month, billed annually',
                    'package_id': 11,
                    'features': '9 – 12 courses<br/> Self-paced<br/> Credit (Optional Add-on)'
                },
                {
                    'name': 'K-12 Co-op (Annual)',
                    'tagline': '',
                    'price': 179.00,
                    'duration': 'month, billed annually',
                    'package_id': 12,
                    'features': '10 Premium Memberships<br/> Co-op & Academy Training<br/> For Local & Online Groups!'
                },
            ];


            // FETCH latest user data
            var functionsAfterUserLoads = [];
            $scope.getUser = function () {
                $scope.viewLoading = true;
                $scope.processing = true;
                User.getUser('current').then(function(user) {
                    console.log('USER HAS BEEN FETCHED!');
                    if ( user.settings ) {
                        if ( !user.settings.memberMap ) { 
                            user.settings.memberMap = {};
                            user.settings.memberMap.firstName = true; 
                        }
                        if ( !user.settings.notifications ) {
                            user.settings.notifications = {};
                            user.settings.notifications.frequency = 'immediate';
                            user.settings.notifications.newForumThread = true;
                            user.settings.notifications.newReplyInThread = true;
                            user.settings.notifications.newReplyToPost = true;
                        }

                    }
                    $scope.user = user;
                    // Check image/avatar exist or not
                    $scope.userAvatar = 'https://s3.amazonaws.com/ahs-images/images/avatar/avatar_'+$scope.user.user_id+'.png';
                    imageExists($scope.userAvatar, function(exists) {
                      if(!exists){
                        $scope.userAvatar = null;
                        $scope.userAvatar = 'https://d3on0sn17ay79c.cloudfront.net/images/general/noavatar3_29x29.png';
                      }
                    });
                    parseBillingInfo();
                    if ( user.subscription ) {
                        $scope.affiliateData.price = user.subscription.recurly.unit_amount_in_cents / 100;

                        // Check free trial status
                        if ( user.subscription.recurly.trial_ends_at && user.subscription.package.package_id !== '21' ) {
                            var cD = moment( new Date() );
                            var eD = moment( user.subscription.recurly.trial_ends_at.date );
                            if ( cD.isBefore( eD ) ) {
                                // Still in a free trial
                                var dayDiff = eD.diff( cD, 'days' );
                                $scope.trialDaysLeft = ( dayDiff == 0 ) ? 'today' : 'in ' + dayDiff + ' days';
                            }
                        }
                    } else {
                        $scope.affiliateData.price = 0;
                    }
                    $scope.affiliateData.steps = Math.ceil( $scope.affiliateData.price / $scope.siteConfig.referral_credit_amt );
                    $scope.affiliateData.max = ($scope.affiliateData.steps * 10) + 0.01;
                    $scope.affiliateData.credits = 2;
                    $scope.affiliateData.creditAmt = $scope.siteConfig.referral_credit_amt;
                    console.log('USER => ', user);
                    console.log('affiliateData',$scope.affiliateData);
                    $scope.viewLoading = false;
                    $scope.processing = false;
                    if ( functionsAfterUserLoads ) {
                        angular.forEach( functionsAfterUserLoads, function ( func ) {
                            func( $scope.user );
                        });
                    }
                });
            };
            $scope.getUser();

            $scope.fetchLatestUserData = function ( callback ) {
                if ( $scope.viewLoading ) {
                    functionsAfterUserLoads.push(callback);
                } else {
                    callback( $scope.user );
                }
            };

            // Function for the invite friends success bar
            $scope.range = function(n) {
                return new Array(n);
            };


        	// FETCH user bookmarked categories
            var request = { 'deep': { 'include': [ 'lessons', 'parent_category' ] } };
        	Category.bookmarked(request).then( function ( categories ) {
        		$scope.bookmarkedCategories = categories;
        		$scope.loaded = true;
        		console.log($scope.bookmarkedCategories);
        	}, function () { $scope.loaded = true; });

        	// ALLOW un-bookmarking a category
        	$scope.unbookmarkCategory = function ( index ) {
				Category.removeBookmark( $scope.bookmarkedCategories[index].category_id );
				$scope.bookmarkedCategories.splice( index, 1 );
			};

            $scope.fetchTodaysEvents = function ( date ) {
                $scope.loadingEvents = true;
                var data = {};
                if ( date ) {
                    data.start_date = date;
                }
                Calendar.getTodaysEvents( data ).then( function ( events ) {
                    console.log(events);
                    $scope.todaysEvents = events;
                    $scope.loadingEvents = false;
                });
            };
            $scope.fetchTodaysEvents();


            // FETCH photos for the photo gallery carousel
            $scope.fetchGalleryPhotos = function () {
                var request = {};
                request.filters = JSON.stringify( { 'system': 0 } );
                Gallery.all( request ).then( function ( results ) {
                    results = shuffle(results);
                    $scope.slides = results;
                });
            };
            $scope.fetchGalleryPhotos();
            var slideChanger;
            $scope.currSlide = 1;
            $scope.nextSlide = function () {
                if ( $scope.currSlide == $scope.slides.length ) {
                    $scope.currSlide = 1;
                } else {
                    $scope.currSlide++;
                }
                cancelSlider(); initiateSlider();
            };
            $scope.backSlide = function () {
                if ( $scope.currSlide == 1 ) {
                    $scope.currSlide = $scope.slides.length;
                } else {
                    $scope.currSlide--;
                }
                cancelSlider(); initiateSlider();
            };
            // Automatically change slides
            function initiateSlider () {
                slideChanger = $interval( $scope.nextSlide, 3500 );
            }
            function cancelSlider () {
                $interval.cancel( slideChanger );
            }
            initiateSlider();



            // SUBSCRIPTION / MEMBERSHIP FUNCTIONS
            $scope.cancelSub = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'tpl/subscription.cancel.modal.tpl.html',
                    controller: function ( $scope, $uibModalInstance ) {
                        $scope.cancelQuestions1 = [
                            { name: 'Just to have a look around; I didn\'t intend to become a paying member.', selected: false },
                            { name: 'I wanted a curriculum that would integrate principles of the Gospel into academics.', selected: false },
                            { name: 'I wanted a curriculum that was simple to follow, prepare, and teach.', selected: false },
                            { name: 'To help me add some organization and structure to my home school.', selected: false },
                            { name: 'It was highly recommended by a friend or family member.', selected: false },
                            { name: 'I was looking for a resource to save me time.', selected: false },
                            { name: 'It was affordable.', selected: false }
                        ];

                        $scope.cancelQuestions2 = [
                            { name: 'It was too much curriculum.', selected: false },
                            { name: 'I was difficult or not engaging for my children.', selected: false },
                            { name: 'It was too difficult or time consuming to prepare to teach a lesson.', selected: false },
                            { name: 'There was not enough academics and/or too much principle.', selected: false },
                            { name: 'I needed a curriculum that included all subjects (i.e. math, language arts)', selected: false },
                            { name: 'It didn\'t match with my teaching philosophy.', selected: false },
                            { name: 'It didn\'t match my children\'s learning styles.', selected: false },
                            { name: 'It took too long to teach.', selected: false },
                            { name: 'The website layout and/or tools were too complex.', selected: false },
                            { name: 'I often felt overwhelmed or behind.', selected: false },
                            { name: 'It was too expensive for how I was using it.', selected: false },
                            { name: 'We had to put our children back in public school.', selected: false },
                            { name: 'I could not receive the support I needed when I had questions.', selected: false },
                            { name: 'The curriculum did not address the needs of children with learning challenges adequately.', selected: false }
                        ];
                        $scope.close = function ( ok ) {
                            if( ok ){
                                var q1 = $scope.cancelQuestions1.filter(function (q){
                                    return ( q.selected ) ? q.name : false;
                                }).map( function (q) { return q.name });
                                var q2 = $scope.cancelQuestions2.filter(function (q){
                                    if ( q.selected ) { return q.name }
                                }).map( function (q) { return q.name });
                                var q3 = $scope.cancelQuestions3;
                                var questions = [
                                    {
                                        "why_joined": q1
                                    },
                                    {
                                        "why_discontinue": q2
                                    },
                                    {
                                        "if_perfect": q3
                                    }
                                ];
                                questions = { questions: JSON.stringify(questions) };
                                $uibModalInstance.close( questions );
                            } else {
                                $uibModalInstance.dismiss('cancel');
                            }
                        };
                    },
                    size: "md",
                    backdrop: "static",
                    keyboard: false
                });
                modalInstance.result.then( function ( questions ) {
                    $scope.sError = false;
                    var subscription = $scope.user.subscription;
                    var s = subscription.recurly.state;
                    subscription.recurly.state = "canceled";
                    User.cancelSub(subscription.subscription_id, questions).then(function(sub) {
                        console.log(sub);
                        $scope.getUser();
                        //$window.location.reload();
                    },function(errors){
                        subscription.recurly.state = s;
                        $scope.sError = errors[0];
                    });
                });
            };
            $scope.reactivateSub = function (index) {
                var cp = $window.confirm('Are you sure you want to reactivate the subscription?');

                if (cp) {
                    $scope.sError = false;
                    var subscription = $scope.user.subscription;
                    var s = subscription.recurly.state;
                    subscription.recurly.state = "active";
                    User.reactivateSub(subscription.subscription_id).then(function(sub) {
                        console.log(sub);
                        $scope.getUser();
                        //$window.location.reload();
                    },function (errors) {
                        subscription.recurly.state = s;
                        $scope.sError = errors[0];
                    });
                }
            };
            $scope.changePlan = function ( package_id ) {
                var plan;
                angular.forEach( $scope.plans, function ( pl ) {
                    if ( pl.package_id == package_id ) {
                        plan = pl;
                    }
                });
                // Show modal
                var modalInstance = $uibModal.open({
                    templateUrl: 'tpl/subscription.plans.modal.tpl.html',
                    controller: function ($scope, $uibModalInstance, plan) {
                        $scope.plan = plan;
                        $scope.viewLoading = true;
                        $scope.data = {};
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss();
                        };
                        $scope.ok = function () {
                            $uibModalInstance.close( $scope.data );
                        };
                    },
                    size: "lg",
                    backdrop: "static",
                    keyboard: false,
                    resolve: {
                        plan: plan
                    }
                });
                modalInstance.result.then(function( data ) {
                    function processPlanChange ( questions ) {
                        $scope.processing = true;
                        var questions = ( questions ) ? questions : '';

                        var sub = {
                            package_id: package_id
                        };
                        if ( data.coupon_code ) {
                            sub.coupon_code = data.coupon_code;
                        }

                        if($scope.user.subscription){
                            // Change plan
                            sub.subscription_id = $scope.user.subscription.subscription_id;
                            if ( questions) { sub.questions = questions.questions; }

                            User.updateSubscription( sub ).then(function () {
                                $scope.getUser();
                            }, function (errors) {
                                $scope.processing = false;
                                console.log('error', errors);
                                alert('There was a problem changing your plan.  Details: '+errors[0]);
                            });
                        } else {
                            // Create subscription
                            User.createSubscription( sub ).then(function () {
                                $scope.getUser();
                            }, function (errors) {
                                $scope.processing = false;
                                console.log('error', errors);
                                alert('There was a problem changing your plan.  Details: '+errors[0]);
                            })
                        }
                    }

                    // SHOW EXIT SURVEY, if downgrading to free plan
                    if ( package_id == '21' ) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'tpl/subscription.cancel.modal.tpl.html',
                            controller: function ( $scope, $uibModalInstance ) {
                                $scope.cancelQuestions1 = [
                                    { name: 'Just to have a look around; I didn\'t intend to become a paying member.', selected: false },
                                    { name: 'I wanted a curriculum that would integrate principles of the Gospel into academics.', selected: false },
                                    { name: 'I wanted a curriculum that was simple to follow, prepare, and teach.', selected: false },
                                    { name: 'To help me add some organization and structure to my home school.', selected: false },
                                    { name: 'It was highly recommended by a friend or family member.', selected: false },
                                    { name: 'I was looking for a resource to save me time.', selected: false },
                                    { name: 'It was affordable.', selected: false }
                                ];

                                $scope.cancelQuestions2 = [
                                    { name: 'It was too much curriculum.', selected: false },
                                    { name: 'I was difficult or not engaging for my children.', selected: false },
                                    { name: 'It was too difficult or time consuming to prepare to teach a lesson.', selected: false },
                                    { name: 'There was not enough academics and/or too much principle.', selected: false },
                                    { name: 'I needed a curriculum that included all subjects (i.e. math, language arts)', selected: false },
                                    { name: 'It didn\'t match with my teaching philosophy.', selected: false },
                                    { name: 'It didn\'t match my children\'s learning styles.', selected: false },
                                    { name: 'It took too long to teach.', selected: false },
                                    { name: 'The website layout and/or tools were too complex.', selected: false },
                                    { name: 'I often felt overwhelmed or behind.', selected: false },
                                    { name: 'It was too expensive for how I was using it.', selected: false },
                                    { name: 'We had to put our children back in public school.', selected: false },
                                    { name: 'I could not receive the support I needed when I had questions.', selected: false },
                                    { name: 'The curriculum did not address the needs of children with learning challenges adequately.', selected: false }
                                ];
                                $scope.close = function ( ok ) {
                                    if( ok ){
                                        var q1 = $scope.cancelQuestions1.filter(function (q){
                                            return ( q.selected ) ? q.name : false;
                                        }).map( function (q) { return q.name });
                                        var q2 = $scope.cancelQuestions2.filter(function (q){
                                            if ( q.selected ) { return q.name }
                                        }).map( function (q) { return q.name });
                                        var q3 = $scope.cancelQuestions3;
                                        var questions = [
                                            {
                                                "why_joined": q1
                                            },
                                            {
                                                "why_discontinue": q2
                                            },
                                            {
                                                "if_perfect": q3
                                            }
                                        ];
                                        questions = { questions: JSON.stringify(questions) };
                                        $uibModalInstance.close( questions );
                                    } else {
                                        $uibModalInstance.dismiss('cancel');
                                    }
                                };
                            },
                            size: "md",
                            backdrop: "static",
                            keyboard: false
                        });
                        modalInstance.result.then( function ( questions ) {
                            processPlanChange( questions );
                        });
                    } else {
                        processPlanChange();
                    }

                    
                }, function() {
                    //Modal dismissed
                });
            };
            $scope.addSubAccount = function () {
                if (!$scope.user.subscription.group.accounts){
                    $scope.user.subscription.group.accounts = [];
                }
                $scope.user.subscription.group.accounts.push({})
            };
            $scope.removeGroupAccount = function ( index ) {
                var account = $scope.user.subscription.group.accounts[ index ];
                if ( account.insert_date ) {
                    var r = confirm( "Are you sure you want to remove this account from your subscription group?" );
                    if (r == true) {
                        account.loading=true;
                        User.removeAccountFromGroupSub( $scope.user.subscription.subscription_id, account.subscription_group_id )
                        .then( function () {
                            $scope.user.subscription.group.accounts.splice( index, 1 );
                        }, function ( error ) {
                            account.loading=false;
                            console.log( ' Oh dear...' );
                        });
                    } else {
                        return false;
                    }
                } else {
                    $scope.user.subscription.group.accounts.splice( index, 1 );
                }
            };
            $scope.sendInvite = function ( index ) {
                var account = $scope.user.subscription.group.accounts[ index ];
                if ( account.email ) {
                    account.loading = true;
                    User.addAccountToGroupSub( $scope.user.subscription.subscription_id, { email: account.email } )
                    .then( function ( result ) {
                        $scope.user.subscription.group.accounts[ index ] = result;
                        console.log($scope.user.subscription.group.accounts[ index ]);
                    }, function ( error ) {
                        console.log( ' Oh dear...' );
                        $scope.subGroupError = error[1];
                    });
                }
            };

            // Friend to Friend center
            $scope.disableEditCode = false;
            $scope.customizeCode = false;
            $scope.editCode = function ( code ) {
                $scope.disableEditCode = true;
                $scope.refCodeError = false;
                var user = {
                    user_id: $scope.user.user_id,
                    referral_code: code
                };
                User.updateProfile( user )
                    .then( function () {
                        $scope.user.referral_code = code;
                        $scope.disableEditCode = false;
                        $scope.refCodeError = false;
                        $scope.customizeCode = false;
                    }, function ( error ) {
                        $scope.refCodeError = error[0];
                        $scope.disableEditCode = false;
                    });
            };
            $scope.showEditCode = function ( val ) {
                $scope.customizeCode = val;
            };

            // Friend to Friend terms popup modal
            $scope.openF2FTerms = function () {
                var modalInstance = $uibModal.open({
                        templateUrl: 'tpl/referral-terms-conditions.modal.tpl.html',
                        controller: function ($scope, $uibModalInstance) {
                            $scope.close = function (d) {
                                if(d) {
                                    $uibModalInstance.close(d);
                                }else{
                                    $uibModalInstance.dismiss();
                                }
                            };
                        },
                        size: "lg",
                        backdrop: true,
                        keyboard: false
                    });
            };


            // Dashboard day-view calendar, forward/back
            $scope.forwardDay = function () {
                var day = currentDay.add( 1, 'days' ); // +1 day
                var formatted = day.format( "YYYY-MM-DD" );
                $scope.fetchTodaysEvents( formatted );
                $scope.today = day.toDate();
            };
            $scope.backDay = function () {
                var day = currentDay.subtract( 1, 'days' ); // +1 day
                var formatted = day.format( "YYYY-MM-DD" );
                $scope.fetchTodaysEvents( formatted );
                $scope.today = day.toDate();
            };

            $scope.refreshAvatar = function () {
                $scope.userAvatar = $scope.userAvatar + '?' + new Date().getTime();
            };


            // HELPER Functions
            function parseBillingInfo () {
                if ( $scope.user.recurly.billing_info ) {
                    angular.forEach($scope.user.recurly.billing_info, function (val, key){
                        $scope.billingData[key] = val;
                    });
                    $scope.billingData.postal_code = $scope.billingData.zip;
                }
            }

            // function : to check image exists or not
            function imageExists(url, callback) {
              var img = new Image();
              img.onload = function() { callback(true); };
              img.onerror = function() { callback(false); };
              img.src = url;
            }

            /**
             * Shuffles array in place.
             * @param {Array} a items An array containing the items.
             */
            function shuffle(a) {
                var j, x, i;
                for (i = a.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = a[i];
                    a[i] = a[j];
                    a[j] = x;
                }
                return a;
            }

        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/file/resource.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('Resource', ['$http', 'Config', '$q', '$stateParams', function ( $http, Config, $stateParams ) {
            
            var prefix = Config.apiPath + 'resource';

            function getResourceList ( DTO ) {
                return $http.get( prefix + '/list/' + $stateParams.lesson_order, { params: DTO } );
            }
            function getResource ( id ) {
                return $http.get( prefix + '/' + id );
            }
            
            return {
                getResourceList: getResourceList,
                getResource: getResource
            };
        }]);
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/forum/forum.course.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('ForumCourseCtrl', ['$scope', '$state', '$stateParams', 'Forum', '$uibModal', 'Category', function ( $scope, $state, $stateParams, Forum, $uibModal, Category ) {

        	var courseID = $stateParams.id;

			/**
		     * Fetch category info
		     */
        	$scope.newThread = function ( type ) {
        		var modalInstance = $uibModal.open({
                    templateUrl: 'tpl/new.thread.modal.tpl.html',
                    controller: function ( $scope, type, $uibModalInstance ) {
                    	$scope.thread = {
                    		type: type
                    	}
                        $scope.close = function ( thread ) {
                            if( thread ){
                                $uibModalInstance.close( thread );
                            } else {
                                $uibModalInstance.dismiss('cancel');
                            }
                        };
                    },
                    size: "md",
                    backdrop: "static",
                    keyboard: false,
                    resolve: {
                        type: function () { return type; }
                    }
                });
                modalInstance.result.then( function ( data ) {
                	data.course_id = courseID;
                	data.user_id = $scope.user.user_id;
                	data.created_date = moment( new Date() ).format( "YYYY-MM-DD HH:mm:ss" );
                	Forum.createThread( data ).then( function () {
                		$state.reload();
                	});
                });
        	};


		    /**
        	 * Call the Forum service to retrieve the threads that match this course forum
        	 */
		    function fetchThreads ( id ) {
		    	// Fetch subject categories
			    var request = {};
			    request.deep = JSON.stringify ( { 'include': [ 'user', 'replies_count' ] } );
			    request.filters = JSON.stringify( { 'course_id': id } );

			    Forum.threads( request ).then( function ( threads ) {

			    	if ( threads.constructor !== Array ) { threads = [ threads ]; }
			    	var matrix = {};
			    	// Separate threads by type
			    	threads.map( function ( thread ) {
			    		if ( !matrix[thread.type] ) { matrix[thread.type] = []; }
			    		matrix[thread.type].push( thread );
			    	});

			        $scope.threads = matrix;
			        console.log($scope.threads);
			    });
		    }

		    fetchThreads( courseID );


		    /**
		     * Fetch category info
		     */
		    Category.one( courseID ).then( function ( category ) {
		    	$scope.category = category;
		    	$scope.setHeader( 'Course Forum', category.name, category.icon );
		    });


        }]);

})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/forum/forum.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('Forum', ['$http', 'Config', function ( $http, Config ) {

            var prefix = Config.apiPath + 'forum';

            function thread ( id, data ) {
                return $http.get( prefix + '/thread/' + id, { params: data } );
            }

            function threads ( data ) {
                return $http.get( prefix + '/thread', { params: data } );
            }

            function createThread ( data ) {
                return $http.post( prefix + '/thread', data );
            }

            function updateThread ( id, data ) {
                return $http.put( prefix + '/thread/' + id, data );
            }

            function removeThread ( id ) {
                return $http.delete( prefix + '/thread/' + id );
            }

            function replyThread ( id, data ) {
                return $http.post( prefix + '/thread/' + id + '/reply', data );   
            }

            function deleteReply ( id ) {
                return $http.delete( prefix + '/reply/' + id );   
            }

            function updateReply ( id, data ) {
                return $http.put( prefix + '/reply/' + id, data );   
            }


            return {
                thread: thread,
                threads: threads,
        		createThread: createThread,
                updateThread: updateThread,
                removeThread: removeThread,
                replyThread: replyThread,
                deleteReply: deleteReply,
                updateReply: updateReply
            }
        }]);
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/forum/forum.thread.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('ForumThreadCtrl', ['$scope', '$state', '$stateParams', 'Forum', '$uibModal', 'Category', function ( $scope, $state, $stateParams, Forum, $uibModal, Category ) {

        	/**
        	 * Reply to a thread
        	 */
        	$scope.postReply = function () {
        		if ( !$scope.reply ) { return false; }
        		var data = { message: $scope.reply, user_id: $scope.user.user_id, created_date: moment( new Date() ).format( "YYYY-MM-DD HH:mm:ss" ) };
        		$scope.reply = '';
        		Forum.replyThread( $scope.thread.forum_thread_id, data ).then( function ( reply ) {
        			$scope.thread.replies.push( reply );
        		});
        	};

        	/**
        	 * Delete a reply to a thread
        	 */
        	$scope.deleteReply = function ( index ) {
        		var conf = window.confirm("Are you sure you'd like to delete this post?");
        		if ( conf ) {
	        		Forum.deleteReply( $scope.thread.replies[index].forum_reply_id ).then( function () {
	        			$scope.thread.replies.splice( index, 1 );
	        		});
        		}
        	};

        	/**
        	 * Edit a reply to a thread
        	 */
        	$scope.showEditReply = function ( index ) {
        		$scope.thread.replies[index].edit=true;
        		$scope.thread.replies[index].cache=$scope.thread.replies[index].message;
        	};
        	$scope.cancelEditReply = function ( index ) {
        		$scope.thread.replies[index].edit=false;
        		$scope.thread.replies[index].message=$scope.thread.replies[index].cache;
        	};
        	$scope.saveEditReply = function ( index ) {
        		if ( !$scope.thread.replies[index].message ) { return false; }
        		var data = { message: $scope.thread.replies[index].message, edited_date: moment( new Date() ).format( "YYYY-MM-DD HH:mm:ss" ) };
        		Forum.updateReply( $scope.thread.replies[index].forum_reply_id, data ).then( function ( reply ) {
        			$scope.thread.replies[index].edited_date=data.edited_date;
        			$scope.thread.replies[index].edit=false;
        		});
        	};


		    /**
        	 * Fetch the appropriate thread
        	 */
		    function fetchThread ( id ) {
		    	// Fetch subject categories
			    var request = {};
			    request.deep = JSON.stringify ( { 'include': [ 'user', 'replies', 'replies_count', 'course' ] } );
			    Forum.thread( id, request ).then( function ( thread ) {
			        $scope.thread = thread;
			        $scope.setHeader( 'Course Forum', thread.course.name, thread.course.icon );
			        console.log($scope.thread);
			    });
		    }

		    fetchThread( $stateParams.id );

        }]);

})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/gallery/gallery.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('GalleryCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'Gallery', function ( $scope, $state, $stateParams, $uibModal, Gallery ) {

        	/**
        	 * Redirect to sub-level if land on parent by itself
        	 */
	        if ( $state.current.name == 'gallery') {
	            $state.go('gallery.type', { type: 'ours' });    // Default state
	        }

	        /**
		     * Modal for uploading images
		     */
        	$scope.uploaderModal = function ( cat ) {
        		var modalInstance = $uibModal.open({
                    templateUrl: 'tpl/gallery.uploader.modal.tpl.html',
                    controller: function ( $scope, category, $uibModalInstance ) {
                    	$scope.entry = { category: category };
                    	console.log($scope.entry);
                        $scope.close = function ( entry ) {
                            if( entry ){
                                $uibModalInstance.close( entry );
                            } else {
                                $uibModalInstance.dismiss('cancel');
                            }
                        };
                    },
                    size: "md",
                    // backdrop: "static",
                    keyboard: false,
                    resolve: {
                        category: function () { return cat; }
                    }
                });
                modalInstance.result.then( function ( data ) {
                	Gallery.uploadPhoto( data ).then( function () {
                		$scope.uploadSuccess = 'Your photo has been uploaded and submitted for approval.';
                	}, function ( errors ) {
                		$scope.uploadError = errors[0];
                	});
                });
        	};

        }]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/gallery/gallery.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('Gallery', ['$http', 'Config', function ( $http, Config ) {

            var prefix = Config.apiPath + 'gallery';

            function all ( data ) {
                return $http.get( prefix, { params: data } );
            }

            function uploadPhoto ( data ) {
                return $http.post( prefix + '/photo', data );
            }


            return {
                all: all,
                uploadPhoto: uploadPhoto
            }
        }]);
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/home/home.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('HomeCtrl', ['$scope', '$uibModal', 'Category', '$state', function ( $scope, $uibModal, Category, $state ) {
        	console.log('HomeCtrl initiated. Rogue One underway!!');
        	console.log($scope.user);
            $scope.$state = $state;

            // Fetch featured categories
            Category.featured().then( function ( cats ) {
                $scope.featuredCats = cats;
            });
        	
        }]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/layout/header.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('HeaderCtrl', [ '$scope', '$state', '$timeout', '$location', 'AuthService', '$rootScope', 'Notification', 'AUTH_EVENTS', 'Config', 
            function($scope, $state, $timeout, $location, AuthService, $rootScope, Notification, AUTH_EVENTS, Config) {
                console.log('initiating');

                $scope.$on('$includeContentLoaded', function() {
                    $timeout( function () {
                        initGoogleTranslate();
                    }, 1000);
                });

                $scope.config = Config;
                $scope.user = AuthService.authentication.user;
                // Check image/avatar exist or not
                $scope.userAvatar = 'https://s3.amazonaws.com/ahs-images/images/avatar/avatar_'+$scope.user.user_id+'.png';
                imageExists($scope.userAvatar, function(exists) {
                  if(!exists){
                    $scope.userAvatar = null;
                    $scope.userAvatar = 'https://d3on0sn17ay79c.cloudfront.net/images/general/noavatar3_29x29.png';
                  }
                });

                $scope.newSearch = function (q){
                    if(q) {
                        $state.go('search', {q: q});
                    }
                };
                $scope.logout = function () {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                };

                $scope.login = function () {
                    $state.go('login',{redirectTo:$location.path()});
                };

                if($scope.loggedIn) {
                    Notification.getNotifications().then(function (data) {
                        $scope.notifications = Notification.parseNotifications(data);
                        $scope.notifCalc();
                    });
                }

                $scope.$on(AUTH_EVENTS.loginSuccess, function(event){
                    $scope.user = AuthService.authentication.user;
                });

                $scope.notifToggle = function (indx) {
                    $scope.notifications[indx]['seen'] = true;
                    $scope.notifCalc();
                    Notification.setNotifData($scope.notifications);
                };

                $scope.notifCalc = function(){
                    var i=0;
                    $.each($scope.notifications, function(indx,notif){
                        if(notif.seen===false){
                            i++;
                        }
                    });
                    if(i===0){
                        i = "";
                    }
                    $scope.notification = {unseen:i};
                }

                // function : to check image exists or not
                function imageExists(url, callback) {
                  var img = new Image();
                  img.onload = function() { callback(true); };
                  img.onerror = function() { callback(false); };
                  img.src = url;
                }

            } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/flashcard.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('Flashcard', ['$http', 'Config', '$q', function ( $http, Config, $q ) {
		    
			var prefix = Config.apiPath + 'flashcard/set';	    

		    var _flashcardSet = [];

		    function getFlashcardSet ( id, DTO ) {
		        return $http.get( prefix + '/' + id, { params: DTO } );
		    };

		    return {
		        flashcardSet: _flashcardSet,
		        getFlashcardSet: getFlashcardSet
		    }
        }]);
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/flashcardmodal.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('flashcardModal', ['$modal', '$log', function ( $modal, $log ) {

            return {
                restrict: 'A',
                scope:{
                    'flashcardSet':"=",
                    'flashcardRange':"="
                },
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        //var file = attrs.modalImage;
                        console.log("scope.set: "+scope.flashcardSet);
                        console.log("scope.range: "+scope.flashcardRange);
                        scope.open(scope.flashcardSet,scope.flashcardRange);
                    });
                },

                controller: function($scope, Flashcard){

                    $scope.open = function (flashcardSet, flashcardRange) {

                        var modalInstance = $modal.open({

                            templateUrl: 'tpl/flashcard-set.tpl.html',
                            controller: function ($scope, $modalInstance, Flashcard, Config) {

                                $scope.viewLoading = true;
                                var dataRequest = {
                                    "deep": {
                                        "include": ["flashcards"]
                                    },
                                    "range": flashcardRange
                                };
                                var DTO = {"deep" : JSON.stringify(dataRequest.deep), "range" : JSON.stringify(dataRequest.range)};
                                /*$scope.max = 1;
                                $scope.number = 10;*/
                                Flashcard.getFlashcardSet(flashcardSet, DTO).then(function (data) {

                                    $scope.flashcard_set = data;
                                    $scope.max = data.flashcards.length;
                                    /*console.log($scope.flashcard_set.max);*/
                                    if(data.category) {
                                        if(data.parent_category) {
                                            $scope.path = Config.site_images_path+data.parent_category.label+"/";
                                        }else{
                                            $scope.path = Config.site_images_path+data.category.label+"/";
                                        }
                                    }else{
                                        $scope.path = Config.site_images_path+"general/";
                                    }
                                    $scope.loadFlashcard(0);

                                    /*console.log(data);*/
                                    $scope.viewLoading = false;
                                }, function (error) {
                                    $scope.imageloading = false;
                                    if(error.status === 403){
                                        console.log("403");
                                    }else{
                                        console.log("Unknown error: ");
                                        console.log(error);
                                    }
                                });

                                $scope.loadFlashcard = function (index) {
                                    var card = $scope.flashcard_set.flashcards[index];
                                    $scope.number = index+1;
                                    /*console.log($scope.number);*/
                                    $scope.flashcard = card;
                                    //console.log(card);
                                    $scope.flashcard.index = index;
                                    $scope.image = card.front_image;
                                    $scope.imageloading = true;
                                    $scope.side = "FRONT";
                                };

                                $scope.imageLoaded = function () {
                                    $scope.error = false;
                                    $scope.imageloading = false;
                                };

                                $scope.imageFailed = function () {
                                    $scope.imageloading = false;
                                    $scope.error = $scope.path+$scope.image;
                                };

                                $scope.flipCard = function () {
                                    //console.log($scope.image);
                                    //console.log($scope.flashcard.front_image);
                                    if($scope.image === $scope.flashcard.front_image){
                                        $scope.image = $scope.flashcard.back_image;
                                        $scope.side = "BACK";
                                    }else{
                                        //console.log("success");
                                        $scope.image = $scope.flashcard.front_image;
                                        $scope.side = "FRONT";
                                    }
                                };

                                $scope.nextCard = function () {
                                    if($scope.flashcard.index === $scope.flashcard_set.flashcards.length-1){
                                        $scope.loadFlashcard(0);
                                    }else{
                                        $scope.loadFlashcard($scope.flashcard.index+1);
                                    }
                                };

                                $scope.previousCard = function () {
                                    if($scope.flashcard.index === 0){
                                        $scope.loadFlashcard($scope.flashcard_set.flashcards.length-1);
                                    }else {
                                        $scope.loadFlashcard($scope.flashcard.index - 1);
                                    }
                                };

                                $scope.close = function () {
                                    $modalInstance.close();
                                };
                            },
                            size: "lg",
                            resolve: {
                                loading: function () {
                                    return $scope.loading;
                                }
                            }
                        });
                        modalInstance.result.then(function() {
                        }, function() {
                            //Modal dismissed
                            //$log.info('Modal dismissed at: ' + new Date());
                        });
                    };
                }
            }
        }])
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/footnote.directive.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('footnote', ['$compile', 'Footnote', function( $compile, Footnote ) {

		    var linkFn = function(scope, elem, attr, controller) {
		        elem.bind('click', function() {

		            var src = elem.find('img').attr('src');

		            // call your SmoothZoom here
		            angular.element(attrs.options).css({'background-image':'url('+ scope.item.src +')'});
		        });
		        Footnote.footnotes.push(elem.text());
		        console.log(Footnote.footnotes);
		        scope.number = Footnote.footnotes.length-1;
		        scope.text = elem.text();
		        scope.articleId = 1;
		        //elem.replaceWith($compile(template)(scope));
		    };

		    var dir = {
		        restrict: 'E',
		        link: linkFn,
		        //require: '^enableFootnotes',
		        template: '<span class="footnote"><sup><a title="{{text}}" href="#fd-{{articleId}}-{{number}}">{{number}}</a></sup></span>',
		        replace: true,
		        scope: true
		    };

		    return dir;
		}]);

    angular.module('app')
        .directive('footnoteReturn', ['$compile', 'Footnote', '$document', function( $compile, Footnote, $document ) {

		    var linkFn = function(scope, elem, attr, controller) {
		        elem.bind('click', function() {

		            var duration = 1000;
		            var offset = 30;
		            var someElement = $('.section').find('.jumping');
		            console.log($('.section').find('.jumping'));
		            $document.scrollToElement(someElement, offset, duration);
		        });

		    };

		    var dir = {
		        restrict: 'A',
		        link: linkFn,
		        //require: '^enableFootnotes',
		        //template: '<span class="footnote"><sup><a title="{{text}}" href="#fd-{{articleId}}-{{number}}">{{number}}</a></sup></span>',
		        //replace: true,
		        scope: true
		    };

		    return dir;

        }])
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/lesson.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('LessonCtrl', ['$scope', '$rootScope', '$timeout', '$location', '$state', '$stateParams', 'Lesson', 'Config', '$modal', 'Resource', '$sce', function ( $scope, $rootScope, $timeout, $location, $state, $stateParams, Lesson, Config, $modal, Resource, $sce ) {
        	$scope.printBtn = false;
        	$scope.$state = $state;

        	// FLAGGING a lesson review
        	$scope.reportReview = function ( review ) {
        		console.log(review);
        		var r = confirm( 'Report this review as inappropriate?' );
				if ( r == true ) {
	        		Lesson.reportReview( review.rating_id ).then( function () {
	        			alert('Thank you. Comment will be reviewed and appropriate action taken if necessary.');
	        		});
	        	}
        	};

        	// DELETING a lesson review
        	$scope.deleteReview = function ( index ) {
        		var review = $scope.reviewToggle[ index ];
        		var r = confirm( 'Delete your review?' );
				if ( r == true ) {
	        		Lesson.deleteReview( review.rating_id ).then( function () {
						$scope.reviewToggle.splice( index, 1 );
	        		});
	        	}
        	};

        	// CHANGING a lesson rating
        	$scope.changeRating = function () {
				if ( $scope.lesson.my_rating ) {
					Lesson.rate( $scope.lesson.lesson_id, $scope.lesson.my_rating ).then( function ( result ) {
						$scope.lesson.total_rating = result.total_rating;
						$scope.lesson.ratings_count = result.ratings_count;
					});
				} else {
					Lesson.removeRating( $scope.lesson.lesson_id ).then( function ( result ) {
						$scope.lesson.total_rating = result.total_rating;
						$scope.lesson.ratings_count = result.ratings_count;
					});;
				}
			};

			// EDITING a lesson content section
			$scope.userEditSection = function ( index ) {
				var sec = $scope.lesson.sections.lesson[index];
		        var section = {
		        	lesson_section_id: sec.lesson_section_id,
		        	user_html: sec.user_html
		        };
		        console.log(section);
		        $scope.printBtn = true;
		        return Lesson.updateUserSection( section );
		    };


		    // MARKING a lesson as completed and changing the date
		    $scope.datePickerOpen = false;
		    $scope.openDatePicker = function ( $event ) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.datePickerOpen = true;
            };
		    $scope.updateLessonDate = function(dt){
				dt = moment( dt ).format( "YYYY-MM-DD HH:mm:ss" );
				Lesson.updateBookmark($scope.lesson.lesson_id, dt).then(function (data) {
						if(data){
							$scope.lesson.is_completed = 1;
							$scope.lesson_bookmark_date =  dt;
						}
					});

			};
			$scope.updateBookmark = function ( val ) {
		        if ( val ) {
		            $scope.lesson.is_completed = 1;
		    		Lesson.updateBookmark($scope.lesson.lesson_id).then(function (data) {
		    			if(data){
		    				$scope.lesson.is_completed = 1;
							$scope.lesson_bookmark_date =  new Date();;
		    			}
		    		});
		        } else {
		            $scope.lesson.is_completed = 0;
		            Lesson.removeBookmark($scope.lesson.lesson_id).then(function (data) {
		                if(data){
		                    $scope.lesson.is_completed = 0;
		                }
		            });
		        }
			};

		    // RESOURCE MODAL
		    $scope.resourcePopup = function ( $event, resource_id ) {
		        if ( resource_id ) {
		            Resource.getResource( resource_id ).then( function ( resource ) {
		                if ( resource.type != 'url' ||  resource.is_broken ) {
		                    // Open the modal
		                    var modalInstance = $modal.open({
		                        templateUrl: 'tpl/resource-modal.tpl.html',
		                        controller: 'ResourceModalCtrl',
		                        size: "lg",
		                        resolve: {
		                            resource: function () {
		                                return resource;
		                            }
		                        }
		                    });

		                    modalInstance.result.then(function() {
		                    }, function() {
		                        //Modal dismissed
		                        //$log.info('Modal dismissed at: ' + new Date());
		                    });
		                }
		            });

		        }
		    };


        	fetchLesson ( $stateParams.label, $stateParams.cat_label );


		    /**
        	 * Call the Lesson service to retrieve the lesson that matches the filters
        	 */
		    function fetchLesson ( label, cat_label ) {
		    	// Fetch subject categories
			    var request = {
			    	filters: JSON.stringify( { 'lesson.label': label, 'category.label': cat_label } ),
			    	condition: 'AND',
			    	deep: JSON.stringify( { 'include': ['sections', 'toc_sections', 'parent_category.parent', 'my_rating', 'total_rating', 'user_html', 'next_lesson_label', 'previous_lesson_label'] } )
			    };

			    Lesson.all( request ).then( function ( lessons ) {
			    	angular.forEach( lessons[0].sections.lesson, function ( section, key ) {
			    		if ( section.user_html ) {
			    			section.showChanged = true;
			    			$scope.printBtn = true;
			    			lessons[0].sections.lesson[key] = section;
			    		} else {
			    			section.user_html = section.filtered_html;
			    			section.showChanged = false;
			    		}
			    	});
			        $scope.lesson = lessons[0];
			        console.log($scope.lesson);
	              var markCompleteCondition = $state.current.name === 'lesson' && $scope.lesson.is_completed == '1'
	                                        && $scope.lesson.rating_message == null;
	              if( markCompleteCondition ){
	                $(reviewLessonModal).modal();
	              }
	              getLessonReviewToggle($scope.lesson.lesson_id);
	              if ( $scope.loggedIn ) {
				        $scope.annotatePlugins = [
							{
								name: 'Store',
								options: {
								    // The endpoint of the store on your server.
								    prefix: Config.apiPath + 'lesson/'+$scope.lesson.lesson_id,

								    // Attach the uri of the current page to all annotations to allow search.
								    annotationData: {
								      'uri': 'http://this/document/only'
								    },

								    urls: {
									    // These are the default URLs.
									    create:  '/annotation',
									    update:  '/annotation/:id',
									    destroy: '/annotation/:id',
										search:  '/annotations/'
									}

								    // This will perform a "search" action when the plugin loads. Will
								    // request the last 20 annotations for the current url.
								    // eg. /store/endpoint/search?limit=20&uri=http://this/document/only
								    /*loadFromSearch: {
								      'limit': 20,
								      'uri': 'http://this/document/only'
								    }*/
								}
							},
							'Tags',
							'Touch'
							//'AnnotatorViewer'
						];
				    }
			 	});
		    }

      // Review Lesson Form
      $scope.reviewLessonFormSubmit = function(message) {
      	Lesson.rate( $scope.lesson.lesson_id, $scope.lesson.my_rating, message).then(function(result) {
            $scope.lesson.total_rating = result.total_rating;
            $scope.lesson.ratings_count = result.ratings_count;
            getLessonReviewToggle($scope.lesson.lesson_id);
            $scope.reviewLessonAlert = "success";
            $scope.reviewLessonMsgTitle = "Success";
            $scope.reviewLessonMsg = "Lesson review updated successfully.";
          if($scope.lesson.is_completed === null) {
            Lesson.updateBookmark( $scope.lesson.lesson_id, new Date() ).then( function ( result ) {
            }, function(error) {
                console.log("updateBookmark Error :", error);
            });
          }
			}, function(error) {
              console.log("Error :", error);
              $scope.reviewLessonAlert = "danger";
              $scope.reviewLessonMsgTitle = "Error";
              $scope.reviewLessonMsg = "Lesson review not updated successfully.";
          });
      };

      // Issue Lesson Form
      $scope.issueLessonFormSubmit = function ( message ) {
      	Lesson.report( $scope.lesson.lesson_id, { message: message, link: $location.path() } ).then( function ( result ) {
			alert('Your feedback has been sent successfully!');      		
		}, function ( error ) {
          	console.log("Error :", error);
      	});
      };


      // Lesson Reviews Toggle
      function getLessonReviewToggle (lessonId) {
        Lesson.getLessonReviews( lessonId ).then( function ( result ) {
            $scope.reviewToggle = result;
        }, function(error) {
            console.log("Error :", error);
        });
      }

        }]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/lesson.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('Lesson', ['$http', 'Config', function ( $http, Config ) {

            var prefix = Config.apiPath + 'lesson';

            function one ( id ) {
                return $http.get( prefix + '/' + id );
            }

            function all ( data ) {
                return $http.get( prefix, { params: data } );
            }

            function report ( id, data ) {
                return $http.post( prefix + '/' + id + '/report', data );
            }

            function rate ( id, rate, message ) {
                if ( !message ) { var message = null; }
                return $http.post( prefix + '/' + id + '/rating', { rating: rate, message: message } );
            }

            function removeRating ( id ) {
                return $http.delete( prefix + '/' + id + '/rating' );
            }

            function updateUserSection ( section ) {
                return $http.put( prefix + '/section/' + section.lesson_section_id, section );
            }

            function updateBookmark ( lesson_id, dt ) {
                return $http.put( prefix + '/bookmark/'+lesson_id+'/'+dt, lesson );
            }

            function removeBookmark ( lesson_id ) {
                return $http.delete( prefix + '/bookmark/'+lesson_id, lesson );
            }

            function getLessonReviews ( id ) {
                return $http.get( prefix + '/' + id + '/' + 'reviews' );
            }

            function reportReview ( id ) {
                return $http.get( prefix + '/' + 'reviews/' + id + '/report' );
            }
            function deleteReview ( id ) {
                return $http.delete( prefix + '/' + 'reviews/' + id );
            }

            return {
                one: one,
        		all: all,
                report: report,
                rate: rate,
                removeRating: removeRating,
                updateUserSection: updateUserSection,
                updateBookmark: updateBookmark,
                removeBookmark: removeBookmark,
                getLessonReviews: getLessonReviews,
                reportReview: reportReview,
                deleteReview: deleteReview
            }
        }]);
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/lesson/resource-modal.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('ResourceModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'Config', 'resource', '$sce', '$window', function ( $scope, $rootScope, $modalInstance, Config, resource, $sce, $window ) {

        	$scope.resource = resource;

            $scope.close = function () {
                $modalInstance.close();
            };
            var getResourceUrl = function ( resource ) {
                var resourceUrl;
                if ( resource.parent_category_label ) {
                    resourceUrl = resource.parent_category_label+"/"+resource.category_label+"/"+resource.filename;
                } else if ( resource.category_label ) {
                    resourceUrl = resource.category_label+"/"+resource.filename;
                } else {
                    resourceUrl = "general/"+resource.filename;
                }
                //return Config.site_files_path + resourceUrl;
                return 'https://d3on0sn17ay79c.cloudfront.net/files/' + resourceUrl;
            };

            $scope.openOriginal = function () {
                $window.open( $scope.rawUrl );
            };

            var url = '';
            $scope.rawUrl = '';
            switch ( resource.type ) {
                case 'url':
                    $scope.title = 'Webpage';
                    url = Config.apiPath + 'proxy?url=' + resource.url;
                    $scope.rawUrl = resource.url;
                    /*var win = window.open( $scope.rawUrl, '_blank' );
                    if ( !resource.is_broken ) {
                        console.log("closing the modal");
                        $timeout( function () {
                            $scope.close();
                        }, 1000);
                    }*/
                    break;

                case 'youtube':
                    $scope.title = 'Video';
                    var split = resource.url.split( 'watch?v=' )[1];
                    var split2 = split.split( '&' );
                    var video_id = split2[0];
                    split2.shift();
                    var video_params = split2 || [];
                    url = 'https://www.youtube.com/embed/' + video_id + '?rel=0&showinfo=0&modestbranding=1&fs=1&' + video_params.join('&');
                    $scope.rawUrl = resource.url;
                    break;

                case 'image':
                    $scope.title = 'Image';
                    url = resource.url;
                    $scope.rawUrl = url;

                    if ( url.includes('http:') ) {
                        url = Config.apiPath + 'proxy?url=' + url + '&type=image';
                    }

                    break;

                case 'powerpoint':
                    $scope.title = 'Powerpoint Presentation';
                    $scope.rawUrl = url;

                    if ( resource.url ) {
                        url = resource.url;
                        $scope.rawUrl = url;
                    } else if ( resource.filename ) {
                        $scope.rawUrl = getResourceUrl( resource );
                        url = 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + $scope.rawUrl;
                    }
                    break;

                case 'word':
                    $scope.title = 'Word Document';
                    $scope.rawUrl = url;

                    if ( resource.url ) {
                        url = resource.url;
                        $scope.rawUrl = url;
                    } else if ( resource.filename ) {
                        $scope.rawUrl = getResourceUrl( resource );
                        url = 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + $scope.rawUrl;
                    }
                    break;


                case 'pdf':
                    $scope.title = 'Handout';
                    if ( resource.url ) {
                        url = resource.url;
                    } else if ( resource.filename ) {
                        url = getResourceUrl( resource );
                    }

                    $scope.rawUrl = url;

                    if ( url.includes('http:') || !resource.filename ) {
                        url = encodeURIComponent( Config.apiPath + 'proxy?url=' + url + '&type=pdf' );
                    }
                    // **GOOGLE DRIVE VIEWER**
                    //url = 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + url; // $scope.rawUrl
                    // **PDF.js HOSTED VIEWER**
                    url = 'https://viewer.thefamilyschoolonline.org/web/viewer.html?file=' + url;

                    break;

                case 'misc':7
                    $scope.title = "Miscellaneous";
            }

            $scope.embedURL = function () {
                return $sce.trustAsResourceUrl( url );
            };


		}]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/login/login.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller("LoginCtrl", ['$scope', '$state', '$rootScope', '$stateParams', 'AUTH_EVENTS', 'AuthService', 'Config', function ($scope, $state, $rootScope, $stateParams, AUTH_EVENTS, AuthService, Config) { // Removed: $modal
            if($scope.loggedIn){ $state.go('dashboard'); }
            var rememberData = AuthService.getRememberData();
            $scope.page.title = "Login";
        	$scope.page.breadcrumbText = Config.siteName;
            if(rememberData){
                $scope.credentials = {
                    username_email: rememberData.username_email,
                    password: rememberData.password,
                    remember_me: true
                };
            }else{
                $scope.credentials = {
                    username_email: '',
                    password: '',
                    remember_me: false
                };
            }
            $scope.bgImages = [
                'https://d3on0sn17ay79c.cloudfront.net/images/general/login-bg1.jpg',
                'https://d3on0sn17ay79c.cloudfront.net/images/general/login-bg2.jpg',
                'https://d3on0sn17ay79c.cloudfront.net/images/general/login-bg3.jpg',
                'https://d3on0sn17ay79c.cloudfront.net/images/general/login-bg4.jpg'
            ];


            $scope.login = function (credentials) {
                $scope.loginError = false;
                $scope.processing = true;
                AuthService.login(credentials).then(function (data) {

                    AuthService.setRememberData( credentials );
                    AuthService.updateAuthData().then( function () {
                        $scope.loginError = false;
                        if(data.rsync){
                            if(data.rsync.dirty){
                                var modalInstance = $modal.open({
                                    templateUrl: 'app/login/account-changes.modal.tpl.html',
                                    controller: function ($scope, $modalInstance) {
                                        $scope.close = function (d) {
                                            $modalInstance.dismiss();
                                        };
                                    },
                                    size: "lg",
                                    backdrop: "static",
                                    keyboard: false
                                });
                            }
                        }

                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    });

                }, function (errors) {
                    console.log(errors);
                    $scope.loginError = errors[0];
                    $scope.processing = false;
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            };

            $scope.sendActivationEmail = function (id, code) {
                var data = {};
                data.user_id = id;
                data.code = code;
                $scope.loginError = "Sending activation email...";
                AuthService.sendActivateEmail(data).then(function (result) {
                    $scope.loginError = false;
                    $scope.success = "Activation email sent successfully.  Check your inbox!";
                }, function (error) {
                    $scope.loginError = error[0];
                    $scope.success = '';
                });
            };

            $scope.forgotPassword = function () {
                $scope.success = false;
                $scope.error = false;
                $scope.processing = true;
                AuthService.resetPassword($scope.email).then(function (result) {
                    $scope.processing = false;
                    $scope.success = "Your new password has been sent to your email address!";
                }, function (error) {
                    $scope.processing = false;
                    $scope.error = error[0];
                    $scope.success = '';
                });
            };

            $scope.activateAccount = function ( id, code ) {
                var data = {};
                data.user_id = id;
                data.code = code;

                AuthService.activateUser(data).then(function (result) {
                    console.log(result);
                    if(result.activated === false){
                        $scope.activated = "Your account has already been activated!";
                    }else if(result.activated === true){
                        $scope.activated = "Your account has been successfully activated.";
                    }
                }, function (error) {
                    $scope.error = error[0];
                });
            };

            // If account needs to be activated, activate it here
            if ( $stateParams.id && $stateParams.code ) {
                $scope.activateAccount( $stateParams.id, $stateParams.code );
            }
        }]);
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/memberMap/memberMap.controller.js":[function(require,module,exports){
(function() {
    "use strict";
    angular.module('app').controller('memberMapCtrl', ['$scope', 'NgMap', '$http', 'memberMap', function($scope, NgMap, $http, memberMap) {
        $scope.level = 1; // Defines how deep in the category->sub-category chain we are currently at
        $scope.selectedMarker = [];
        // Dynamic data
        memberMap.getUsersByRole().then(function(memberMapUsers) {
            $scope.markers = memberMapUsers;

            // Member Map
            NgMap.getMap().then(function(map) {
                $scope.map = map;
                $scope.map.setOptions({
                    zoom: 3,
                    minZoom: 2,
                    maxZoom: 14,
                    center: new google.maps.LatLng(41.20510893568181, -30.41015625),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                $scope.dynMarkers = [];
                var markerColor = '';
                $scope.markers.forEach(function(marker) {
                    switch (marker.role_id) {
                        case "1":
                            markerColor = '72FFED'; // Administrator
                            break;
                        case "2":
                            markerColor = 'E550E5'; // Editor
                            break;
                        case "3":
                            markerColor = 'FF9334'; // Author
                            break;
                        case "4":
                            markerColor = '008CFF'; // Subscriber
                            break;
                        case "5":
                            markerColor = '6BD16B'; // Full Access Subscriber
                            break;
                        case "17":
                            markerColor = 'BA4A4A'; // Limited Editor
                            break;
                        case "18":
                            markerColor = '5F40B8'; // Limited Complimentary
                            break;
                        case "19":
                            markerColor = 'FB6153'; // Limited Staff
                            break;
                        case "20":
                            markerColor = 'FD685B'; // Limited High School
                            break;
                        default:
                            markerColor = '008CFF'; // Default
                            break;
                    }
                    var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&chco=FFFFFF,' + markerColor + ',000000&ext=.png';
                    var markerImage = new google.maps.MarkerImage(imageUrl, new google.maps.Size(24, 32));
                    var latLng = new google.maps.LatLng(parseFloat(marker.latitude), parseFloat(marker.longitude));
                    var dynMarker = new google.maps.Marker({
                        position: latLng,
                        icon: markerImage
                    });
                    $scope.dynMarkers.push(dynMarker);
                    google.maps.event.addListener(dynMarker, 'click', function() {
                        $scope.selectedMarker = [marker.user_id, marker.first_name, marker.last_name, marker.email, marker.phone_number,
                            marker.address1, marker.address2, marker.country, marker.state, marker.city, marker.zip_code
                        ];
                        // console.log($scope.selectedMarker);
                        $scope.selectedMarker.settings = (marker.settings) ? JSON.parse(marker.settings) : '';
                        // console.log($scope.selectedMarker.settings);
                        $scope.map.showInfoWindow('myInfoWindow', this);
                        $scope.infoWin = {};
                        $scope.infoWin.message = null;
                    });
                    // google.maps.event.addListener(map, 'click', function(event) {
                    //     console.log('Lat: ' + event.latLng.lat() + ' Lng: ' + event.latLng.lng());
                    // });
                });
                var mcOptions = {
                    imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m',
                    maxZoom: 13
                };
                $scope.markerClusterer = new MarkerClusterer(map, $scope.dynMarkers, mcOptions)
            });
        });
        
        // Send email to recipient
        $scope.infoWinFormSubmit = function(infoWin) {
            var infoData = '{"infoData" : ' + JSON.stringify(infoWin) + '}';
            // console.log(infoData);
            memberMap.sendInfowindowEmail(infoData).then(function(response) {
                console.log(response);
                $scope.selectedMarker.emailSent=true;
            }, function(error) {
                console.log("Error :", error);
            });
        };
        // Reset infoWinForm
        $scope.infoWinFormReset = function(infoWin) {
            $scope.infoWin.message = null;
        };
    }]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/memberMap/memberMap.service.js":[function(require,module,exports){
(function() {
    "use strict";
    angular.module('app').factory('memberMap', ['$http', 'Config', '$q', function($http, Config, $q) {
        var memberMap = {};
        var prefix = Config.apiPath + 'user';
        var _getUsersByRole = function() {
            return $http.get(prefix + '/byroles');
        }
        var _sendInfowindowEmail = function(infoData) {
            return $http.post(prefix + '/infowindow/email', infoData);
        }
        memberMap.getUsersByRole = _getUsersByRole;
        memberMap.sendInfowindowEmail = _sendInfowindowEmail;
        return memberMap;
    }]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/page/cms.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('CMS', ['$http', 'Config', function ( $http, Config ) {

            var prefix = Config.apiPath + 'cms';

            function getMenu ( data ) {
                return $http.get( prefix + '/menu', { params: data } );
            }
            
            function getPage ( slug, data ) {
                return $http.get( prefix + '/page/' + slug, { params: data } );
            }

            return {
                getMenu: getMenu,
                getPage: getPage
            }
        }]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/page/page.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('PageCtrl', ['$scope', '$stateParams', 'CMS', '$state', 'Config', function ( $scope, $stateParams, CMS, $state, Config ) {
        	$scope.viewLoading = true;
		    $scope.page = {};
		    var slug = $stateParams.slug;
		    if( $stateParams.sub_slug ) {
		        slug = $stateParams.sub_slug;
		    }

		    CMS.getPage( slug ).then( function ( page ) {
		        $scope.page = page;
		        $state.current.data.pageTitle = page.title;
				$state.current.data.pageHead = page.title;
				$state.current.data.breadcrumbText = Config.siteName;
		        $scope.viewLoading = false;
		    });

        }]);

})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/pricing/pricing.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('PricingCtrl', [
        		'$scope', 
        		'$rootScope', 
        		'$uibModal', 
        		'AuthService', 
        		'User',
        		'ipCookie',
        		'$stateParams',
        	function ( 
        		$scope, 
        		$rootScope, 
        		$uibModal, 
        		AuthService,
        		User,
        		ipCookie,
        		$stateParams
        	) {
	        	$scope.step = 1;
	        	$scope.user = {};
	        	$scope.priceModel = 'annual';

	        	var plans = [
			        {
			            'name': 'FREE Member',
			            'tagline': '',
			            'price': 0.00,
			            'annual': 0.00,
				    'annual_id': 21,
			            'duration': 'month',
			            'package_id': 21
			        },
			        {
			            'name': 'K-8 Family',
			            'tagline': '',
			            'price': 37.00,
			            'annual': 33.00,
			            'annual_id': 10,
			            'duration': 'month',
			            'package_id': 8
			        },
			        {
			            'name': 'K-12 Family',
			            'tagline': '',
			            'price': 43.00,
			            'annual': 39.00,
			            'annual_id': 11,
			            'duration': 'month',
			            'package_id': 1
			        },
			        {
			            'name': 'K-12 for Co-ops',
			            'tagline': '',
			            'price': 199.00,
			            'annual': 179.00,
			            'annual_id': 12,
			            'duration': 'month',
			            'package_id': 5
			        }
			    ];
			    $scope.plans = plans;

			    // Attach referral code
			    if ( ipCookie( 'referralCode' ) ) {
			        checkReferralCode( ipCookie( 'referralCode' ) );
			    }

			    // Check if part of a subscription group
			    if ( $stateParams.group && $stateParams.code ) {
			        // Fetch and apply group subscription
			        User.getSubGroupAccountWithCode( $stateParams.group, $stateParams.code ).then( function ( result ) {
			            $scope.subGroup = result;
			            $scope.user.email = result.email;
			            angular.forEach( $scope.plans, function ( plan, key ) {
			            	if ( $scope.subGroup.subscription.package_id == plan.package_id ) {
			            		$scope.subGroup.subscription.package = $scope.plans[ key ];
			            		$scope.setPlan( key );
			            		jQuery('#modal-overlay-signup').modal('show');
			            	}
			            });
			        }, function () {
			            $scope.subGroupError = true;
			        });
			    }

			    $scope.setPlan = function ( index ) {
			    	$scope.plan = $scope.plans[index];
			    	if ( $scope.priceModel == 'monthly' ) {
				    	$scope.user.package_id = $scope.plan.package_id;
				    } else {
				    	$scope.user.package_id = $scope.plan.annual_id;
				    }
			    	$scope.step = 1;
			    	console.log($scope.user);
			    	
			    	// Send Facebook pixel event tracking
					fbq('track', 'InitiateCheckout');
			    };

			    $scope.validateRegister1 = function () {
			    	if ( $scope.user.password !== $scope.user.confirm_password ) {
			    		$scope.error = "Passwords don't match";
			    	} else {
			    		$scope.error = '';
			    		$scope.step = 2;
			    	}
			    }

			    $scope.register = function () {
			    	if ( $scope.subGroup ) {
				    	$scope.user.subscription_group = {
			                subscription_group_id: $scope.subGroup.subscription_group_id,
			                code: $stateParams.code
			            }
			        }

			        $scope.error = false;
			        $scope.processing = true;
			        console.log($scope.user);
			        AuthService.register( $scope.user ).then(function (response) {
			            $scope.error = false;
			            $scope.processing = false;
			            $scope.step = 3;
			            /*localStorageService.remove('planData');
			            localStorageService.remove('registrationData');*/

			            // Send Facebook pixel event tracking
						fbq('track', 'CompleteRegistration', {
							value: $scope.plan.price,
							currency: 'USD'
						});
			        }, function (error) {
			            $scope.error = error[0];
			            $scope.processing = false;
			        });
			    };

			    function checkReferralCode ( code ) {
			        User.checkReferralCode( code )
			            .then( function ( result ) {
			                $scope.user.referral_code = ipCookie( 'referralCode' );
			                $scope.referral = result;
			            }, function (error) {
			                ipCookie.remove( 'referralCode' );
			            });
			    }
        	
        	}]);

})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/profile/profile.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('ProfileCtrl', ['$scope', '$rootScope', '$uibModal', 'User', 'AuthService', 'RecurlyService', '$timeout', 'FileReader', 'scheduleGenerator', 'Push', function ( $scope, $rootScope, $uibModal, User, AuthService, RecurlyService, $timeout, FileReader, scheduleGenerator, Push ) {

			if(!$scope.loggedIn){ $state.go('dashboard'); }
		    $scope.viewLoading = false;
		    $scope.showBillingForm = false;
		    $scope.page.title = "My Profile";
			  $scope.page.breadcrumbText = "view/edit your account details";
  			$scope.rotationOptions = {
  				course: 'Course by Course',
            		unit: 'Unit by Unit',
            		lesson: 'Lesson by Lesson'
  			};
        $scope.data = {};
        $scope.months = [
            { name:'01 - January', val:1 },
            { name:'02 - February', val:2 },
            { name:'03 - March', val:3 },
            { name:'04 - April', val:4 },
            { name:'05 - May', val:5 },
            { name:'06 - June', val:6 },
            { name:'07 - July', val:7 },
            { name:'08 - August', val:8 },
            { name:'09 - September', val:9 },
            { name:'10 - October', val:10 },
            { name:'11 - November', val:11 },
            { name:'12 - December', val:12 }
        ];
        $scope.years = [ new Date().getFullYear() ];
        for(var i = $scope.years[0]+1; i<$scope.years[0]+25;i++){
            $scope.years.push(i);
        }
        // Get countries
        User.getCountry().then(function (countries) {
            $scope.countries = countries;
        });

        // Live Update of Days Left
        $scope.$watch('user.settings.calendar', function () {
        	$scope.availableDays = scheduleGenerator.calcAvailableDays( $scope.user.settings );
            $scope.daysLeft = ( $scope.availableDays ) ? $scope.availableDays.length : 0;
            $scope.daysLeftTotal = ( $scope.availableDays ) ? $scope.availableDays.length : 0;
        }, true);

        if(angular.isDefined($scope.user.recurly.billing_info)){
              $scope.data.first_name = $scope.user.recurly.billing_info.first_name;
              $scope.data.last_name = $scope.user.recurly.billing_info.last_name;
              $scope.data.number = '**** **** **** '+$scope.user.recurly.billing_info.last_four;
              $scope.data.month = $scope.user.recurly.billing_info.month;
              $scope.data.year = $scope.user.recurly.billing_info.year;
              $scope.data.cvv = '';
              $scope.data.address1 = $scope.user.recurly.billing_info.address1;
              $scope.data.address2 = $scope.user.recurly.billing_info.address2;
              $scope.data.city = $scope.user.recurly.billing_info.city;
              $scope.data.state = $scope.user.recurly.billing_info.state;
              $scope.data.postal_code = $scope.user.recurly.billing_info.zip;
              $scope.data.country = $scope.user.recurly.billing_info.country;
        }else{
              $scope.data.first_name = '';
              $scope.data.last_name = '';
              $scope.data.number = '';
              $scope.data.month = $scope.months[new Date().getMonth()].val;
              $scope.data.year = $scope.years[0];
              $scope.data.cvv = '';
              $scope.data.address1 = '';
              $scope.data.address2 = '';
              $scope.data.city = '';
              $scope.data.state = '';
              $scope.data.postal_code = '';
              $scope.data.country = 'US';
        }
        $scope.recurlyFormSubmit = function () {
            $scope.submitting = true;
            recurly.token($scope.data, function(err, token){
                if (err) {
                    $timeout(function(){
                        if(err.code == "validation"){
                            err.fields = err.fields.map( function ( field ) {
                                if(field == "number"){ return "card number"; }
                                if(field == "month"){ return "expiration month"; }
                                if(field == "year"){ return "expiration year"; }
                                if(field == "cvv"){ return "code (cvv)"; }
                            });
                            $scope.recurlyFormMsg = "Incorrect values entered for the field(s): "+err.fields.join(', ');
                        }else{
                            $scope.recurlyFormMsg = err.message;
                        }
                        $scope.recurlyFormMsgTitle = "Error";
                        $scope.recurlyFormAlert = "danger";
                        $scope.submitting = false;
                    });
                } else {
                    $timeout(function(){
                        $scope.saveBillingInfo(token.id);
                    })
                }
            });
        };

		    $scope.updateUser = function () {
            $scope.success = false;
		        $scope.error = false;
		        $scope.processing = true;
		        var user = {};
		        user.user_id = $scope.user.user_id;
		        user.first_name = $scope.user.first_name;
		        user.last_name = $scope.user.last_name;
		        user.username = $scope.user.username;
		        user.email = $scope.user.email;
		        user.phone_number = $scope.user.phone_number;
		        user.description = $scope.user.description;
		        user.address1 = $scope.user.address1;
		        user.address2 = $scope.user.address2;
		        user.city = $scope.user.city;
		        user.state = $scope.user.state;
		        user.zip_code = $scope.user.zip_code;
		        user.country = $scope.user.country;
            if (typeof $scope.user.avatar !== "undefined") {
              console.log("IF");
              user.avatar = $scope.user.avatar;
            }else{
              console.log("ELSE");
            }

		        /* Validate Password */
		        if ( $scope.user.new_password && $scope.user.current_password && $scope.user.renew_password ) {
			        if($scope.user.new_password === $scope.user.renew_password){
			        	user.current_password = $scope.user.current_password;
			            user.new_password = $scope.user.new_password;
			        }else{
			            $scope.processing = false;
			            $scope.error = "New passwords must match.";
			            return;
			        }
			    }

		        User.updateProfile(user).then(function () {
		            AuthService.updateAuthData();
		            $scope.success = "Your changes have been saved!";
		            $scope.processing = false;
		            $scope.refreshAvatar();
		        }, function (error) {
		            $scope.error = error[0];
		            $scope.processing = false;
		        });
		    };

		    // Update Settings
            $scope.updateSettings = function ( settings ) {
            	if ( settings.calendar ) { 
            		if ( settings.calendar.first_day ) {
            			settings.calendar.first_day = moment( settings.calendar.first_day ).format( "YYYY-MM-DD" );
            		}
            		if ( settings.calendar.last_day ) {
            			settings.calendar.last_day = moment( settings.calendar.last_day ).format( "YYYY-MM-DD" );
            		}
            	} else {
            		settings.calendar = {};
            	}
            	$scope.processing = true;
            	console.log(settings);
                var dto = '{ "settings": { "memberMap": ' + JSON.stringify( settings.memberMap ) + ', "calendar": ' + JSON.stringify( settings.calendar ) + ', "notifications": ' + JSON.stringify( settings.notifications ) + ' } }';
                User.updateUser( $scope.user.user_id, dto ).then(function(){
					Push.create('Settings have been saved.');
                  $scope.success = "Setting updated successfully.";
                  $scope.error = '';
                  $scope.processing = false;
                }, function (error) {
                    $scope.error = 'Setting not updated successfully.';
                    $scope.success = '';
                    $scope.processing = false;
                });
            };

		    $scope.updateUserPassword = function () {
		        $scope.success2 = false;
		        $scope.error2 = false;
		        $scope.processing = true;
		        var user = {};
		        user.user_id = $scope.user.user_id;
		        user.current_password = $scope.user.current_password;
		        user.new_password = $scope.user.new_password;
		        if($scope.user.new_password === $scope.user.renew_password){
		            User.updateProfile(user).then(function () {
		                $scope.success2 = "Your new password have been saved!";
		                $scope.processing = false;
		            }, function (error) {
		                $scope.error2 = error[0];
		                $scope.processing = false;
		            });
		        }else{
		            $scope.processing = false;
		            $scope.error = "New passwords must match.";
		        }
		    };

		    $scope.hasRole = function (id) {
		        var trigger = false;
		        $.each($scope.user.roles, function(key,value) {
		            console.log(value);
		            if(value.label === id){
		                console.log(value.label);
		                trigger = true;
		            }
		        });
		        return trigger;
		    };

        $scope.saveBillingInfo = function ( token ) {
		        var u = {
		            user_id: $scope.user.user_id,
		            first_name: $scope.user.first_name,
		            last_name: $scope.user.last_name,
		            billing: { token: token }
		        };
		        User.updateProfile(u).then(function () {
		            AuthService.updateAuthData();
                $scope.recurlyFormMsgTitle = "Success";
                $scope.recurlyFormAlert = "success";
                $scope.recurlyFormMsg = "Your changes have been saved!";
                $scope.submitting = false;
		            $scope.getUser();
		        }, function (error) {
                $scope.recurlyFormMsgTitle = "Error";
                $scope.recurlyFormAlert = "danger";
                $scope.recurlyFormMsg = error[0];
                $scope.submitting = false;
		        });
		    };
		    $scope.showForm = function () {
		        $scope.success = false; $scope.error = false;
		        $scope.showBillingForm = true;
		    };
		    $scope.hideForm = function () {
		        $scope.success = false; $scope.error = false;
		        $scope.showBillingForm = false;
		    };

			$scope.billingPopup = function () {
				var modalInstance = $modal.open({
		                templateUrl: 'tpl/billing-info.modal.tpl.html',
		                controller: function ($scope, $modalInstance) {
		                    $scope.viewLoading = true;
		                    $scope.close = function (d) {
		                        if(d) {
		                            $modalInstance.close(d);
		                        }else{
		                            $modalInstance.dismiss();
		                        }
		                    };
		                },
		                size: "lg",
		                backdrop: "static",
		                keyboard: false
		            });
			};
		    $scope.changePlan = function () {
		        if($scope.user.recurly.billing_info){
		            if($scope.user.recurly.billing_info.last_four){
		                   $state.go('plans');
		            }else{
		                $scope.billingPopup();
		            }
		        }else{
		            $scope.billingPopup();
		        }
		    };
		    $scope.sendInvite = function ( index ) {
		        var account = $scope.user.subscription.group.accounts[ index ];
		        if ( account.email ) {
		            account.loading = true;
		            User.addAccountToGroupSub( $scope.user.subscription.subscription_id, { email: account.email } )
		            .then( function ( result ) {
		                $scope.user.subscription.group.accounts[ index ] = result;
		                console.log($scope.user.subscription.group.accounts[ index ]);
		            }, function ( error ) {
		                console.log( ' Oh dear...' );
		            });
		        }
		    };
		    $scope.cardPopup = function () {
		        var modalInstance = $modal.open({
		                templateUrl: 'app/profile/share-card.modal.tpl.html',
		                controller: function ($scope, $modalInstance) {
		                    $scope.viewLoading = true;
		                    $scope.close = function (d) {
		                        if(d) {
		                            $modalInstance.close(d);
		                        }else{
		                            $modalInstance.dismiss();
		                        }
		                    };
		                },
		                size: "lg",
		                backdrop: true,
		                keyboard: false
		            });
		    };

		    $scope.removeGroupAccount = function ( index ) {
		        var account = $scope.user.subscription.group.accounts[ index ];
		        if ( account.insert_date ) {
		            var r = confirm( "Are you sure you want to remove this account from your subscription group?" );
		            if (r == true) {
		                account.loading=true;
		                User.removeAccountFromGroupSub( $scope.user.subscription.subscription_id, account.subscription_group_id )
		                .then( function () {
		                    $scope.user.subscription.group.accounts.splice( index, 1 );
		                }, function ( error ) {
		                    account.loading=false;
		                    console.log( ' Oh dear...' );
		                });
		            } else {
		                return false;
		            }
		        } else {
		            $scope.user.subscription.group.accounts.splice( index, 1 );
		        }
		    }

		    $scope.addSubAccount = function () {
		        if (!$scope.user.subscription.group.accounts){
		            $scope.user.subscription.group.accounts = [];
		        }
		        $scope.user.subscription.group.accounts.push({})
		    };
		    $scope.range = function(n) {
		        return new Array(n);
		    };
		    $scope.disableEditCode = false;
		    $scope.customizeCode = false;
		    $scope.editCode = function ( code ) {
		        $scope.disableEditCode = true;
		        $scope.refCodeError = false;
		        var user = {
		            user_id: $scope.user.user_id,
		            referral_code: code
		        };
		        User.updateProfile( user )
		            .then( function () {
		                $scope.user.referral_code = code;
		                $scope.disableEditCode = false;
		                $scope.refCodeError = false;
		                $scope.customizeCode = false;
		            }, function ( error ) {
		                $scope.refCodeError = error[0];
		                $scope.disableEditCode = false;
		            });
		    };
		    $scope.showEditCode = function ( val ) {
		        $scope.customizeCode = val;
		    };

		    /*
             *	Date Picker functions
             */
            $scope.startDate = '';
            $scope.endDate = '';
            $scope.firstDayofSchool = moment( new Date() ).format();
            $scope.lastDayofSchool = moment( new Date() ).add( 1, 'years' ).format();
            $scope.picker1 = { open: false };$scope.picker2 = { open: false };
            $scope.pickerA = { open: false };$scope.pickerB = { open: false };
            $scope.open1 = function() { $scope.popup1.opened = true; };
            $scope.open2 = function() { $scope.popup2.opened = true; };
            $scope.openPickerA = function ( $event ) {
                $event.preventDefault();$event.stopPropagation();$scope.pickerA.open = true;$scope.pickerB.open = false;
            };
            $scope.openPickerB = function ( $event ) { 
            	$event.preventDefault();$event.stopPropagation();$scope.pickerB.open = true;$scope.pickerA.open = false;
            };
            $scope.openPicker1 = function ( $event ) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.picker1.open = true;
                $scope.picker2.open = false;
            };
            $scope.openPicker2 = function ( $event ) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.picker2.open = true;
                $scope.picker1.open = false;
            };

            $scope.addBreakRange = function ( start, end ) {
            	if ( !$scope.user.settings.calendar.break_ranges ) { $scope.user.settings.calendar.break_ranges = []; }
            	$scope.user.settings.calendar.break_ranges.push( [
            		moment( start ).format( "YYYY-MM-DD" ),
            		moment( end ).format( "YYYY-MM-DD" )
            	] );
            	$scope.startDate = '';
            	$scope.endDate = '';
            	console.log($scope.user.settings.calendar.break_ranges);
            };
            $scope.removeBreakRange = function ( index ) {
            	$scope.user.settings.calendar.break_ranges.splice( index, 1 );
            };

        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/profile/recurly.service.js":[function(require,module,exports){

(function () {
    "use strict";

    angular.module("app").factory("RecurlyService", function ($http, $q, Config) {

    var __configured = false;
    var _data = {};
    var _pricing = {};
    var _configure = function () {
        if (typeof recurly === 'undefined') {
            throw new Error("Recurly API Library Missing.");
        }
        if (!__configured) {
            recurly.configure(Config.recurly_api_key);
            __configured = true;
        }
    };
    var _newPricing = function () {
        _data.pricing = recurly.Pricing();
        _data.pricing.currency('USD');
    };
    var _setPricing = function ( type, val, val2 ) {
        var defer = $q.defer();
        _data.pricing[type](val, val2)
            .catch(function (error) {
                defer.reject(error);
            })
            .done(function (price) {
                _pricing.price = price;
                defer.resolve(price);
            });
        return defer.promise
    };

    return {
        configure: _configure,
        setPricing: _setPricing,
        newPricing: _newPricing,
        pricing: _pricing
    };

});

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/routes/routes.js":[function(require,module,exports){
(function(){
    'use strict';

    angular.module('app')
        .run([ '$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ])
        .config(
        [ '$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider',
            function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

                var htmlClass = {
                    website: 'transition-navbar-scroll top-navbar-xlarge bottom-footer',
                    websitePricing: 'top-navbar-xlarge bottom-footer app-desktop',
                    websiteSurvey: 'top-navbar-xlarge bottom-footer app-desktop app-mobile',
                    websiteLogin: 'hide-sidebar ls-bottom-footer',
                    websiteTakeQuiz: 'transition-navbar-scroll top-navbar-xlarge bottom-footer app-desktop app-mobile',
                    appl3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l3',
                    appl1r3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l1 sidebar-r3'
                };

                // Make trailing slashes optional for all routes
                $urlMatcherFactoryProvider.strictMode( false );

                $urlRouterProvider
                    .otherwise('/');


                /*********************************
                 * System
                 *********************************/
                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'tpl/home.html',
                        controller: 'HomeCtrl',
                        htmlClass: htmlClass.website
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'tpl/login.html',
                        controller: 'LoginCtrl',
                        params: {
                            id: null,
                            code: null
                        },
                        htmlClass: htmlClass.websiteLogin,
                        bodyClass: 'login'
                    })
                    .state("activate", {
                        url: "/activate/:id/:code",
                        controller: ['$scope', '$state', '$stateParams', function ( $scope, $state, $stateParams ) {
                            $state.go('login', {
                                id: $stateParams.id,
                                code: $stateParams.code
                            });
                        }]
                    })
                    .state('pricing', {
                        url: '/pricing?group&code',
                        templateUrl: 'tpl/pricing.html',
                        controller: 'PricingCtrl',
                        htmlClass: htmlClass.website
                    })
                    .state("invite", {
                        url: "/invite/:code",
                        controller: ['$scope', 'ipCookie', '$stateParams', '$state', function ( $scope, ipCookie, $stateParams, $state ) {
                            // Setting a cookie
                            ipCookie( 'referralCode', $stateParams.code, { expires: 90 } );
                            $state.go('pricing');
                        }]
                    })
                    .state('support', {
                        url: '/support',
                        templateUrl: 'tpl/support.html',
                        controller: 'SupportCtrl',
                        htmlClass: htmlClass.website
                    })
                    .state('training', {
                        url: '/training',
                        templateUrl: 'tpl/training.html',
                        controller: 'TrainingCtrl',
                        htmlClass: htmlClass.website
                    })
                    .state('search', {
                        url: '/search?q',
                        templateUrl: 'tpl/search.html',
                        controller: 'SearchCtrl',
                        params: { filters: null },
                        htmlClass: htmlClass.website
                    })

                    ;


                /*********************************
                * Dashboard
                *********************************/
                $stateProvider
                    .state('dashboard', {
                        url: '/dashboard',
                        templateUrl: 'tpl/dashboard.html',
                        controller: 'DashboardCtrl',
                        data: { pageTitle: 'Dashboard', pageSubTitle: 'Control my account' },
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.profile', {
                        url: '/profile',
                        templateUrl: 'tpl/profile.tpl.html',
                        controller: 'ProfileCtrl',
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.profile.billing', {
                        url: '/billing',
                        templateUrl: 'tpl/profile.billing.tpl.html',
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.profile.memberMap', {
                        url: '/memberMap',
                        templateUrl: 'tpl/profile.memberMap.tpl.html',
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.profile.schoolYear', {
                        url: '/schoolYear',
                        templateUrl: 'tpl/profile.schoolYear.tpl.html',
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.profile.notifications', {
                        url: '/notifications',
                        templateUrl: 'tpl/profile.notifications.tpl.html',
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.courses', {
                        url: '/courses',
                        templateUrl: 'tpl/courses.tpl.html',
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.subscription', {
                        url: '/subscription',
                        templateUrl: 'tpl/subscription.tpl.html',
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.subscription.plans', {
                        url: '/plans',
                        templateUrl: 'tpl/subscription.plans.tpl.html',
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.calendar', {
                        url: '/calendar',
                        templateUrl: 'tpl/calendar.html',
                        controller: 'CalendarCtrl',
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.calendar.generator', {
                        url: '/generator',
                        views: {
                            '@dashboard': {
                                templateUrl: 'tpl/calendar.generator.html',
                                controller: 'CalendarGeneratorCtrl',
                            }
                        },
                        htmlClass: htmlClass.website
                    })
                    .state('dashboard.invite', {
                        url: '/invite-friends',
                        templateUrl: 'tpl/invite-friends.tpl.html',
                        htmlClass: htmlClass.website
                    })

                    ;


                /*********************************
                 * Curriculum
                 *********************************/
                $stateProvider
                    .state('categories', {
                        url: '/courses',
                        templateUrl: 'tpl/categories.html',
                        controller: 'CategoriesCtrl',
                        /*ncyBreadcrumb: { label: 'Courses' },*/
                        data: { pageTitle: 'Subjects', pageSubTitle: 'Browse all subjects by category.' },
                        htmlClass: htmlClass.website
                    })
                    .state('categories.group', {
                        url: '/:label',
                        controller: ['$scope', '$stateParams', function( $scope, $stateParams ) {
                            $scope.loadCategory( $stateParams.label );
                        }],
                        templateUrl: 'tpl/categories.grid.tpl.html',
                        /*ncyBreadcrumb: { label: '1{{ crumb1 }}' },*/
                        htmlClass: htmlClass.website
                    })
                    .state('categories.subject', {
                        url: '/:label/:sub_label',
                        controller: ['$scope', '$stateParams', function( $scope, $stateParams ) {
                            $scope.loadCategory( $stateParams.label, $stateParams.sub_label );
                        }],
                        /*ncyBreadcrumb: { label: '2{{ crumb2 }}', parent: function($scope) {
                                if ( $scope.category ) {
                                    return "categories.group({ label: '"+$scope.category.parent_category.parent.label+"' })";
                                } else {
                                    return "categories.group";
                                }
                            }
                            },*/
                        data: { pageTitle: 'Courses', pageSubTitle: 'Browse all courses by subject.' },
                        templateUrl: 'tpl/categories.list.tpl.html',
                        htmlClass: htmlClass.website
                    })



                    .state('category', {
                        url: '/course/:label',
                        templateUrl: 'tpl/category.html',
                        controller: 'CategoryCtrl',
                        /*ncyBreadcrumb: { 
                            label: '3{{ category.name || lesson.category.name }}',
                            parent: function($scope) {
                                if ( $scope.category ) {
                                    if ( $scope.category.parent_category.parent ) {
                                        return "categories.subject({ label: '"+$scope.category.parent_category.parent.label+"', sub_label: '"+$scope.category.parent_category.label+"' })";
                                    }
                                }
                            }
                        },
                        resolve: {
                          category: function ( Category, $stateParams ) {
                            var request = {
                                'deep': JSON.stringify( { 'include': [ 'lessons', 'units', 'parent_category.parent' ] } )
                            };
                            return Category.one( $stateParams.label, request );
                          }
                        },*/
                        data: { pageTitle: 'Course', pageSubTitle: 'See info about this course.' },
                        htmlClass: htmlClass.website
                    })



                    .state('lesson', {
                        url: '/course/:cat_label/lesson/:label',
                        views: {
                            '@': {
                                templateUrl: 'tpl/lesson.html',
                                controller: 'LessonCtrl'
                            }
                        },
                        /*ncyBreadcrumb: { label: 'Lesson 19', parent: 'category({ label: "the-gospel-is-restored" })' },*/
                        data: { pageTitle: 'Lesson Title', pageSubTitle: 'Some epic subtitle.' },
                        htmlClass: htmlClass.website
                    })
                    .state('lesson.prep', {
                        url: '/prep',
                        templateUrl: 'tpl/lesson.prep.tpl.html',
                        controller: ['$scope', '$stateParams', function( $scope, $stateParams ) {
                            //$scope.switchTab(1);
                        }],
                        htmlClass: htmlClass.website
                    })
                    .state('lesson.record', {
                        url: '/record',
                        templateUrl: 'tpl/lesson.record.tpl.html',
                        controller: ['$scope', '$stateParams', function( $scope, $stateParams ) {
                            //$scope.switchTab(2);
                        }],
                        htmlClass: htmlClass.website
                    })
                    ;


                /*********************************
                 * Pages
                 *********************************/
                $stateProvider
                    .state('page', {
                        url: '/page/:slug',
                        templateUrl: 'tpl/page.html',
                        controller: 'PageCtrl',
                        data: { pageTitle: 'Page' },
                        htmlClass: htmlClass.website
                    })
                    .state('page.sub', {
                        url: '/:sub_slug',
                        views: {
                            '@': {
                                templateUrl: 'tpl/page.html',
                                controller: 'PageCtrl'
                            }
                        },
                        htmlClass: htmlClass.website
                    })
                    ;


                /*********************************
                 * Gallery
                 *********************************/
                $stateProvider
                    .state('gallery', {
                        url: '/gallery',
                        templateUrl: 'tpl/gallery.html',
                        controller: 'GalleryCtrl',
                        htmlClass: htmlClass.website
                    })
                    .state('gallery.type', {
                        url: '/:type',
                        template: '<div ui-view></div>',
                        controller: ['$scope', '$state', '$stateParams', function ( $scope, $state, $stateParams ) {
                            console.log('gallery.type state reloaded');
                            if ( $state.current.name == 'gallery.type') {
                                $state.go('gallery.type.category', { cat: 'general' });    // Default state
                            }
                        }],
                        htmlClass: htmlClass.website
                    })
                    .state('gallery.type.category', {
                        url: '/:cat',
                        templateUrl: 'tpl/gallery.listing.tpl.html',
                        controller: ['$scope', '$state', '$stateParams', 'Lightbox', 'Gallery', function ( $scope, $state, $stateParams, Lightbox, Gallery ) {
                            console.log('$stateParams',$scope.$stateParams);
                            console.log('gallery.type.category state reloaded');

                            var request = {};
                            var system = 0;
                            if ( $stateParams.type == 'ours' ) { system = 1; }
                            request.filters = JSON.stringify( { 'system': system, 'category': $stateParams.cat } );
                            Gallery.all( request ).then( function ( results ) {
                                // Save original array index for later use
                                for (var i = 0; i < results.length; i++) {
                                    results[i].index = i;
                                }

                                // Divide results array into 3 chunks
                                var m, n;
                                var first, second, third;

                                m = Math.ceil(results.length / 3);
                                n = Math.ceil(2 * results.length / 3);

                                first = results.slice(0, m);
                                second = results.slice(m, n);
                                third = results.slice(n, results.length);
                                $scope.media = [ first, second, third ];
                                $scope.mediaAll = results;
                            });

                            $scope.openLightboxModal = function (index) {
                                Lightbox.openModal( $scope.mediaAll, index );
                            };
                        }],
                        htmlClass: htmlClass.website
                    })
                    ;


                /*********************************
                 * Forum
                 *********************************/
                $stateProvider
                    .state('forum', {
                        url: '/forum',
                        templateUrl: 'tpl/forum.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';

                            $scope.setHeader = function ( title, subtitle, icon ) {
                                if ( title ) { $scope.title = title; }
                                if ( subtitle ) { $scope.subtitle = subtitle; }
                                if ( icon ) { $scope.icon = icon; }
                            };
                            //$scope.setHeader( 'Forum', 'Ask our awesome community', 'life-bouy' );
                        }],
                        data: { pageTitle: 'Forum', pageSubTitle: 'Ask our awesome community' },
                        htmlClass: htmlClass.website
                    })
                    .state('forum.thread', {
                        url: '/thread/:id',
                        templateUrl: 'tpl/forum.thread.tpl.html',
                        controller: 'ForumThreadCtrl',
                        htmlClass: htmlClass.website
                    })
                    .state('forum.category', {
                        url: '/:label',
                        templateUrl: 'tpl/forum.category.tpl.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }],
                        htmlClass: htmlClass.website
                    })
                    .state('forum.course', {
                        url: '/course/:id',
                        templateUrl: 'tpl/forum.course.tpl.html',
                        controller: 'ForumCourseCtrl',
                        htmlClass: htmlClass.website
                    })



                    .state('pages2', {
                        abstract: true,
                        url: '/pages',
                        template: '<div yadda7 ui-view class="ui-view-main" />'
                    })
                    .state('pages2.tutors', {
                        url: '/tutors',
                        templateUrl: 'website/tutors.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('pages2.pricing', {
                        url: '/pricing',
                        templateUrl: 'website/pricing.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.websitePricing;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('pages2.survey', {
                        url: '/survey',
                        templateUrl: 'website/survey.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.websiteSurvey;
                            $scope.app.settings.bodyClass = 'survey';
                        }]
                    })
                    .state('pages2.contact', {
                        url: '/contact',
                        templateUrl: 'website/contact.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    });


                /*********************************
                 * Forum
                 *********************************/
                $stateProvider
                    .state('website-forum', {
                        abstract: true,
                        url: '/website-forum',
                        template: '<div yadda6 ui-view class="ui-view-main" />'
                    })
                    .state('website-forum.home', {
                        url: '/home',
                        templateUrl: 'tpl/forum-home.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-forum.category', {
                        url: '/category',
                        templateUrl: 'tpl/forum-category.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-forum.thread', {
                        url: '/thread',
                        templateUrl: 'tpl/forum-thread.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    ;


                /*********************************
                 * Blog
                 *********************************/
                $stateProvider
                    .state('website-blog', {
                        abstract: true,
                        url: '/website-blog',
                        template: '<div yadda5 ui-view class="ui-view-main" />'
                    })
                    .state('website-blog.listing', {
                        url: '/listing',
                        templateUrl: 'website/blog-listing.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-blog.post', {
                        url: '/post',
                        templateUrl: 'website/blog-post.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    });


                /*********************************
                 * Courses
                 *********************************/
                $stateProvider
                    .state('website-courses', {
                        abstract: true,
                        url: '/website-courses',
                        template: '<div yadda4 ui-view class="ui-view-main" />'
                    })
                    .state('courses-grid', {
                        url: '/grid',
                        templateUrl: 'website/courses-grid.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-courses.list', {
                        url: '/list',
                        templateUrl: 'website/courses-list.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-courses.single', {
                        url: '/single',
                        templateUrl: 'website/course.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    });


                /*********************************
                 * Curriculum  
                 *********************************/
                $stateProvider
                    .state('curriculum2', {
                        abstract: true,
                        url: '/curriculum',
                        template: '<div yadda3 ui-view class="ui-view-main" />'
                    })
                    .state('curriculum2.grid', {
                        url: '/grid',
                        templateUrl: 'website/courses-grid.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('curriculum2.list', {
                        url: '/list',
                        templateUrl: 'website/courses-list.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('curriculum2.single', {
                        url: '/single',
                        templateUrl: 'website/course.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    });


                /*********************************
                 * Student Dashboard
                 *********************************/
                $stateProvider
                    .state('website-student', {
                        abstract: true,
                        url: '/website-student',
                        template: '<div yadda2 ui-view class="ui-view-main" />'
                    })
                    .state('website-student.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'website/student-dashboard.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-student.courses', {
                        url: '/courses',
                        templateUrl: 'website/student-courses.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-student.take-course', {
                        url: '/take-course',
                        templateUrl: 'website/student-take-course.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-student.course-forums', {
                        url: '/course-forums',
                        templateUrl: 'website/student-course-forums.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-student.course-forum-thread', {
                        url: '/course-forum-thread',
                        templateUrl: 'website/student-course-forum-thread.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-student.take-quiz', {
                        url: '/take-quiz',
                        templateUrl: 'website/student-take-quiz.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.websiteTakeQuiz;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-student.messages', {
                        url: '/messages',
                        templateUrl: 'website/student-messages.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-student.private-profile', {
                        url: '/private-profile',
                        templateUrl: 'website/student-private-profile.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-student.billing', {
                        url: '/billing',
                        templateUrl: 'website/student-billing.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    });


                /*********************************
                 * Instructor Dashboard
                 *********************************/
                $stateProvider
                    .state('website-instructor', {
                        abstract: true,
                        url: '/website-instructor',
                        template: '<div yadda1 ui-view class="ui-view-main" />'
                    })
                    .state('website-instructor.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'website/instructor-dashboard.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-instructor.courses', {
                        url: '/courses',
                        templateUrl: 'website/instructor-courses.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-instructor.edit-course', {
                        url: '/edit-course',
                        templateUrl: 'website/instructor-edit-course.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-instructor.edit-course-meta', {
                        url: '/edit-course-meta',
                        templateUrl: 'website/instructor-edit-course-meta.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-instructor.edit-course-lessons', {
                        url: '/edit-course-lessons',
                        templateUrl: 'website/instructor-edit-course-lessons.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-instructor.earnings', {
                        url: '/earnings',
                        templateUrl: 'website/instructor-earnings.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-instructor.statement', {
                        url: '/instructor',
                        templateUrl: 'website/instructor-statement.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-instructor.messages', {
                        url: '/messages',
                        templateUrl: 'website/instructor-messages.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-instructor.private-profile', {
                        url: '/private-profile',
                        templateUrl: 'website/instructor-private-profile.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    })
                    .state('website-instructor.billing', {
                        url: '/billing',
                        templateUrl: 'website/instructor-billing.html',
                        controller: ['$scope', function($scope){
                            $scope.app.settings.htmlClass = htmlClass.website;
                            $scope.app.settings.bodyClass = '';
                        }]
                    });

                    /*********************************
                     * member Map
                     *********************************/
                    $stateProvider
                    .state('memberMap', {
                        url: '/memberMap',
                        templateUrl: 'tpl/memberMap.html',
                        controller: 'memberMapCtrl',
                        data: { pageTitle: 'Member Map', pageSubTitle: 'Marker Clusterer' },
                        htmlClass: htmlClass.website
                    });

            }
        ]
    );

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/search/search.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('SearchCtrl', ['$scope', '$state', '$stateParams', '$location', 'Search', 'Config', '$modal', 'Resource', '$uibModal', function ( $scope, $state, $stateParams, $location, Search, Config, $modal, Resource, $uibModal ) {
            console.log('IN SEARCHCTRL');
            $scope.results = [];
            $scope.searching = false;

            $scope.filteredResults = [];
            $scope.itemsPerPage = 40;
            $scope.currentPage = 1;
            $scope.totalItems = 0;
            $scope.page.title = "Search";
            $scope.config = Config;
            $scope.searchFilters = { courses: true, lessons: true, resources: true };
            var searchResults = [];

            $scope.newSearch = function (q){
                $state.go('search',{q:q, filters: $scope.searchFilters});
            };
            $scope.search = function (q) {
                if(q) {
                    $scope.searched = true;
                    $scope.results = [];
                    $scope.filteredResults = [];
                    $scope.searching = true;
                    $scope.message = "Searching . . .";
                    $scope.page.title = "Search for: '"+q+"'";
                    Search.searchQuery(q).then(function (response) {
                        searchResults = response.results;
                        $scope.results = filterResults( searchResults, $scope.searchFilters );
                        $scope.paginateResults();
                        $scope.searching = false;
                        $scope.message = false;
                        $scope.totalItems = response.info.totalRows;
                    }, function (error) {
                        $scope.results = [];
                        $scope.filteredResults = [];
                        $scope.message = error[0];
                        $scope.searching = false;
                    });
                }
            };

            /*$scope.submit = function () {
                $state
            };*/

            $scope.notLoggedIn = function () {
                var modalInstance = $uibModal.open({
                        templateUrl: 'tpl/not-logged-in.modal.tpl.html',
                        controller: function ($scope, $uibModalInstance) {
                            $scope.close = function (d) {
                                if(d) {
                                    $uibModalInstance.close(d);
                                }else{
                                    $uibModalInstance.dismiss();
                                }
                            };
                        },
                        size: "md",
                        backdrop: 'static'
                    });
            };

            $scope.paginateResults = function() {
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
                var end = begin + $scope.itemsPerPage;
                if($scope.results) {
                    $scope.filteredResults = $scope.results.slice(begin, end);
                    $scope.begin = begin;
                    $scope.end = end;
                }
            };
            $scope.pageChanged = function(curr) {
                $scope.currentPage = curr;
                $scope.paginateResults();
            };

            $scope.clickResult = function ( result, $event ) {
                if ( result.type == 'resource' && result.resource_type != 'url' ) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.resourcePopup( result.id );
                }
            };

            // RESOURCE MODAL
            $scope.resourcePopup = function ( resource_id ) {
                if ( resource_id ) {
                    Resource.getResource( resource_id ).then( function ( resource ) {
                        if ( resource.type != 'url' ||  resource.is_broken ) {
                            // Open the modal
                            var modalInstance = $modal.open({
                                templateUrl: 'tpl/resource-modal.tpl.html',
                                controller: 'ResourceModalCtrl',
                                size: "lg",
                                resolve: {
                                    resource: function () {
                                        return resource;
                                    }
                                }
                            });

                            modalInstance.result.then(function() {
                            }, function() {
                                //Modal dismissed
                                //$log.info('Modal dismissed at: ' + new Date());
                            });
                        }
                    });

                }
            };

            if($stateParams.filters) {
                $scope.searchFilters = $stateParams.filters;
            }

            if($stateParams.q) {
                $scope.query = $stateParams.q;
                $scope.search($stateParams.q);
            }

            $scope.$watch( 'searchFilters', function () {
                $scope.results = filterResults( searchResults, $scope.searchFilters );
                $scope.paginateResults();
            }, true );

            function filterResults ( results, filters ) {
                var res = [];
                angular.forEach( results, function ( result ) {
                    if ( filters[result.type + 's'] ) {
                        res.push( result );
                    }
                });
                return res;
            }

        }]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/search/search.service.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .factory('Search', ['$http', 'Config', function ( $http, Config ) {

        	var prefix = Config.apiPath + 'search';

		    function searchQuery ( q ) {
		        return $http.get( prefix + '/' + q + '?l=100' );
		    }

		    return {
		        searchQuery: searchQuery
		    }

        }]);
})();

},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/support/support.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('SupportCtrl', [ '$http', '$scope', 'Config', function ( $http, $scope, Config ) {

		    $scope.formData = {};
		    $scope.formBtn = true;
		    $scope.page.title = "Help";
			$scope.page.breadcrumbText= "Let us know your comments, critiques and suggestions!";
		    // process the form
		    $scope.processForm = function () {
		        $scope.formData.submit = true;
		        $scope.formBtn = false;
		        $http({
		            method: 'POST',
		            url: Config.apiPath+'contact',
		            data: $.param($scope.formData),  // pass in data as strings
		            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		        })
		            .then( function (data) {
		                $scope.errors = false;
		                $scope.message = "<strong>Success!</strong> Your feedback has been received!  Thank you!";
		                $scope.formBtn = true;
		            }, function (errors) {
		                $scope.errors = true;
		                $scope.message = "<strong>Error!</strong> "+errors[0];
		                $scope.formBtn = true;
		            });
		    };

        } ]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/training/training.controller.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .controller('TrainingCtrl', [ '$http', '$scope', '$interval', function ( $http, $scope, $interval ) {

        	var slideChanger;
        	$scope.slide = 1;
			$scope.slides = 20;
			$scope.next = function () {
				if ( $scope.slide == $scope.slides ) {
					$scope.slide = 1;
				} else {
					$scope.slide++;
				}
				cancelSlider(); initiateSlider();
			};
			$scope.back = function () {
				if ( $scope.slide == 1 ) {
					$scope.slide = $scope.slides;
				} else {
					$scope.slide--;
				}
				cancelSlider(); initiateSlider();
			};

			// Automatically change slides
			function initiateSlider () {
				slideChanger = $interval( $scope.next, 3500 );
			}
			function cancelSlider () {
				$interval.cancel( slideChanger );
			}

			initiateSlider();

        } ]);
})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/angular/directives/countdown.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('tkCountdown', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkCountdown();
                    scope.$on("$destroy", function(){
                        el.countdown('pause');
                    });
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/angular/directives/curriculum.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('curriculum', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkCurriculum();
                    el.find('.list-group-item').click(function(){
                       scope.$state.go($(this).data('target'));
                    });
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/angular/directives/flotchart-earnings.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('toggle', [ function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (attrs.toggle == 'flot-chart-earnings') {
                        el.tkFlotChartEarnings();
                    }
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/angular/directives/navbar-transition-scroll.js":[function(require,module,exports){
(function () {
    "use strict";

    angular.module('app')
        .directive('windowNavbarTransition', [ '$window', function ($window) {
            return function (scope, el) {
                angular.element($window).tkScrollNavbarTransition();
            };
        } ])
        .directive('stContentInner', [ function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkScrollNavbarTransition();
                }
            };
        } ]);

})();
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/main.js":[function(require,module,exports){
// Curriculum
require('../html/_curriculum');

// Scrolling behaviour
require('../html/_scroll');

// Quiz timer
require('../html/_countdown');

// Earnings chart
require('../html/_flotchart-earnings');

// NEW Angular App
require('../../../app/all.js');

// OLD Angular App
//require('./angular/app.js');
//require('./angular/config.router.js');
//require('./angular/main.js');

// Library Directives
require('essential/js/angular/main');
require('layout/js/angular/main');
require('sidebar/js/angular/main');
require('maps/js/angular/_google-maps');
require('media/js/angular/main');
require('material/js/angular/main');

// Custom Directives
require('./angular/directives/navbar-transition-scroll');
require('./angular/directives/countdown');
require('./angular/directives/curriculum');
require('./angular/directives/flotchart-earnings');
},{"../../../app/all.js":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/app/all.js","../html/_countdown":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/html/_countdown.js","../html/_curriculum":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/html/_curriculum.js","../html/_flotchart-earnings":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/html/_flotchart-earnings.js","../html/_scroll":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/html/_scroll.js","./angular/directives/countdown":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/angular/directives/countdown.js","./angular/directives/curriculum":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/angular/directives/curriculum.js","./angular/directives/flotchart-earnings":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/angular/directives/flotchart-earnings.js","./angular/directives/navbar-transition-scroll":"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/angular/angular/directives/navbar-transition-scroll.js","essential/js/angular/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/essential/js/angular/main.js","layout/js/angular/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/layout/js/angular/main.js","maps/js/angular/_google-maps":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/maps/js/angular/_google-maps.js","material/js/angular/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/material/js/angular/main.js","media/js/angular/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/media/js/angular/main.js","sidebar/js/angular/main":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/sidebar/js/angular/main.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/html/_countdown.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkCountdown = function () {
        this.countdown({
            until: moment().add(10, 'minute').toDate()
        });
    };

    $('.tk-countdown').tkCountdown();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/html/_curriculum.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkCurriculum = function () {

        var e = this;

        if (typeof angular == 'undefined') {
            this.find('.list-group-item').on('click', function () {
                location.href = $(this).data('target');
            });
        }

        this.find('.collapse')
            .on('show.bs.collapse', function () {
                e.addClass('open');
            })
            .on('hide.bs.collapse', function () {
                e.removeClass('open');
            });
    };

    $('.curriculum').tkCurriculum();

})(jQuery);
},{}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/html/_flotchart-earnings.js":[function(require,module,exports){
(function ($) {

    var skin = require('charts/js/lib/_skin')();
    var charts = require('charts/js/flot/_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_earnings =
    {
        // chart data
        data: {
            d1: [],
            d2: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ colors[ 'warning-color' ], colors[ 'success-color' ] ],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 2,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {
                noColumns: 2,
                position: "nw",
                backgroundColor: null,
                backgroundOpacity: 0
            },
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 10 + charts.utility.randNum() ], [ 2, 20 + charts.utility.randNum() ], [ 3, 50 + charts.utility.randNum() ], [ 4, 160 + charts.utility.randNum() ], [ 5, 110 + charts.utility.randNum() ], [ 6, 36 + charts.utility.randNum() ], [ 7, 70 + charts.utility.randNum() ], [ 8, 30 + charts.utility.randNum() ], [ 9, 36 + charts.utility.randNum() ], [ 10, 80 + charts.utility.randNum() ], [ 11, 140 + charts.utility.randNum() ], [ 12, 47 + charts.utility.randNum() ], [ 13, 50 + charts.utility.randNum() ], [ 14, 50 + charts.utility.randNum() ], [ 15, 45 + charts.utility.randNum() ], [ 16, 100 + charts.utility.randNum() ], [ 17, 50 + charts.utility.randNum() ], [ 18, 53 + charts.utility.randNum() ], [ 19, 56 + charts.utility.randNum() ], [ 20, 59 + charts.utility.randNum() ], [ 21, 62 + charts.utility.randNum() ], [ 22, 90 + charts.utility.randNum() ], [ 23, 56 + charts.utility.randNum() ], [ 24, 59 + charts.utility.randNum() ], [ 25, 62 + charts.utility.randNum() ], [ 26, 65 + charts.utility.randNum() ], [ 27, 80 + charts.utility.randNum() ], [ 28, 71 + charts.utility.randNum() ], [ 29, 75 + charts.utility.randNum() ], [ 30, 120 + charts.utility.randNum() ] ];
            this.data.d2 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 80 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 70 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 60 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 100 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper, [
                    {
                        label: "Gross Revenue",
                        data: this.data.d1
                    },
                    {
                        label: "Net Revenue",
                        data: this.data.d2
                    }
                ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartEarnings = function () {

        if (! this.length) return;

        charts.chart_earnings.init(this);

    };

    $('[data-toggle="flot-chart-earnings"]').tkFlotChartEarnings();

})(jQuery);
},{"charts/js/flot/_helper":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/flot/_helper.js","charts/js/lib/_skin":"/home/rof/src/github.com/jstoddardiv/TFSO-App/lib/charts/js/lib/_skin.js"}],"/home/rof/src/github.com/jstoddardiv/TFSO-App/src/js/themes/html/_scroll.js":[function(require,module,exports){
(function ($, window) {
    "use strict";

    var $window = $(window),
        $content = $('.st-content-inner');

    $.fn.tkScrollNavbarTransition = function () {

        var handleScroll = function (e) {

            var $navbar = $('.navbar-fixed-top'),
                $html = $('html');

            if (Modernizr.touch || ! $navbar.length || ! $html.is('.transition-navbar-scroll')) return false;

            var scrollTop = parseInt($(e.currentTarget).scrollTop(), 10);

            if (! isNaN(scrollTop)) {
                if (scrollTop > 50) {
                    if ($navbar.data('z') !== 1) {
                        $navbar.attr('data-z', 1);
                    }
                    if ($navbar.is('.navbar-size-xlarge')) {
                        $navbar.removeClass('navbar-size-xlarge');
                    }
                    if ($html.is('.ls-top-navbar-xlarge')) {
                        $html.removeClass('ls-top-navbar-xlarge').addClass('ls-top-navbar-large');
                    }
                    if ($html.is('.top-navbar-xlarge')) {
                        $html.removeClass('top-navbar-xlarge').addClass('top-navbar-large');
                    }
                }
                if (scrollTop <= 0) {
                    $navbar.attr('data-z', 0);
                    $navbar.addClass('navbar-size-xlarge');
                    if ($html.is('.ls-top-navbar-large')) {
                        $html.removeClass('ls-top-navbar-large').addClass('ls-top-navbar-xlarge');
                    }
                    if ($html.is('.top-navbar-large')) {
                        $html.removeClass('top-navbar-large').addClass('top-navbar-xlarge');
                    }
                }
            }

        };

        this.scroll(handleScroll);

    };

    if ($content.length) {
        $content.tkScrollNavbarTransition();
    }
    else {
        $window.tkScrollNavbarTransition();
    }

})(jQuery, window);
},{}]},{},["./src/js/themes/angular/app.js"]);
