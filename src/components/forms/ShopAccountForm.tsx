"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Building2, Check, ChevronsUpDown, Plus, Store, Trash2, Upload, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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

const formSchema = z.object({
  shopPicture: z.string().optional(),
  shopNo: z.string().min(1, "Shop number is required"),
  mobileBoss: z.string().optional(),
  mobileMiss: z.string().min(1, "Miss mobile number is required"),
  mobileManager: z.string().optional(),
  mobileFactory: z.string().optional(),
  accountType: z.enum(["expense", "company", "supplier", "shopkeeper"], {
    required_error: "Please select an account type",
  }),
  shopAddress: z.string().min(1, "Shop address is required"),
  city: z.string().min(1, "City is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  bankAccounts: z.array(z.string()).min(1, "At least one bank account is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function ShopAccountForm() {
  const [bankAccounts, setBankAccounts] = useState<string[]>([""])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        form.setValue("shopPicture", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, ""])
  }

  const removeBankAccount = (index: number) => {
    if (bankAccounts.length > 1) {
      const updatedAccounts = [...bankAccounts]
      updatedAccounts.splice(index, 1)
      setBankAccounts(updatedAccounts)

      const currentValues = form.getValues().bankAccounts
      currentValues.splice(index, 1)
      form.setValue("bankAccounts", currentValues)
    }
  }

  const updateBankAccount = (index: number, value: string) => {
    const currentValues = form.getValues().bankAccounts || []
    currentValues[index] = value
    form.setValue("bankAccounts", currentValues)
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data)
    // Here you would typically send the data to your API
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <FormField
                        control={form.control}
                        name="shopPicture"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Shop Picture</FormLabel>
                            <FormControl>
                              <div className="flex flex-col items-center">
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
                                      fill
                                      className="w-full h-full object-cover"
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
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1 space-y-6">
                      <FormField
                        control={form.control}
                        name="shopNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Shop Number <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter shop number" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="accountType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Account Type <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-3"
                              >
                                <div
                                  className={cn(
                                    "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                                    field.value === "expense" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                                  )}
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="expense" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">Expense Account</FormLabel>
                                  </FormItem>
                                </div>

                                <div
                                  className={cn(
                                    "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                                    field.value === "company" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                                  )}
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="company" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">Company Account</FormLabel>
                                  </FormItem>
                                </div>

                                <div
                                  className={cn(
                                    "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                                    field.value === "supplier" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                                  )}
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="supplier" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">Supplier</FormLabel>
                                  </FormItem>
                                </div>

                                <div
                                  className={cn(
                                    "flex items-center space-x-2 rounded-lg border border-gray-200 p-3 cursor-pointer transition-all",
                                    field.value === "shopkeeper" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                                  )}
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="shopkeeper" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">Shopkeeper</FormLabel>
                                  </FormItem>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                      <FormField
                        control={form.control}
                        name="mobileBoss"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Boss Mobile Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="Enter boss mobile number" {...field} className="bg-white pl-10" />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                  <User className="h-4 w-4" />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobileMiss"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Miss Mobile Number <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="Enter miss mobile number" {...field} className="bg-white pl-10" />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                  <User className="h-4 w-4" />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Email Address <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter email address" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="mobileManager"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Manager Mobile Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="Enter manager mobile number"
                                  {...field}
                                  className="bg-white pl-10"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                  <User className="h-4 w-4" />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobileFactory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Factory Mobile Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="Enter factory mobile number"
                                  {...field}
                                  className="bg-white pl-10"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                  <User className="h-4 w-4" />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              City <span className="text-red-500">*</span>
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between bg-white",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? cities.find((city) => city.value === field.value)?.label
                                      : "Select city"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search city..." />
                                  <CommandList>
                                    <CommandEmpty>No city found.</CommandEmpty>
                                    <CommandGroup>
                                      {cities.map((city) => (
                                        <CommandItem
                                          value={city.label}
                                          key={city.value}
                                          onSelect={() => {
                                            form.setValue("city", city.value)
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              city.value === field.value ? "opacity-100" : "opacity-0",
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="shopAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Shop Address <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter complete shop address"
                            className="resize-none bg-white min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    <p className="text-sm text-gray-600 mb-4">
                      Add one or more bank accounts associated with this shop
                    </p>

                    {bankAccounts.map((account, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel htmlFor={`bank-account-${index}`} className="text-sm font-medium text-gray-700">
                            Bank Account {index + 1} {index === 0 && <span className="text-red-500">*</span>}
                          </FormLabel>
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
        </Form>
      </Card>
    </div>
  )
}