function buildMetadata(sample) {
  var sampleURL = `/metadata/${sample}`
  Plotly.d3.json(sampleURL, function (error, response) {
    if (error) return console.log(error);
    console.log(response);
    var data = response;
    console.log(data)
    var metaList = document.getElementById('sample-metadata');
    metaList.innerHTML = '';
    var metaItems = [["sample", "sample"], ["Ethnicity", "ETHNICITY"], ["Gender", "GENDER"], ["Age", "AGE"],
    ["Weekly Wash Frequency", "WFREQ"], ["Type (Innie/Outie)", "BBTYPE"], ["LOCATION", "LOCATION"]];
    console.log(metaList)
    for (i = 0; i < metaItems.length; i++) {
      var newLi = document.createElement('li');
      newLi.innerHTML = `${metaItems[i][0]}: ${data[metaItems[i][1]]}`;
      metaList.appendChild(newLi);
    };
  });
};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var sampleURL = `/samples/${sample}`
  Plotly.d3.json(sampleURL, function (error, response) {
    if (error) return console.log(error);
    var otuIDs = response.otu_ids.slice(0,10);
    // var otuIDs = otuIDs1.slice(0,10);
    var sampleValues = response.sample_values.slice(0,10);
    var otuDescriptions = response.otu_labels.slice(0,10);
    var label = response.otu_ids.slice(0,10);
    var value = response.sample_values.slice(0,10);
    var hover = response.otu_labels.slice(0,10);
    var trace = {
      x: otuIDs,
      y: sampleValues,
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: "Rainbow"
      },
      text: otuDescriptions,
    };
    var trace2 = {
      values: value,
      labels: label,
      type: "pie",
      text: hover,
      hoverinfo: "label+text+value+percent",
      textinfo: "percent"
    };
    var layout = {
      margin: {
        l: 10,
        r: 10,
        b: 10,
        t: 10,
        pad: 4
      }
    }
    var data = [trace]
    var data2 = [trace2]
    Plotly.newPlot("bubble", data)
    Plotly.newPlot("pie", data2,layout)
  });
  // @TODO: Build a Bubble Chart using the sample data

  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

