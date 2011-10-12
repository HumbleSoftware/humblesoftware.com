//
// Fortune 500
// Copyright 2010 Humble Software Development
//
(function(){function F(){function t(a){return a<0?profit=Math.round(n/2+Math.log(-10*a)*b):profit=Math.round(n/2-Math.log(10*a)*b)}function s(b){return Math.round(n-Math.log(b-40)*a)}var a=n/Math.log(6e5),b=n/(2*Math.log(1e6)),c=j[g],d=j[e],f=j[i],h=F500.values,k=F500.inflation,l=h.length,m,o,p,q,r;for(q=0;q<l;q++){o=h[q],m=o.length;for(r=0;r<m;r++)p=o[r][f],o[r].push(s(o[r][c])),o[r].push(s(o[r][c]*k[p])),o[r].push(t(o[r][d])),o[r].push(t(o[r][d]*k[p]))}}function E(){s.attr("width",m).attr("height",n),u.strokeStyle=b,u.lineWidth="1px"}function D(){function x(){n?(l=!0,clearTimeout(j),c?c+=.05:c=.05,y(w,(1+Math.sin(-Math.PI/2-c*Math.PI))/2),c<1?j=setTimeout(function(){x()},10):l=!1):y(w,1)}function u(a){b=w,w=a,c=0,l||x()}function r(a){var b=q(),c=[d,g,e],i;for(var j in c)if($(a.target).hasClass(c[j])){i=c[j];if(i===w)return;$(".controls .control").removeClass("selected"),$(a.target).addClass("selected"),b&&(i==g?i=h:i==e&&(i=f)),u(i);return}}function q(){return!!$("#inflation-checkbox").attr("checked")}function p(a){a?(v=a,B(a.i,a.j),y(w,1)):(v=null,t.hide(),y(w,1))}var b=null,c=0,j=null,l=!1,m=$(a),n,o;E(),o=new Date,y(d,1),n=new Date-o<150?!0:!1,$(".controls .control").click(r),$("#inflation-checkbox").change(function(a){var b=q();b?w==g?u(h):w==e&&u(f):w==h?u(g):w==f&&u(e)}),$(window).keydown(function(a){if(v!==null){var b=F500.values,c=b[v.i][v.j],e=c[k[i]],f=c[k[d]],g;switch(a.keyCode){case 37:e-=14;break;case 38:f--;break;case 39:e+=14;break;case 40:f++;break;default:return}a.preventDefault(),g=z(d,e,f,!0),p(g);return!1}}),s.click(function(a){var b=s.offset(),c=a.pageX-b.left,d=a.pageY-b.top,e=z(w,c,d);p(e)})}function C(a,b,c){var d=F500.values[a][b],e=k[w],f=d[k[i]],g=c*d[e]+(1-c)*(d.previous||0);t.css({left:f-t.width()/2,top:Math.round(g+4)})}function B(a,b){var c=F500.values[a][b],d=F500.names[a],e='<div class="company-content"><div class="value name">'+d+"</div>",f;for(f in j)e+='<div class="data '+f+'">',e+='<div class="label">'+f+"</div>",e+='<div class="value">'+(l[f]?l[f](c[j[f]]):c[j[f]])+"</div>",e+="</div>";e+='</div><div class="company-arrow"></div>',t.html(e).show()}function A(a,b,d){var e=F500.names[b.i],f=Math.max(e.length/4,3),g=F500.values[b.i],h=k[i],j=k[a],l,m,n;u.save(),u.strokeStyle=c,u.lineWidth="2.5",u.beginPath();for(n=0;n<g.length;n++)l=g[n][h],m=d*g[n][j]+(1-d)*(g[n].previous||g[n][b.i]),u.moveTo(l-f,m),u.lineTo(l+f,m);u.moveTo(g[0][h],g[0][j]),u.closePath(),u.stroke(),u.restore(),C(b.i,b.j,d)}function z(a,b,c,d){var e=k[i],f=k[a],g=F500.values,h=g.length,j,l,m,n;for(m=0;m<h;m++){l=g[m],j=l.length;if(d){for(n=0;n<j;n++)if(Math.abs(l[n][e]-b)<7&&l[n][f]==c)return{i:m,j:n}}else for(n=0;n<j;n++)if(Math.abs(l[n][e]-b)<7&&Math.abs(l[n][f]-c)<1)return{i:m,j:n}}}function y(a,b){var c=k[i],d=k[a],e=F500.names,f=F500.values,g=f.length,h,j,l,o,p,q,r;u.clearRect(0,0,m,n),u.beginPath();for(o=0;o<g;o++){j=f[o],h=j.length,l=e[o].length/4;for(p=0;p<h;p++)q=j[p][c],r=b*j[p][d]+(1-b)*(j[p].previous||j[p][d])-.5,u.moveTo(q-l,r),u.lineTo(q+l,r),j[p].previous=r}u.closePath(),u.stroke(),v!==null&&A(a,v,b)}function x(a){return a>1e3?"$"+Math.round(a/100)/10+"b":"$"+Math.round(10*a)/10+"m"}var a="#chart",b="rgba(72,99,160,.8)",b="rgba(72,72,72,.8)",b="rgba(72,72,72,.3)",b="rgba(181,192,217,1)",c="rgba(200,30,30,1)",d="rank",e="profit",f="iProfit",g="revenue",h="iRevenue",i="year",j={year:0,rank:1,revenue:2,profit:3},k={year:0,rank:1,revenue:4,iRevenue:5,profit:6,iProfit:7},l={year:function(a){return Math.round((a+.5)*57/800+1954)},revenue:x,profit:x},m=800,n=502,o=1954,p=2010,q=0,r=500,s=$(a).append("<canvas></canvas>").find("canvas"),t=$(".company"),u=s[0].getContext("2d"),v=null,w=d;D(),setTimeout(function(){F()},10)})()