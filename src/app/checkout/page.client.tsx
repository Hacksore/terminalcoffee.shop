"use client";

import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Address {
  id: string;
  name: string;
  street1: string;
  street2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
}

interface Card {
  id: string;
  last4: string;
  brand: string;
  exp_month: number;
  exp_year: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showCardFields, setShowCardFields] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    addressId: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addressesResponse, cardsResponse] = await Promise.all([
          fetch('/api/terminal/address/list'),
          fetch('/api/terminal/card/list')
        ]);

        const [addressesData, cardsData] = await Promise.all([
          addressesResponse.json(),
          cardsResponse.json()
        ]);

        if (addressesData.data && addressesData.data.length > 0) {
          setAddresses(addressesData.data);
          // Pre-fill the form with the first address
          const firstAddress = addressesData.data[0];
          setFormData(prev => ({
            ...prev,
            name: firstAddress.name,
            addressId: firstAddress.id,
          }));
          setSelectedAddress(firstAddress.id);
        }

        if (cardsData.data && cardsData.data.length > 0) {
          setCards(cardsData.data);
          // Pre-fill the form with the first card
          const firstCard = cardsData.data[0];
          setFormData(prev => ({
            ...prev,
            cardId: firstCard.id,
          }));
          setSelectedCard(firstCard.id);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoadingAddresses(false);
        setIsLoadingCards(false);
      }
    };

    fetchData();
  }, []);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address.id);
    setShowAddressFields(false);
    setFormData(prev => ({
      ...prev,
      name: address.name,
      addressId: address.id,
      // Clear the address fields since we're using a saved address
      address: "",
      city: "",
      state: "",
      zipCode: "",
    }));
  };

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card.id);
    setShowCardFields(false);
    setFormData(prev => ({
      ...prev,
      cardId: card.id,
      // Clear the card fields since we're using a saved card
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    }));
  };

  const handleUseDifferentAddress = () => {
    setSelectedAddress(null);
    setShowAddressFields(true);
    setFormData(prev => ({
      ...prev,
      name: "",
      addressId: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    }));
  };

  const handleUseDifferentCard = () => {
    setSelectedCard(null);
    setShowCardFields(true);
    setFormData(prev => ({
      ...prev,
      cardId: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    }));
  };

  const total = items.reduce((sum, item) => {
    if (!item.selectedVariant) return sum;
    return sum + item.selectedVariant.price * item.quantity;
  }, 0);

  const isFormValid = () => {
    // If we have a saved address, we don't need email validation
    if (formData.addressId) {
      // Just check if we have either a saved card or all card fields
      return Boolean(formData.cardId) || (
        formData.cardNumber && 
        formData.expiryDate && 
        formData.cvv
      );
    }

    // If we're using a custom address, we need email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(formData.email);
    
    // Check if we have all address fields
    const hasValidAddress = (
      formData.name && 
      formData.address && 
      formData.city && 
      formData.state && 
      formData.zipCode
    );

    // Check if we have either a saved card or all card fields
    const hasValidCard = Boolean(formData.cardId) || (
      formData.cardNumber && 
      formData.expiryDate && 
      formData.cvv
    );

    console.log('Validation:', {
      email: formData.email,
      hasValidEmail,
      addressId: formData.addressId,
      hasValidAddress,
      cardId: formData.cardId,
      hasValidCard,
      isValid: hasValidEmail && hasValidAddress && hasValidCard
    });

    return hasValidEmail && hasValidAddress && hasValidCard;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically:
    // 1. Validate the form data
    // 2. Process the payment
    // 3. Create the order
    // 4. Clear the cart
    // 5. Redirect to a success page

    const checkoutData = {
      ...formData,
      // Only include address fields if we're not using a saved address
      ...(formData.addressId ? {} : {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      }),
    };

    console.log("Form submitted", checkoutData);

    // For now, we'll just clear the cart and redirect
    // clearCart();
    // router.push("/");
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="bg-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.selectedVariant && (
                    <p className="text-sm text-zinc-400">
                      {item.selectedVariant.name} x {item.quantity}
                    </p>
                  )}
                </div>
                <p className="font-medium">
                  $
                  {(
                    ((item.selectedVariant?.price || 0) * item.quantity) /
                    100
                  ).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t border-zinc-700 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Shipping Information</h2>
            
            {isLoadingAddresses ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : addresses.length > 0 ? (
              <div className="space-y-2">
                <Label>Saved Addresses</Label>
                <div className="space-y-2">
                  {addresses.map((address) => (
                    <button
                      type="button"
                      key={address.id}
                      className={`w-full text-left p-4 rounded-lg border ${
                        selectedAddress === address.id
                          ? 'border-primary bg-primary/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <p className="font-medium">{address.name}</p>
                      <p>{address.street1}</p>
                      <p>
                        {address.city}, {address.province} {address.zip}
                      </p>
                    </button>
                  ))}
                </div>
                {selectedAddress && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleUseDifferentAddress}
                  >
                    Use Different Address
                  </Button>
                )}
              </div>
            ) : null}

            {(!selectedAddress || showAddressFields) && !isLoadingAddresses && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Payment Information</h2>
            
            {isLoadingCards ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : cards.length > 0 ? (
              <div className="space-y-2">
                <Label>Saved Cards</Label>
                <div className="space-y-2">
                  {cards.map((card) => (
                    <button
                      type="button"
                      key={card.id}
                      className={`w-full text-left p-4 rounded-lg border ${
                        selectedCard === card.id
                          ? 'border-primary bg-primary/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                      onClick={() => handleCardSelect(card)}
                    >
                      <p className="font-medium">
                        {card.brand} ending in {card.last4}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Expires {card.exp_month}/{card.exp_year}
                      </p>
                    </button>
                  ))}
                </div>
                {selectedCard && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleUseDifferentCard}
                  >
                    Use Different Card
                  </Button>
                )}
              </div>
            ) : null}

            {(!selectedCard || showCardFields) && !isLoadingCards && (
              <>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-500">
                    We do not store your credit card information but yeah this is kinda sus so maybe someone can integrate{" "}
                    <a
                      href="https://www.terminal.shop/pay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-red-400"
                    >
                      https://www.terminal.shop/pay
                    </a>{" "}
                    at some point
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      required
                      value={formData.expiryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expiryDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      required
                      value={formData.cvv}
                      onChange={(e) =>
                        setFormData({ ...formData, cvv: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!isFormValid()}
          >
            Place Order
          </Button>
        </form>
      </div>
    </div>
  );
}
