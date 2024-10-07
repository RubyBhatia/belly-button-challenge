# belly-button-challenge
Challenge-14
1. Updated JSON URL: Changed the data source to https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.
   ![Screenshot 2024-10-07 140518](https://github.com/user-attachments/assets/ddde45b1-7163-443a-88a3-5b6a6cd16263)

2.. Bar Chart Adjustments:
   Labels: Used otu_ids for the y-axis labels.
   Values: Used sample_values for the bar lengths.
   Hovertext: Used otu_labels for hover information.
4. Bubble Chart Adjustments:
   X-axis: otu_ids
   Y-axis: sample_values
   Marker Size: sample_values
   Marker Color: otu_ids
   Text: otu_labels
5. Metadata Display: Updated to loop through each key-value pair and display them in the #sample-metadata panel.
6. Dropdown Menu: Ensured that selecting a new sample updates all the charts and metadata accordingly.

