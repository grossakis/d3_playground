let mSvg = d3.select('#main-svg');

let rand = (min,max)=>parseInt((Math.random()*(max+1))+min);

mSvg.on('mousemove',()=>{

    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;

    let x = parseFloat(((mouseX/winWidth)*100).toFixed(0));
    let y = parseFloat(((mouseY/winHeight)*100).toFixed(0));

    // mSvg.style('background-color', ()=>'hsl(173, '+x+'%, '+y/2+'%)');


    // if(mSvg._groups[0][0].children.length < 150){

        mSvg.append('circle')
            .attr('cx',x)
            .attr('cy',y)
            .attr('r',3)
            .style('fill', 'none')
            .style('stroke-width', 0.1)
            .style('stroke', ()=>'hsl('+((359*x)/100).toFixed(0)+', '+x+'%, 50%)')
            .transition()
            .duration(2000)
            .attr("r", 50)
            // .style("opacity", 0)
            .style('stroke-width', 1)
            // .attr('cx',(d,i,n)=>d3.select(n[i]).attr('cy')+0.001)
            .attr('cx',(d,i,n)=>{
                return (Math.random()*100)>50? x+(Math.random()*100) : x-(Math.random()*100)
            })
            .attr('cy',(d,i,n)=>{
                return (Math.random()*100)>50? y+(Math.random()*100) : y-(Math.random()*100)
            })
            .remove()
    // }

    



    console.log(rand(0,100));
    // console.log('Y'+(y/w)+'%);
    // console.log(x.toFixed(2)+'%');
});