import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-blue-950">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-block">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
                  <span className="text-xl font-bold text-black">R</span>
                </div>
                <span className="text-xl font-bold text-white">
                  Roof<span className="text-neon-gold">Fax</span>
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Create an account</h1>
            <p className="text-white/70 text-sm">Enter your information to create an account</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-white">
                  First name
                </Label>
                <Input
                  id="first-name"
                  className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-white">
                  Last name
                </Label>
                <Input
                  id="last-name"
                  className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="border-neon-gold/50 data-[state=checked]:bg-neon-gold data-[state=checked]:text-black"
              />
              <Label htmlFor="terms" className="text-sm text-white/70">
                I agree to the
                <Link href="/terms" className="text-neon-gold hover:text-neon-orange transition-colors ml-1">
                  terms and conditions
                </Link>
              </Label>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow"
              type="submit"
              asChild
            >
              <Link href="/dashboard">Create Account</Link>
            </Button>

            <div className="text-center text-sm text-white/70">
              <span>Already have an account? </span>
              <Link href="/login" className="text-neon-gold hover:text-neon-orange transition-colors font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
