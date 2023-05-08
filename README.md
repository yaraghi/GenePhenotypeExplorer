## Development Process

1. **First step**: Implemented the `convertJson` function to transform the original JSON data into a more suitable format for the heatmap visualization.
2. **Second step**: After converting the JSON data, extracted unique genes and phenotypes, storing them in Redux along with the transformed data for faster filtering.
3. **Third step**: Added the converted data to the heatmap. Due to the large amount of initial data, the heatmap was slow to render, so a default filter was implemented to display only the top 10% of genes with the highest phenotype count, improving performance.
4. **Fourth step**: Implemented filters and adjusted the design example to provide better user access, allowing users to clear filters and select one or multiple filters.

## Installation and Setup
git clone <repository-url>
cd <project-name>
npm install
npm start

