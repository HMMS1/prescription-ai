import { useState } from "react";
import api from "./api"; // استيراد الـ api الموحد اللي عدلناه

import "./AddPharmacy.css";

const AddPharmacy = () => {

  const [formData, setFormData] = useState({
    name: "",
    owner_name: "",
    phone: "",
    whatsapp: "",
    address: "",
    username: "",
    email: "",
    password: "",
    is_contracted: true,
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // بنستخدم api الموحد، فمش محتاجين نبعت الـ full URL ولا الـ headers يدوياً
      await api.post("/pharmacies/", formData);

      alert(
        "Pharmacy Added Successfully"
      );

      setFormData({
        name: "",
        owner_name: "",
        phone: "",
        whatsapp: "",
        address: "",
        username: "",
        email: "",
        password: "",
        is_contracted: true,
      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.error ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="add-pharmacy-page">

      <div className="add-pharmacy-card">

        <div className="header-section">

          <h2>
            Add Pharmacy
          </h2>

          <p>
            Create pharmacy account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>
              Pharmacy Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter pharmacy name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>
              Owner Name
            </label>

            <input
              type="text"
              name="owner_name"
              placeholder="Enter owner name"
              value={formData.owner_name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="row">

            <div className="input-group">

              <label>
                Phone
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>
                Whatsapp
              </label>

              <input
                type="text"
                name="whatsapp"
                placeholder="Whatsapp number"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="input-group">

            <label>
              Address
            </label>

            <textarea
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
            />

          </div>

          <div className="section-title">
            Account Information
          </div>

          <div className="row">

            <div className="input-group">

              <label>
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="Create username"
                value={formData.username}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Optional"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <div className="checkbox-wrapper">

            <input
              type="checkbox"
              name="is_contracted"
              checked={
                formData.is_contracted
              }
              onChange={handleChange}
            />

            <span>
              Contracted Pharmacy
            </span>

          </div>

          <button
            type="submit"
            disabled={loading}
          >

            {
              loading
                ? "Adding..."
                : "Add Pharmacy"
            }

          </button>

        </form>

      </div>

    </div>
  );
};

export default AddPharmacy;
