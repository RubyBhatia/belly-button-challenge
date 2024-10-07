// Endpoint URL (Updated as per assignment)
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Init Dashboard Load function
function init() {

    // Fetch the JSON
    d3.json(url).then(function(data){

        // Select the dropdown menu
        let dd = d3.select("#selDataset"); // Changed from d3.selectAll to d3.select for a single element

        // Append new list items for all 'names'
        data.names.forEach(name => {
            dd.append("option").attr("value", name).text(name);
        });

        // Store the first ID from dropdown in a variable
        let firstSample = data.names[0];

        // Use the functions to generate the plots
        genBarChart(firstSample);
        genDemographic(firstSample);
        genBubbleChart(firstSample);
    });

};

// BarChart generator function (Modified as per assignment)
function genBarChart(sample){

    d3.json(url).then(function(data){
        
        // Assign samples data to variable
        let samples_data = data.samples;

        // Filter the data for the sample
        let sample_array = samples_data.filter(sd => sd.id === sample);

        // Pull data from the array
        let sampleData = sample_array[0];

        // Transform data
        let transData = sampleData.otu_ids.map((otu_id, index) => {
            return {
                otu: `OTU ${otu_id}`,
                label: sampleData.otu_labels[index],
                otuVal: sampleData.sample_values[index]
            };
        });

        // Order by otuVal Descending
        transData.sort((a, b) => b.otuVal - a.otuVal);

        // Slice first 10 values
        let sliced = transData.slice(0,10);

        // Reverse the array to accommodate Plotly's defaults
        let reverseSlice = sliced.reverse();    
        
        // Map the values to the trace object
        let trace1 = {
            x: reverseSlice.map(val => val.otuVal),
            y: reverseSlice.map(val => val.otu),
            text: reverseSlice.map(val => val.label),
            type: "bar",
            orientation: "h"
        };

        // Create a data array
        let c_data = [trace1];

        // Create chart title and other layout features
        let layout = {
            title: "Top 10 OTUs Found",
            margin: {
                l: 100,
                r: 50,
                t: 50,
                b: 50
            }
        };

        // Generate plot
        Plotly.newPlot("bar", c_data, layout);
    });
};

// DemoGraphic function generator (Modified as per assignment)
function genDemographic(sample){
    d3.json(url).then(function(data){

        // Assign metadata to a variable
        let metadata = data.metadata;

        // Filter the metadata to the sample
        let meta_array = metadata.filter(md => md.id === parseInt(sample));

        // Get data from array
        let meta_data = meta_array[0];

        // Select the sample-metadata div in the demographic panel
        let div = d3.select("#sample-metadata");

        // Clear existing metadata
        div.html("");

        // Loop through metadata and append to div
        Object.entries(meta_data).forEach(([key, value]) => {
            div.append("p").html(`<strong>${key}:</strong> ${value}`);
        });

    });
};

// BubbleChart function generator (Modified as per assignment)
function genBubbleChart(sample){
    d3.json(url).then(function(data){

        // Assign samples data to variable
        let samples_data = data.samples;

        // Filter the data for the sample
        let sample_array = samples_data.filter(sd => sd.id === sample);

        // Pull data from the array
        let sampleData = sample_array[0];

        // Create trace for bubble chart
        let bubTrace = {
            x: sampleData.otu_ids,
            y: sampleData.sample_values,
            text: sampleData.otu_labels,
            mode: 'markers',
            marker: {
                size: sampleData.sample_values,
                color: sampleData.otu_ids,
                colorscale: "Earth"
            }
        };

        // Create data array
        let bubData = [bubTrace];

        // Create layout object
        let layout = {
            title: "OTU ID vs. Sample Values",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" },
            hovermode: "closest",
            margin: { t: 50, l: 50, r: 50, b: 50 }
        };

        // Generate plot
        Plotly.newPlot("bubble", bubData, layout);
    });
};

// Create an Event to run when the dropdown is changed
function optionChanged(newSample){
    console.log(`Subject ID changed: ${newSample}`);
    genBarChart(newSample);
    genBubbleChart(newSample);
    genDemographic(newSample);
    console.log("Charts Updated!");
};

// Initialize the dashboard
init();
