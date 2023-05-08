import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { setPhenotypes } from '../redux/slice/phenotypeSlice';
import { setGenes } from '../redux/slice/genesSlice';
import { save } from '../redux/slice/heatMapDataSlice';
import { RootState } from '../redux/store';
const json: any = require('./../gene_phenotypes.json');
type InputData = {
  marker_accession_id: string;
  marker_symbol: string;
  top_level_phenotype_term: {
    top_level_mp_term_id: string;
    top_level_mp_term_name: string;
  };
  procedures: string[];
  phenotype_terms: { mp_term_id: string; mp_term_name: string }[];
  phenotype_count: number;
};

type OutputData = {
  id: string;
  data: { x: string; y: number }[];
};

type HeatMapData = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
};

const HeatMapComponent = () => {
  const selectedGenes = useSelector((state: RootState) => state.gene.selectedGenes);
  const selectedPhenotypes = useSelector((state: RootState) => state.phenotype.selectedPhenotypes);
  const heatMapData = useSelector((state: RootState) => state.heatMapData);
  const topPercentage = useSelector((state: RootState) => state.percentile);

  const dispatch = useDispatch();
  const [result, setResult] = useState<HeatMapData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);



  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      filterPhenotypesBySelectedGenes(heatMapData)
    }
  }, [selectedGenes, selectedPhenotypes, topPercentage]);

  function convertAndSaveData(input: InputData[]) {
    const convertedData = convertJson(input);
    dispatch(save(convertedData));
  }


  function convertJson(input: InputData[]): OutputData[] {
    const genePhenotypeMap: Map<string, OutputData> = new Map();
    const uniquePhenotypeSystems: string[] = [];
    const uniqueGenes: string[] = [];
    for (const entry of input) {
      const geneSymbol = entry.marker_symbol;
      const phenotypeSystemName = entry.top_level_phenotype_term.top_level_mp_term_name;
      const phenotypeCount = entry.phenotype_count;
      // Collect unique phenotype systems
      if (!uniquePhenotypeSystems.includes(phenotypeSystemName)) {
        uniquePhenotypeSystems.push(phenotypeSystemName);
      }
      if (genePhenotypeMap.has(geneSymbol)) {
        const geneData = genePhenotypeMap.get(geneSymbol);
        const existingPhenotype = geneData!.data.find(
          (item) => item.x === phenotypeSystemName
        );

        if (existingPhenotype) {
          existingPhenotype.y += phenotypeCount;
        } else {
          geneData!.data.push({ x: phenotypeSystemName, y: phenotypeCount });
        }
      } else {
        uniqueGenes.push(geneSymbol);
        genePhenotypeMap.set(geneSymbol, {
          id: geneSymbol,
          data: [{ x: phenotypeSystemName, y: phenotypeCount }],
        });
      }
    }
    const result = Array.from(genePhenotypeMap.values());
    dispatch(setPhenotypes(uniquePhenotypeSystems));
    dispatch(setGenes(uniqueGenes));
    dispatch(save(result));
    filterPhenotypesBySelectedGenes(result);
    return result;
  }


  async function filterPhenotypesBySelectedGenes(phenotypes: HeatMapData[]) {
    const filteredByGene = selectedGenes.length > 0 ? phenotypes.filter(phenotype => selectedGenes.includes(phenotype.id)) : phenotypes;
    const filteredByPhenotype = selectedPhenotypes.length > 0 ? filteredByGene.filter((item) => { return item.data.some(({ x }) => selectedPhenotypes.includes(x)) }) : filteredByGene;
    const phenotypeCounts = filteredByPhenotype.map((item) => {
      return {
        id: item.id,
        totalPhenotypeCount: item.data.reduce((sum, { y }) => sum + y, 0),
      };
    });
    const sortedCounts = phenotypeCounts.sort((a, b) => b.totalPhenotypeCount - a.totalPhenotypeCount);
    const topPercentileIndex = Math.ceil(sortedCounts.length * (topPercentage.percentile / 100));
    const topPercentileIds = new Set(sortedCounts.slice(0, topPercentileIndex).map(({ id }) => id));
    const filteredByTopPercentage = filteredByPhenotype.filter((item) => topPercentileIds.has(item.id));
    setResult(filteredByTopPercentage)
    setLoading(false)

  }

  async function fetchData() {
    //for CORS error with hhtps request on github i use static file for this step
    convertAndSaveData(json);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="HeatMap">
      {loading && <h1>Loading...</h1>}
      {result.length ?
        <ResponsiveHeatMap
          data={result}
          margin={{ top: 130, right: 90, bottom: 60, left: 90 }}
          yOuterPadding={1}
          enableGridX={true}
          axisTop={{
            tickSize: 0,
            tickPadding: 0,
            tickRotation: -28,
            legend: '',
            legendOffset: 2
          }}
          colors={{
            type: 'quantize',
            scheme: 'green_blue',
            minValue: 0,
            maxValue: 50,
            divergeAt: 1,
          }}
          emptyColor="#949494"
          borderRadius={3}
          inactiveOpacity={1}
          renderWrapper
          annotations={[]}
          hoverTarget="cell"
          animate={false}
        /> : ''}
    </div>
  );
};

export default HeatMapComponent;
