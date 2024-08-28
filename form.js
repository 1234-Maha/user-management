import { useState, useEffect } from 'react';
import config from '../config';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(user || { name: '', email: '', linkedin: '', gender: '', address: { line1: '', line2: '', state: '', city: '', pin: '' } });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setStates(data.states);
        setCities(data.cities[formData.address.state] || []);
      });
  }, [formData.address.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.length < config.nameMinLength || formData.name.length > config.nameMaxLength) {
      alert(`Name must be between ${config.nameMinLength} and ${config.nameMaxLength} characters.`);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Invalid email address.');
      return;
    }
    if (!/^https?:\/\/\S+$/.test(formData.linkedin)) {
      alert('Invalid LinkedIn URL.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        LinkedIn URL:
        <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} required />
      </label>
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <fieldset>
        <legend>Address:</legend>
        <label>
          Line 1:
          <input type="text" name="line1" value={formData.address.line1} onChange={handleAddressChange} required />
        </label>
        <label>
          Line 2:
          <input type="text" name="line2" value={formData.address.line2} onChange={handleAddressChange} />
        </label>
        <label>
          State:
          <select name="state" value={formData.address.state} onChange={handleAddressChange} required>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
        </label>
        <label>
          City:
          <select name="city" value={formData.address.city} onChange={handleAddressChange} required>
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </label>
        <label>
          PIN:
          <input type="text" name="pin" value={formData.address.pin} onChange={handleAddressChange} required />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UserForm;
