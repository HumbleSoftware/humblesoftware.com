//
// Fortune 500
// Copyright 2011 Humble Software Development
//
(function(){function y(a){return a>1e3?"$"+Math.round(a/100)/10+"b":"$"+Math.round(10*a)/10+"m"}function z(a,b){var c=l[j],d=l[a],e=l[i],f=F500.names,g=F500.values,h=g.length,k=1-b,m,p,q,r,s,t,u;v.clearRect(0,0,n,o),v.beginPath();for(r=0;r<h;r++){p=g[r],m=p.length,q=f[r].length/4;for(s=0;s<m;s++)t=p[s][c],p[s][e]=u=b*p[s][d]+k*(p[s][e]||p[s][d]),v.moveTo(t-q,u),v.lineTo(t+q,u)}v.closePath(),v.stroke(),w!==null&&B(a,w,b)}function A(a,b,c,d){var e=l[j],f=l[a],g=F500.values,h=g.length,i,k,m,n;for(m=0;m<h;m++){k=g[m],i=k.length;if(d){for(n=0;n<i;n++)if(Math.abs(k[n][e]-b)<7&&k[n][f]==c)return{i:m,j:n}}else for(n=0;n<i;n++)if(Math.abs(k[n][e]-b)<7&&Math.abs(k[n][f]-c)<1)return{i:m,j:n}}}function B(a,b,d){var e=F500.names[b.i],f=Math.max(e.length/4,3),g=F500.values[b.i],h=l[j],k=l[i],m=l[a],n,o,p;v.save(),v.strokeStyle=c,v.lineWidth="2.5",v.beginPath();for(p=0;p<g.length;p++)n=g[p][h],o=d*g[p][m]+(1-d)*(g[p][k]||g[p][b.i]),v.moveTo(n-f,o),v.lineTo(n+f,o);v.moveTo(g[0][h],g[0][m]),v.closePath(),v.stroke(),v.restore(),D(b.i,b.j,d)}function C(a,b){var c=F500.values[a][b],d=F500.names[a],e='<div class="company-content"><div class="value name">'+d+"</div>",f;for(f in k)e+='<div class="data '+f+'">',e+='<div class="label">'+f+"</div>",e+='<div class="value">'+(m[f]?m[f](c[k[f]]):c[k[f]])+"</div>",e+="</div>";e+='</div><div class="company-arrow"></div>',u.html(e).show()}function D(a,b,c){var d=F500.values[a][b],e=l[x],f=l[i],g=d[l[j]],h=c*d[e]+(1-c)*(d[f]||0);u.css({left:g-u.width()/2,top:Math.round(h+4)})}function E(){function p(a){a?(w=a,C(a.i,a.j),z(x,1)):(w=null,u.hide(),z(x,1))}function q(){return!!$("#inflation-checkbox").attr("checked")}function r(a){var b=q(),c=[d,g,e],i;for(var j in c)if($(a.target).hasClass(c[j])){i=c[j];if(i===x)return;$(".controls .control").removeClass("selected"),$(a.target).addClass("selected"),b&&(i==g?i=h:i==e&&(i=f)),s(i);return}}function s(a){b=x,x=a,c=0,k||v()}function v(){if(!n){z(x,1);return}k=!0,clearTimeout(i),c?c+=.08:c=.08,c>1&&(c=1),z(x,(1+Math.sin(-Math.PI/2-c*Math.PI))/2),c<1?i=setTimeout(function(){v()},25):k=!1}var b=null,c=0,i=null,k=!1,m=$(a),n,o;F(),o=new Date,z(d,1),n=new Date-o<150?!0:!1,$(".controls .control").click(r),$("#inflation-checkbox").change(function(a){var b=q();b?x==g?s(h):x==e&&s(f):x==h?s(g):x==f&&s(e)}),$(window).keydown(function(a){if(w===null)return;var b=F500.values,c=b[w.i][w.j],e=c[l[j]],f=c[l[d]],g;switch(a.keyCode){case 37:e-=14;break;case 38:f--;break;case 39:e+=14;break;case 40:f++;break;default:return}return a.preventDefault(),g=A(d,e,f,!0),p(g),!1}),t.click(function(a){var b=t.offset(),c=a.pageX-b.left,d=a.pageY-b.top,e=A(x,c,d);p(e)})}function F(){t.attr("width",n).attr("height",o),v.strokeStyle=b,v.translate(0,-0.5),v.lineWidth="1px"}function G(){var a=o/Math.log(6e5),b=o/(2*Math.log(1e6)),c=k[g],d=k[e],f=k[j],h=F500.values,i=F500.inflation,l=o/2,m=h.length,n,p,q,r,s,t,u;for(t=0;t<m;t++){p=h[t],n=p.length;for(u=0;u<n;u++)q=p[u],r=q[f],q.push(Math.round(o-Math.log(q[c]-40)*a)),q.push(Math.round(o-Math.log(q[c]*i[r]-40)*a)),s=q[d],s<0?(q.push(Math.round(l+Math.log(-10*s)*b)),q.push(Math.round(l+Math.log(-10*s*i[r])*b))):(q.push(Math.round(l-Math.log(10*s)*b)),q.push(Math.round(l-Math.log(10*s*i[r])*b)))}}var a="#chart",b="rgba(72,99,160,.8)",b="rgba(72,72,72,.8)",b="rgba(72,72,72,.3)",b="rgba(181,192,217,1)",c="rgba(200,30,30,1)",d="rank",e="profit",f="iProfit",g="revenue",h="iRevenue",i="previous",j="year",k={year:0,rank:1,revenue:2,profit:3},l={year:0,rank:1,previous:4,revenue:5,iRevenue:6,profit:7,iProfit:8},m={year:function(a){return Math.round((a+.5)*57/800+1954)},revenue:y,profit:y},n=800,o=502,p=1954,q=2010,r=0,s=500,t=$(a).append("<canvas></canvas>").find("canvas"),u=$(".company"),v=t[0].getContext("2d"),w=null,x=d;E(),setTimeout(function(){G()},10)})();