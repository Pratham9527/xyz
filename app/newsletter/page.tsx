'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  preferences: z.array(z.string()).optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to your backend
      console.log('Form submitted:', data);
      
      toast({
        title: 'Success!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">JOIN OUR NEWSLETTER</h1>
          <p className="text-xl text-neutral-600 mb-10">
            Get weekly running tips, podcast updates, and exclusive content delivered straight to your inbox.
          </p>

          <div className="bg-neutral-100 rounded-lg p-8 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Your name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <p className="font-medium mb-2">I'm interested in:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="running-tips" />
                      <Label htmlFor="running-tips" className="font-normal">
                        Running Tips
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="podcast-updates" defaultChecked />
                      <Label htmlFor="podcast-updates" className="font-normal">
                        Podcast Updates
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="training-plans" />
                      <Label htmlFor="training-plans" className="font-normal">
                        Training Plans
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nutrition" />
                      <Label htmlFor="nutrition" className="font-normal">
                        Nutrition Advice
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gear-reviews" />
                      <Label htmlFor="gear-reviews" className="font-normal">
                        Gear Reviews
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="events" />
                      <Label htmlFor="events" className="font-normal">
                        Events & Meetups
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">How often would you like to hear from us?</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="weekly" name="frequency" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="weekly" className="font-normal">
                        Weekly (Our most popular option)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="biweekly" name="frequency" className="h-4 w-4" />
                      <Label htmlFor="biweekly" className="font-normal">
                        Bi-weekly
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="monthly" name="frequency" className="h-4 w-4" />
                      <Label htmlFor="monthly" className="font-normal">
                        Monthly
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="font-normal text-sm">
                    I agree to receive email communications from Running Buddies Podcast. You can unsubscribe at any
                    time. View our{" "}
                    <a href="#" className="underline">
                      Privacy Policy
                    </a>
                    .
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-neutral-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">What to Expect</h2>

            <div className="grid gap-4">
              <div className="flex items-start space-x-3">
                <div className="bg-black rounded-full p-1 mt-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Weekly Running Tips</h3>
                  <p className="text-neutral-600">
                    Practical advice to improve your running form, endurance, and speed.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-black rounded-full p-1 mt-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">New Podcast Episodes</h3>
                  <p className="text-neutral-600">
                    Be the first to know when we release new episodes with inspiring guests.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-black rounded-full p-1 mt-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Exclusive Content</h3>
                  <p className="text-neutral-600">Subscriber-only articles, training plans, and resources.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-black rounded-full p-1 mt-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Community Stories</h3>
                  <p className="text-neutral-600">
                    Inspiring stories from our running community to keep you motivated.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-black rounded-full p-1 mt-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Special Offers</h3>
                  <p className="text-neutral-600">
                    Occasional discounts on running gear and early access to our events.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-neutral-500">
                We respect your privacy and will never share your information with third parties. You can unsubscribe at
                any time with a single click.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 mb-4 md:mb-0">
              <span className="font-bold">Running</span>
              <span>Buddies Podcast</span>
            </div>
            <div className="flex space-x-6">
              <a href="/" className="text-sm text-neutral-500 hover:text-black">
                Home
              </a>
              <a href="/podcast" className="text-sm text-neutral-500 hover:text-black">
                Podcast
              </a>
              <a href="/blog" className="text-sm text-neutral-500 hover:text-black">
                Blog
              </a>
              <a href="/about" className="text-sm text-neutral-500 hover:text-black">
                About
              </a>
              <a href="/contact" className="text-sm text-neutral-500 hover:text-black">
                Contact
              </a>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-neutral-500">
              © {new Date().getFullYear()} Running Buddies. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
