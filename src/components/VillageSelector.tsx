import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Village {
  id: string;
  name: string;
}

interface VillageSelectorProps {
  districtId: string;
  onSelect: (villageId: string) => void;
}

const VillageSelector: React.FC<VillageSelectorProps> = ({ districtId, onSelect }) => {
  const [village, setVillage] = useState<Village[]>([]);
  const [selectedVillage, setSelectedVillage] = useState<string>('');

  useEffect(() => {
    const fetchVillage = async () => {
      if (districtId) {
        const response = await axios.get(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
        );
        setVillage(response.data);
      }
    };

    fetchVillage();
  }, [districtId]);

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVillage(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div className="form-group">
      <label>Pilih Kelurahan</label>
      <select className="form-control" value={selectedVillage} onChange={handleVillageChange}>
        <option value="">Kabupaten/Kota</option>
        {village.map((village: Village) => (
          <option key={village.id} value={village.id}>
            {village.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VillageSelector;