"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Building2, Check, ChevronsUpDown, Plus, Store, Trash2, Upload, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Image from "next/image"

const cities = [
  { label: "New York", value: "new-york" },
  { label: "Los Angeles", value: "los-angeles" },
  { label: "Chicago", value: "chicago" },
  { label: "Houston", value: "houston" },
  { label: "Phoenix", value: "phoenix" },
  { label: "Philadelphia", value: "philadelphia" },
  { label: "San Antonio", value: "san-antonio" },
  { label: "San Diego", value: "san-diego" },
  { label: "Dallas", value: "dallas" },
  { label: "San Jose", value: "san-jose" },
]

// Define form field types
type FormValues = {
  shopPicture: string
  shopNo: string
  mobileBoss: string
  mobileMiss: string
  mobileManager: string
  mobileFactory: string
  accountType: "expense" | "company" | "supplier" | "shopkeeper"
  shopAddress: string
  city: string
  email: string
  bankAccounts: string[]
}

export default function ShopAccountForm() {
  // Form state
  const [formValues, setFormValues] = useState<FormValues>({
    shopPicture: "",
    shopNo: "",
    mobileBoss: "",
    mobileMiss: "",
    mobileManager: "",
    mobileFactory: "",
    accountType: "shopkeeper",
    shopAddress: "",
    city: "",
    email: "",
    bankAccounts: [""],
  })

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // UI state
  const [bankAccounts, setBankAccounts] = useState<string[]>([""])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [cityOpen, setCityOpen] = useState(false)
  const totalSteps = 3

  // Handle form field changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof FormValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        handleChange("shopPicture", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, ""])
    setFormValues((prev) => ({
      ...prev,
      bankAccounts: [...prev.bankAccounts, ""],
    }))
  }

  const removeBankAccount = (index: number) => {
    if (bankAccounts.length > 1) {
      const updatedAccounts = [...bankAccounts]
      updatedAccounts.splice(index, 1)
      setBankAccounts(updatedAccounts)

      const updatedFormAccounts = [...formValues.bankAccounts]
      updatedFormAccounts.splice(index, 1)
      setFormValues((prev) => ({
        ...prev,
        bankAccounts: updatedFormAccounts,
      }))
    }
  }

  const updateBankAccount = (index: number, value: string) => {
    const updatedAccounts = [...bankAccounts]
    updatedAccounts[index] = value
    setBankAccounts(updatedAccounts)

    const updatedFormAccounts = [...formValues.bankAccounts]
    updatedFormAccounts[index] = value
    setFormValues((prev) => ({
      ...prev,
      bankAccounts: updatedFormAccounts,
    }))
  }

  // Validate form fields
  const validateFields = (fields: (keyof FormValues)[]) => {
    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      // Required field validation
      if (field === "shopNo" && !formValues.shopNo) {
        newErrors.shopNo = "Shop number is required"
      }

      if (field === "mobileMiss" && !formValues.mobileMiss) {
        newErrors.mobileMiss = "Miss mobile number is required"
      }

      if (field === "email") {
        if (!formValues.email) {
          newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
          newErrors.email = "Invalid email address"
        }
      }

      if (field === "city" && !formValues.city) {
        newErrors.city = "City is required"
      }

      if (field === "shopAddress" && !formValues.shopAddress) {
        newErrors.shopAddress = "Shop address is required"
      }

      if (field === "bankAccounts" && (!formValues.bankAccounts.length || !formValues.bankAccounts[0])) {
        newErrors.bankAccounts = "At least one bank account is required"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    let isValid = false

    if (step === 1) {
      isValid = validateFields(["shopNo", "accountType"])
    } else if (step === 2) {
      isValid = validateFields(["mobileMiss", "email", "city", "shopAddress"])
    }

    if (isValid && step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = validateFields(["bankAccounts"])

    if (isValid) {
      console.log("Form submitted:", formValues)
      // Here you would typically send the data to your API
      alert("Form submitted successfully!")
    }
  }

  // Update bankAccounts UI state when formValues.bankAccounts changes
  useEffect(() => {
    setBankAccounts(formValues.bankAccounts)
  }, [formValues.bankAccounts])

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2",
                  step > index + 1
                    ? "bg-green-50 border-green-500 text-green-700"
                    : step === index + 1
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-gray-50 border-gray-200 text-gray-400",
                )}
              >
                {step > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <span className={cn("text-xs mt-2", step === index + 1 ? "text-blue-700 font-medium" : "text-gray-500")}>
                {index === 0 ? "Basic Info" : index === 1 ? "Contact Details" : "Banking Info"}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <form onSubmit={onSubmit}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Shop/Account Registration</h1>
                <p className="text-sm text-gray-600">Create a new shop or account in the system</p>
              </div>
            </div>
          </div>

          <CardContent className="p-0">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="p-6 space-y-6">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
                </div>
                <Separator className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-1">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Shop Picture</Label>
                      <div className="flex flex-col items-center mt-1">
                        <div
                          className={cn(
                            "w-48 h-48 rounded-lg flex items-center justify-center overflow-hidden mb-3",
                            imagePreview
                              ? "border border-gray-200"
                              : "border-2 border-dashed border-gray-300 bg-gray-50",
                          )}
                        >
                          {imagePreview ? (
                            <Image
                              src={imagePreview || "/placeholder.svg"}
                              alt="Shop preview"
                              className="w-full h-full object-cover"
                              fill
                            />
                          ) : (
                            <div className="text-center p-4">
                              <div className="h-12 w-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                <Upload className="h-6 w-6 text-gray-400" />
                              </div>
                              <p className="text-sm text-gray-500">Upload shop image</p>
                              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                          )}
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="shop-picture"
                          onChange={handleImageChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-sm"
                          onClick={() => document.getElementById("shop-picture")?.click()}
                        >
                          {imagePreview ? "Change Image" : "Select Image"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="shopNo" className="text-sm font-medium text-gray-700">
                        Shop Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="shopNo"
                        placeholder="Enter shop number"
                        className="bg-white"
                        value={formValues.shopNo}
                        onChange={(e) => handleChange("shopNo", e.target.value)}
                      />
                      {errors.shopNo && <p className="text-sm text-red-500">{errors.shopNo}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Account Type <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formValues.accountType}
                        onValueChange={(value) => handleChange("accountType", value)}
                        className="grid grid-cols-2 gap-3"
                      >
                        <div
                          className={cn(
                            "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                            formValues.accountType === "expense" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                          )}
                          onClick={() => handleChange("accountType", "expense")}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="expense" id="expense" />
                            <Label htmlFor="expense" className="font-normal cursor-pointer">
                              Expense Account
                            </Label>
                          </div>
                        </div>

                        <div
                          className={cn(
                            "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                            formValues.accountType === "company" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                          )}
                          onClick={() => handleChange("accountType", "company")}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="company" id="company" />
                            <Label htmlFor="company" className="font-normal cursor-pointer">
                              Company Account
                            </Label>
                          </div>
                        </div>

                        <div
                          className={cn(
                            "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                            formValues.accountType === "supplier" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                          )}
                          onClick={() => handleChange("accountType", "supplier")}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="supplier" id="supplier" />
                            <Label htmlFor="supplier" className="font-normal cursor-pointer">
                              Supplier
                            </Label>
                          </div>
                        </div>

                        <div
                          className={cn(
                            "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                            formValues.accountType === "shopkeeper" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                          )}
                          onClick={() => handleChange("accountType", "shopkeeper")}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="shopkeeper" id="shopkeeper" />
                            <Label htmlFor="shopkeeper" className="font-normal cursor-pointer">
                              Shopkeeper
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {step === 2 && (
              <div className="p-6 space-y-6">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
                </div>
                <Separator className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="mobileBoss" className="text-sm font-medium text-gray-700">
                        Boss Mobile Number
                      </Label>
                      <div className="relative">
                        <Input
                          id="mobileBoss"
                          placeholder="Enter boss mobile number"
                          className="bg-white pl-10"
                          value={formValues.mobileBoss}
                          onChange={(e) => handleChange("mobileBoss", e.target.value)}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <User className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobileMiss" className="text-sm font-medium text-gray-700">
                        Miss Mobile Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="mobileMiss"
                          placeholder="Enter miss mobile number"
                          className="bg-white pl-10"
                          value={formValues.mobileMiss}
                          onChange={(e) => handleChange("mobileMiss", e.target.value)}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <User className="h-4 w-4" />
                        </div>
                      </div>
                      {errors.mobileMiss && <p className="text-sm text-red-500">{errors.mobileMiss}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        className="bg-white"
                        value={formValues.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="mobileManager" className="text-sm font-medium text-gray-700">
                        Manager Mobile Number
                      </Label>
                      <div className="relative">
                        <Input
                          id="mobileManager"
                          placeholder="Enter manager mobile number"
                          className="bg-white pl-10"
                          value={formValues.mobileManager}
                          onChange={(e) => handleChange("mobileManager", e.target.value)}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <User className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobileFactory" className="text-sm font-medium text-gray-700">
                        Factory Mobile Number
                      </Label>
                      <div className="relative">
                        <Input
                          id="mobileFactory"
                          placeholder="Enter factory mobile number"
                          className="bg-white pl-10"
                          value={formValues.mobileFactory}
                          onChange={(e) => handleChange("mobileFactory", e.target.value)}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <User className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Popover open={cityOpen} onOpenChange={setCityOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between bg-white",
                              !formValues.city && "text-muted-foreground",
                            )}
                          >
                            {formValues.city
                              ? cities.find((city) => city.value === formValues.city)?.label || "Select city"
                              : "Select city"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search city..." />
                            <CommandList>
                              <CommandEmpty>No city found.</CommandEmpty>
                              <CommandGroup>
                                {cities.map((city) => (
                                  <CommandItem
                                    key={city.value}
                                    value={city.label}
                                    onSelect={() => {
                                      handleChange("city", city.value)
                                      setCityOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        city.value === formValues.city ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {city.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shopAddress" className="text-sm font-medium text-gray-700">
                    Shop Address <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="shopAddress"
                    placeholder="Enter complete shop address"
                    className="resize-none bg-white min-h-[100px]"
                    value={formValues.shopAddress}
                    onChange={(e) => handleChange("shopAddress", e.target.value)}
                  />
                  {errors.shopAddress && <p className="text-sm text-red-500">{errors.shopAddress}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Bank Account Information */}
            {step === 3 && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-medium text-gray-900">Bank Account Information</h2>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addBankAccount} className="text-sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Account
                  </Button>
                </div>
                <Separator className="mb-6" />

                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-4">Add one or more bank accounts associated with this shop</p>

                  {bankAccounts.map((account, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor={`bank-account-${index}`} className="text-sm font-medium text-gray-700">
                          Bank Account {index + 1} {index === 0 && <span className="text-red-500">*</span>}
                        </Label>
                        {bankAccounts.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBankAccount(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                      <div className="mt-1">
                        <Input
                          id={`bank-account-${index}`}
                          placeholder="Enter bank account number"
                          value={account}
                          onChange={(e) => updateBankAccount(index, e.target.value)}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  ))}
                  {errors.bankAccounts && <p className="text-sm text-red-500">{errors.bankAccounts}</p>}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center p-6 bg-gray-50 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                Previous
              </Button>

              {step < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                  Continue
                </Button>
              ) : (
                <Button type="submit">Create Account</Button>
              )}
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
