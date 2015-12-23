define(["indicator_base","highstock"],function(a){function b(b,c,d){for(var e=0,f=0,g=b,h=1;g>=1&&c>=h;g--,h++)(d[g][2]||d[g].high||d[g][1]||d[g].y)>e&&(e=d[g][2]||d[g].high||d[g][1]||d[g].y),((d[g][3]||d[g].low||d[g][1]||d[g].y)<f||0==f)&&(f=d[g][3]||d[g].low||d[g][1]||d[g].y);return 100*(e-a.extractPrice(d,b))/(e-f)}var c={},d={};return{init:function(){!function(a,e,f){function g(a,e){{var g=this;g.chart}for(var h in d)if(d[h]&&d[h].options&&d[h].options.data&&d[h].options.data.length>0&&c[h].parentSeriesID==g.options.id){var i=g.options.data,j=c[h].period,k=f.findIndexInDataForTime(i,a);if(k>=1){var l=b(k,j,i);l=f.toFixed(l,2),e?d[h].data[k].update({y:l}):d[h].addPoint([i[k].x||i[k][0],l],!0,!0,!1)}}}a&&!a.Series.prototype.addWILLR&&(a.Series.prototype.addWILLR=function(a){var g=this.options.id;a=e.extend({period:14,stroke:"red",strokeWidth:2,dashStyle:"line",levels:[],parentSeriesID:g},a);var h="_"+(new Date).getTime(),i=this.options.data||[];if(i&&i.length>0){for(var j=[],k=0;k<i.length;k++)if(k>=a.period){var l=b(k,a.period,i);isFinite(l)&&!isNaN(l)&&j.push([i[k].x||i[k][0],f.toFixed(l,2)])}else j.push([i[k].x||i[k][0],0]);var m=this.chart;c[h]=a,m.addAxis({id:"willr"+h,title:{text:"WILLR ("+a.period+")",align:"high",offset:0,rotation:0,y:10,x:55},lineWidth:2,plotLines:a.levels},!1,!1,!1),f.recalculate(m);var n=this;d[h]=m.addSeries({id:h,name:"WILLR ("+a.period+")",data:j,type:"line",dataGrouping:n.options.dataGrouping,yAxis:"willr"+h,opposite:n.options.opposite,color:a.stroke,lineWidth:a.strokeWidth,dashStyle:a.dashStyle},!1,!1),e(d[h]).data({isIndicator:!0,indicatorID:"willr",parentSeriesID:a.parentSeriesID,period:a.period}),m.redraw()}return h},a.Series.prototype.removeWILLR=function(a){var b=this.chart;c[a]=null,b.get(a).remove(!1),b.get("willr"+a).remove(!1),d[a]=null,f.recalculate(b),b.redraw()},a.Series.prototype.preRemovalCheckWILLR=function(a){return{isMainIndicator:!0,period:c[a]?c[a].period:void 0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,h){a.call(this,b,d,e,h),f.checkCurrentSeriesHasIndicator(c,this.options.id)&&g.call(this,b[0])}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),f.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&g.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});