// App.js
import React, { useState } from 'react';
import ProvinceSelector from './ProvinceSelector';
import RegencySelector from './RegencySelector';
import DistrictSelector from './DistrictSelector';
import VillageSelector from './VillageSelector';
import '../styles/main.css';

const RegionSelector: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedRegency, setSelectedRegency] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [resetSelectors, setResetSelectors] = useState(false);

  const handleProvinceSelect = (provinceId: string) => {
    setSelectedProvince(provinceId);
  };

  const handleResetSelectors = () => {
    setSelectedRegency('');
    setSelectedDistrict('');
    setResetSelectors(!resetSelectors);
  };

  return (
    <div className="App">
      <h1>Data Wilayah Indonesia</h1>
      <ProvinceSelector onSelect={handleProvinceSelect} onReset={handleResetSelectors} />
      {selectedProvince && (
        <RegencySelector provinceId={selectedProvince} onSelect={setSelectedRegency} />
      )}
      {selectedRegency && (
        <DistrictSelector regencyId={selectedRegency} onSelect={setSelectedDistrict} />
      )}
      {selectedDistrict && <VillageSelector districtId={selectedDistrict} onSelect={() => {}} />}
    </div>
  );
};

export default RegionSelector;
