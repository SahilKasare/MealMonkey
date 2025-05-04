import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EditProductForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    foodType: initialData.foodType || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="bg-orange-500">
        <CardTitle className="text-white text-xl font-semibold">Edit Product</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Grilled Sandwich"
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-gray-700">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="100"
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="foodType" className="text-gray-700">Food Type</Label>
            <Select 
              value={formData.foodType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, foodType: value }))}
            >
              <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                <SelectValue placeholder="Non-Veg" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="veg">Veg</SelectItem>
                <SelectItem value="non-veg">Non-Veg</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProductForm;