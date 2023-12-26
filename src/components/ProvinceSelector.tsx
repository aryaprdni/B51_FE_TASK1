// ProvinceSelector.tsx
import React, { useState, useEffect } from 'react';
import { getProvinces } from '../services/api';

interface Province {
  id: string;
  name: string;
}

interface ProvinceSelectorProps {
  onSelect: (provinceId: string) => void;
  onReset?: () => void; // Make onReset optional
}

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({ onSelect, onReset }) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await getProvinces();
      setProvinces(response.data);
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedProvince = e.target.value;

    // Reset other selectors when province changes
    onReset?.();

    setSelectedProvince(newSelectedProvince);
    onSelect(newSelectedProvince);
  };

  return (
    <div className="form-group">
      <label>Pilih Provinsi:</label>
      <select className="form-control" value={selectedProvince} onChange={handleProvinceChange}>
        <option value="">Provinsi</option>
        {provinces.map((province: Province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceSelector;
