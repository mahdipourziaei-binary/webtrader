define(["websockets/binary_websockets","charts/chartingRequestMap","jquery","jquery-timer"],function(a,b,c){function d(a){var b=a.toUpperCase().replace("D","").replace("M","").replace("W",""),c=""==b?1:parseInt(b),d=a.toUpperCase().replace(""+c,"");return{suffix:d,intVal:c}}function e(a,b){var c=0;switch(a){case"M":c=60*b;break;case"H":c=60*b*60;break;case"D":c=24*b*60*60}return c}function f(a,b,d,e,f,g,h){if(!(h.length>0&&h[h.length-1][0]>f))if(g&&isDataTypeClosePriceOnly(g)){if(!c.isNumeric(f)||!c.isNumeric(e))return;h.push([f,e])}else{if(!(c.isNumeric(f)&&c.isNumeric(a)&&c.isNumeric(b)&&c.isNumeric(d)&&c.isNumeric(e)))return;h.push([f,a,b,d,e])}}function g(a,b,d,e,f,g){if(a){var h=b.length,i=b.length>30?h-30:0;a.xAxis[0].range=b[h-1][0]-b[i][0];var j=a.addSeries({id:f,name:e,data:b,type:d?d:"candlestick",dataGrouping:{enabled:!1},compare:g});j.isDirty=!0,c(j).data("isInstrument",!0),j.isDirtyData=!0,c(document).oneTime(1e3,null,function(){j.addCurrentPrice(),a.redraw()}),a.hideLoading()}}function h(b,h,i,j,k){var l=b;if(h[l]){var m=h[l].chartIDs;if(k){var n=void 0;m.forEach(function(a){return a.containerIDWithHash==k?(n=a,!1):void 0});var o=c(k).highcharts(),p=i.chain().find({instrumentCdAndTp:l}).simplesort("time",!1).data(),q=[],r=c(k).data("type");for(var s in p)f(p[s].open,p[s].high,p[s].low,p[s].close,p[s].time,r,q);g(o,q,r,n.instrumentName,l,n.series_compare,n.instrumentCode)}else for(var t in m){var n=m[t];if(j){var u=c(n.containerIDWithHash).highcharts().get(b),v=u.data[u.data.length-1].x||u.data[u.data.length-1].time,p=i.chain().find({instrumentCdAndTp:l}).where(function(a){return a.time>=v}).simplesort("time",!1).data();for(var t in p){for(var w=p[t],x=void 0,y=u.data.length-1;y>=0;y--){var z=u.data[y];if(z&&w.time==(z.x||z.time)){x=z;break}}x?x.update(r&&isDataTypeClosePriceOnly(r)?[w.time,w.close]:[w.time,w.open,w.high,w.low,w.close]):r&&isDataTypeClosePriceOnly(r)?u.addPoint([w.time,w.close],!1,!1):u.addPoint([w.time,w.open,w.high,w.low,w.close],!1,!1),u.isDirty=!0,u.isDirtyData=!0}u.chart.redraw()}else{var o=c(n.containerIDWithHash).highcharts(),p=i.chain().find({instrumentCdAndTp:l}).simplesort("time",!1).data(),q=[],r=c(n.containerIDWithHash).data("type");for(var s in p)f(p[s].open,p[s].high,p[s].low,p[s].close,p[s].time,r,q);g(o,q,r,n.instrumentName,l,n.series_compare,n.instrumentCode)}}if(c.isEmptyObject(h[l].tickStreamingID)){var n=h[l].chartIDs[0],A=c(n.containerIDWithHash).data("instrumentCode"),B=c(n.containerIDWithHash).data("timeperiod");if(a.send({ticks:n.instrumentCode,passthrough:{instrumentCdAndTp:l}}),isTick(B))return;for(var p=i.chain().find({instrumentCdAndTp:l}).simplesort("time",!0).limit(1).data(),C=d(B),D=C.suffix,E=C.intVal,F=e(D,E),G=p[0].time,H=G+1e3*F,I=new Date;H<I.getTime();)H+=1e3*F;h[l].timerHandler="_"+(new Date).getTime(),c(document).oneTime(Math.ceil(H-I.getTime())+1e3,h[l].timerHandler,function(){function b(){var b=i.chain().find({instrumentCdAndTp:l}).simplesort("time",!0).limit(1).data();if(b&&b.length>0){b=b[0];var c=d(B),e=(c.suffix,c.intVal,{ticks_history:A,end:"latest",start:b.time/1e3,granularity:F,passthrough:{isTimer:"true",instrumentCdAndTp:l}});a.send(e)}}h[l].timerHandler="_"+(new Date).getTime(),c(document).everyTime(1e3*F,h[l].timerHandler,b),b()})}}}var i=b.barsTable;return a.events.on("candles",function(a){for(var c in a.candles){var d=a.candles[c],e=parseFloat(d.open),f=parseFloat(d.high),g=parseFloat(d.low),j=parseFloat(d.close),k=1e3*parseInt(d.epoch),l=i.chain().find({time:k}).find({instrumentCdAndTp:a.echo_req.passthrough.instrumentCdAndTp}).limit(1).data();l&&l.length>0?(l=l[0],l.open=e,l.high=f,l.low=g,l.close=j,i.update(l)):i.insert({instrumentCdAndTp:a.echo_req.passthrough.instrumentCdAndTp,time:k,open:e,high:f,low:g,close:j})}h(a.echo_req.passthrough.instrumentCdAndTp,b,i,a.echo_req.passthrough.isTimer,null)}),a.events.on("history",function(a){for(var c in a.history.times){var d=1e3*parseInt(a.history.times[c]),e=parseFloat(a.history.prices[c]),f=i.chain().find({time:d}).find({instrumentCdAndTp:a.echo_req.passthrough.instrumentCdAndTp}).limit(1).data();f&&f.length>0?(f=f[0],f.open=e,f.high=e,f.low=e,f.close=e,i.update(f)):i.insert({instrumentCdAndTp:a.echo_req.passthrough.instrumentCdAndTp,time:d,open:e,high:e,low:e,close:e})}h(a.echo_req.passthrough.instrumentCdAndTp,b,i,!1,null)}),{retrieveChartDataAndRender:function(f,g,j,k,l,m){var n=d(f),o=n.suffix,p=n.intVal,q=e(o,p),r=1e3;"D"==o&&p>1&&(r=Math.floor(r/p));var s=Math.ceil((new Date).getTime()/1e3),t=s-r*q,u=Math.ceil((s-t)/q);if(isTick(f)&&(u=1e3),!c.isEmptyObject(b[(g+f).toUpperCase()]))return b[(g+f).toUpperCase()].chartIDs.push({containerIDWithHash:j,series_compare:m,instrumentCode:g,instrumentName:l}),void h((g+f).toUpperCase(),b,i,!1,j);var v=(g+f).toUpperCase();b[v]=b[v]||{tickStreamingID:""},b[v].chartIDs=[{containerIDWithHash:j,series_compare:m,instrumentCode:g,instrumentName:l}];var w={ticks_history:g,end:"latest",count:u,adjust_start_time:1,passthrough:{instrumentCdAndTp:(g+f).toUpperCase()}};isTick(f)||(w=c.extend(w,{start:t,granularity:q})),a.send(w)["catch"](function(a){})}}});