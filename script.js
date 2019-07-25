let data = {
  "url": "https://www.google.com",
  data: 'no data',
}

let methods = {
  getData(){
    console.log(data.url);
    data.data = 'loading';

    $.post('/getdata', {"url": data.url.toLowerCase()}, result => {
      console.log(result);
      data.data = JSON.parse(result);
      setTimeout(function(){
        methods.chart();
      }, 100);
    });
  },
  random(min, max){
    return Math.floor(Math.random() * max) + min;
  },
  chart(){
    const ctx = document.getElementById('chart').getContext('2d');
    bgColor = [];
    borderColor = [];
    function rand(){
      return methods.random(0, 250);
    }
    Object.keys(data.data.tags).forEach(tag => {
      c = [rand(), rand(), rand()];
      bgColor.push(`rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.2)`);
      borderColor.push(`rgba(${c[0]+5}, ${c[1]+5}, ${c[2]+5}, 1)`);
    });
    console.log(bgColor, borderColor);
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data.data.tags),
            datasets: [{
                label: 'Number of Tags',
                data: Object.values(data.data.tags),
                backgroundColor: bgColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  },
  goBack(){
    data.url = "";
    data.data = "no data";
  },
}

Vue.use(VueMaterial.default);

Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  data: data,
  methods: methods
});
