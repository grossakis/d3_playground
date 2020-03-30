window.addEventListener('load', function () {

    

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

        var frequencyData = new Uint8Array(200);

        var svgHeight = '800';
        var svgWidth = '1200';
        var barPadding = '1';

        function createSvg(parent, height, width) {
        return d3.select(parent).append('svg').attr('height', height).attr('width', width);
        }

        var svg = createSvg('body', svgHeight, svgWidth);

        let x=1
        let y=1;

        svg.on('mousemove',()=>{
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            let winWidth = window.innerWidth;
            let winHeight = window.innerHeight;

    
            x = parseFloat(((mouseX/winWidth)*svgWidth).toFixed(0));
            y = parseFloat(((mouseY/winHeight)*svgHeight).toFixed(0));
            
        })

        
        
        

        // Create our initial D3 chart.
        svg.selectAll('circle')
        .data(frequencyData)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => {
            // return (svgWidth / 2);
            return x
        })
        .attr('cy', (d, i) => {
            // return i * (svgWidth / frequencyData.length);
            return y
        })
        .attr('r', svgWidth);

        // Continuously loop and update chart with frequency data.
        let runCount = svgWidth/2;
        let runIncFlag = true;

        function renderChart() {

            

            if(runCount == svgWidth){
                runIncFlag=false
            }else if(runCount == 0){
                runIncFlag=true
            }


            if(runIncFlag){
                runCount++
            }else{
                runCount--
            }

            


            requestAnimationFrame(renderChart);
        
            // Copy frequency data to frequencyData array.
            analyser.getByteFrequencyData(frequencyData);
        
            // Update d3 chart with new data.
            svg.selectAll('circle')
            .data(frequencyData)
            .attr('cy', function(d) {
                // return svgHeight/2;
                return y;
            })
            .attr('cx', function(d) {
                // return runCount;
                return x;
            })
            // .attr('cx', function(d) {
            //     return svgHeight - d;
            // })
            .attr('r', function(d) {
                return d*2;
            })
            .attr('stroke', function(d) {
                return 'rgb(0, 0, ' + d + ')';
            })
            .attr('fill', 'none');
        }
        
        // Run the loop
        renderChart();


      }



    
    
  })




