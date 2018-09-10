
var label = response.otu_ids;
var value = response.sample_values;
var hover = response.otu_labels;
var trace = {
      values: values,
      labels: labels,
      type: "pie",
      text: hovers,
      hoverinfo: "label+text+value+percent",
      textinfo: "percent"
    };