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
    } else {
        return param
    }
}

function singleQuotedString(str) {
    return '\'' + str + '\'';
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
                pause: '!f',
                section: 0,
                value: 0
            },
            time: {
                from: singleQuotedString(minTime),
                mode: 'absolute',
                to: singleQuotedString(maxTime)
            }
        };

        var query = {
            query_string: {
                analyze_wildcard: '!t',
                query: singleQuotedString('_type:' + username)
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
                    customInterval: singleQuotedString('2h'),
                    field: singleQuotedString('@timestamp'),
                    interval: 'd',
                    min_doc_count: 1
                },
                schema: 'segment',
                type: 'date_histogram'
            }
        ];

        var params = {
            addLegend: '!f',
            addTimeMarker: '!f',
            addTooltip: '!t',
            defaultYExtents: '!f',
            drawLinesBetweenPoints: '!t',
            interpolate: 'linear',
            radiusRatio: 9,
            scale: 'linear',
            setYExtents: '!t',
            shareYAxis: '!t',
            showCircles: '!t',
            smoothLines: '!f',
            yAxis: {
                max: bounds.maxWeight + 1,
                min: bounds.minWeight - 1
            }
        };

        var a = {
            linked: '!f',
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
