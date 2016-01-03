function serializeToKibanaUrlFormat(param) {
    var innerValue;

    if (Array.isArray(param)) {
        innerValue = param.map(function (obj) {
            return serializeToKibanaUrlFormat(obj);
        }).join(',');
        return '!(' + innerValue + ')';
    } else if (param instanceof Object) {
        innerValue = Object.keys(param).map(function (fieldName) {
            return fieldName + ':' + serializeToKibanaUrlFormat(param[fieldName]);
        }).join(',');
        return '(' + innerValue + ')';
    } else if (typeof param === 'boolean') {
        return param ? '!t' : '!f';
    } else if (typeof param === 'string') {
        return '\'' + param + '\'';
    } else {
        return param;
    }
}

function addDaysToDate(date, days) {
    var parsedDate = new Date(Date.parse(date));
    parsedDate.setDate(parsedDate.getDate() + days);
    return parsedDate.toISOString();
}

function Kibana(kibanaUrl) {
    this.kibanaUrl = kibanaUrl;

    this.getIframeUrl = function (username, bounds) {
        var minTime = addDaysToDate(bounds.minTime, -2);
        var maxTime = addDaysToDate(bounds.maxTime, 5);

        var g = {
            refreshInterval: {
                display: 'Off',
                pause: false,
                section: 0,
                value: 0
            },
            time: {
                from: minTime,
                mode: 'absolute',
                to: maxTime
            }
        };

        var query = {
            query_string: {
                analyze_wildcard: true,
                query: '_type:' + username
            }
        };

        var aggs = [
            {
                id: 1,
                params: {
                    field: 'value'
                },
                schema: 'metric',
                type: 'avg'
            },
            {
                id: 2,
                params: {
                    customInterval: '2h',
                    field: '@timestamp',
                    interval: 'd',
                    min_doc_count: 1
                },
                schema: 'segment',
                type: 'date_histogram'
            }
        ];

        var params = {
            addLegend: false,
            addTimeMarker: false,
            addTooltip: true,
            defaultYExtents: false,
            drawLinesBetweenPoints: true,
            interpolate: 'linear',
            radiusRatio: 9,
            scale: 'linear',
            setYExtents: true,
            shareYAxis: true,
            showCircles: true,
            smoothLines: false,
            yAxis: {
                max: bounds.maxWeight + 1,
                min: bounds.minWeight - 1
            }
        };

        var a = {
            linked: false,
            query: query,
            vis: {
                aggs: aggs,
                params: params,
                type: 'line'
            }
        };

        return this.kibanaUrl + "/#/visualize/create?embed&type=line&indexPattern=weight&_g=" + serializeToKibanaUrlFormat(g) + "&_a=" + serializeToKibanaUrlFormat(a);
    };
}
