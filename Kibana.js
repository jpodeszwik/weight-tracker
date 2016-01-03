function Kibana(kibanaUrl) {
    this.kibanaUrl = kibanaUrl;

    this.getIframeUrl = function (username, bounds) {
        return this.kibanaUrl + "/#/visualize/create?embed&type=line&indexPattern=weight&_g=(refreshInterval:(display:Off,pause:!f,section:0,value:0),time:(from:'" + bounds.minTime + "',mode:absolute,to:'" + bounds.maxTime + "'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'_type:" + username + "')),vis:(aggs:!((id:'1',params:(field:value),schema:metric,type:avg),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram)),listeners:(),params:(addLegend:!f,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!t,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:(max:" + (bounds.maxWeight + 1) + ",min:" + (bounds.minWeight - 1) + ")),type:line))"
    };
}
