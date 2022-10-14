import { useState } from "react";
import { TOKEN } from "../../local.env";

const Destinoinput = (initialValue: string) => {
  const [value, setvalue] = useState(initialValue);
  const [suggest, setsuggest] = useState([]);

  const handleChange = async (e: any) => {
    try {
      setvalue(e.target.value);
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${TOKEN}&autocomplete=true&types=address&country=cl&language=es`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setsuggest(data?.features);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    value,
    onInput: handleChange,
    setvalue,
    suggest,
    setsuggest,
  };
};

export default Destinoinput;
