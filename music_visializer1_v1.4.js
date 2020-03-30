window.addEventListener('load', function () {


    let svgContainerAdjust = () =>{
        console.log('dirty blumpkin')
        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
        if(winWidth >= winHeight){
            d3.select('#main-container').style('height', winHeight+'px').style('width', winHeight+'px');
        }else{
            d3.select('#main-container').style('height', winWidth+'px').style('width', winWidth+'px');
        }
    }

    svgContainerAdjust();

    window.onresize = svgContainerAdjust;

    

    input.onchange = function(e){
        var sound = document.getElementById('audioElement');
        sound.src = URL.createObjectURL(this.files[0]);
        // not really needed in this exact case, but since it is really important in other cases,
        // don't forget to revoke the blobURI when you don't need it
        sound.onend = function(e) {
          URL.revokeObjectURL(this.src);
        }


        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var audioElement = document.getElementById('audioElement');
        var audioSrc = audioCtx.createMediaElementSource(audioElement);
        var analyser = audioCtx.createAnalyser();

        // Bind our analyser to the media element source.
        audioSrc.connect(analyser);
        audioSrc.connect(audioCtx.destination);

        var frequencyData = new Uint8Array(100);

        // var svgHeight = '800';
        // var svgWidth = '1200';
        // var barPadding = '1';

        // function createSvg(parent, height, width) {
        // return d3.select(parent).append('svg').attr('height', height).attr('width', width);
        // }


        let mSvg = d3.select('#main-svg');


        // var svg = createSvg('body', svgHeight, svgWidth);

        let x=350
        let y=350;

        // mSvg.on('mousemove',()=>{
        //     // console.log(frequencyData);
        //     let mouseX = event.clientX;
        //     let mouseY = event.clientY;
        //     let winWidth = window.innerWidth;
        //     let winHeight = window.innerHeight;

    
        //     x = parseInt(((mouseX/winWidth)*500));
        //     y = parseInt(((mouseY/winHeight)*500));
            
        // })

        
        
        

        // Create our initial D3 chart.
        mSvg.selectAll('circle')
        .data(frequencyData)
        .enter()
        .append('circle')
        .attr('stroke-width',5)
        .attr('cx', (d, i) => {
            // return (svgWidth / 2);
            return x
        })
        .attr('cy', (d, i) => {
            // return i * (svgWidth / frequencyData.length);
            return y
        })
        .attr('r', 0);
        // .attr('fill', (d, i) => 'rgb(0, 0, ' + d + ')');

        // Continuously loop and update chart with frequency data.
        // let runCount = svgWidth/2;
        // let runIncFlag = true;

        function renderChart() {

            

            // if(runCount == svgWidth){
            //     runIncFlag=false
            // }else if(runCount == 0){
            //     runIncFlag=true
            // }


            // if(runIncFlag){
            //     runCount++
            // }else{
            //     runCount--
            // }

            


            requestAnimationFrame(renderChart);
        
            // Copy frequency data to frequencyData array.
            analyser.getByteFrequencyData(frequencyData);
        
            // Update d3 chart with new data.
            mSvg.selectAll('circle')
            .data(frequencyData)
            // .attr('cy', function(d) {
            //     // return svgHeight/2;
            //     return y;
            // })
            // .attr('cx', function(d) {
            //     // return runCount;
            //     return x;
            // })
            .attr('r', function(d) {
                return d;
            })
            .attr('fill', (d, i) => 'rgb(0, ' + d + ', 0)')
            // .attr('fill', (d, i) => 'hsl(0, 0, 0)')
            .attr('stroke', function(d) {
                return 'rgb(0, 0, ' + d + ')';
            });
            // .attr('stroke', function(d) {
            //     return 'rgb(0, 0, ' + d + ')';
            // });
        }
        
        // Run the loop
        renderChart();


      }



    
    
  })




