import React, { useState, useEffect } from 'react';
import { getRegencies } from '../services/api';

interface Regency {
  id: string;
  name: string;
}

interface RegencySelectorProps {
  provinceId: string;
  onSelect: (regencyId: string) => void;
}

const RegencySelector: React.FC<RegencySelectorProps> = ({ provinceId, onSelect }) => {
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [selectedRegency, setSelectedRegency] = useState<string>('');

  useEffect(() => {
    const fetchRegencies = async () => {
      if (provinceId) {
        const response = await getRegencies(provinceId);
        setRegencies(response.data);
      }
    };

    fetchRegencies();
  }, [provinceId]);

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegency(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div className="form-group">
      <label>Pilih Kabupaten/Kota:</label>
      <select className="form-control" value={selectedRegency} onChange={handleRegencyChange}>
        <option value="">Kabupaten/Kota</option>
        {regencies.map((regency: Regency) => (
          <option key={regency.id} value={regency.id}>
            {regency.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegencySelector;