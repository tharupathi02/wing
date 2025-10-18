import SocialAuthButton from '@/components/custom-buttons/SocialAuthButton'
import ASSETS from '@/constant/Assets'
import AppColors from '@/constant/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { toast } from 'sonner-native'
import { useUserStore } from '@/store/useUserStore'

const SignInScreen = () => {
  const router = useRouter()
  const { signIn, loading } = useUserStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = async () => {
    // Validate fields
    if (!email.trim() || !password.trim()) {
      toast.error('Validation Error', {
        description: 'Please fill in all fields',
      })
      return
    }

    // Handle sign in logic with Zustand
    const result = await signIn(email.trim(), password)
    
    if (result.success) {
      toast.success('Sign in successful', { 
        description: result.message 
      })
      // Clear form
      setEmail('')
      setPassword('')
      // Navigate to main app
      router.push('/(screens)/(tabs)')
    } else {
      toast.error('Sign in failed', {
        description: result.message,
      })
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-16 pb-8">
        {/* Logo and App Name Section */}
        <View className="mb-2">
          <Image 
            source={ASSETS.LOGO.COLOR} 
            className="w-14 h-14 mb-3"
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-textPrimary">
            Welcome Back
          </Text>
          <Text className="text-base text-textSecondary">
            Sign in to continue
          </Text>
        </View>

        {/* Email Input */}
        <View className="mb-5">
          <Text className="text-sm font-semibold text-textPrimary mb-2">
            Email
          </Text>
          <TextInput
            className="bg-background border border-border rounded-xl px-4 py-4 text-base text-textPrimary"
            placeholder="Enter your email"
            placeholderTextColor={AppColors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-textPrimary mb-2">
            Password
          </Text>
          <View className="relative">
            <TextInput
              className="bg-background border border-border rounded-xl px-4 py-4 text-base text-textPrimary pr-12"
              placeholder="Enter your password"
              placeholderTextColor={AppColors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              <Ionicons 
                name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                size={24} 
                color={AppColors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-primary rounded-xl py-4 mb-6 shadow-sm"
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text className="text-white text-center text-base font-bold">
            {loading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Navigate to Sign Up */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-textSecondary text-sm">
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(screens)/auth/signup/signup-screen')}>
            <Text className="text-primary text-sm font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider with OR */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-[1px] bg-border" />
          <Text className="px-4 text-textSecondary text-sm">
            or
          </Text>
          <View className="flex-1 h-[1px] bg-border" />
        </View>

        {/* Continue with Apple */}
        <SocialAuthButton
          className="bg-black mb-3"
          textClassName="text-white text-center"
          icon={<Ionicons name="logo-apple" size={24} color="white" />}
          text="Continue with Apple"
          onPress={handleSignIn}
        />

        {/* Continue with Google */}
        <SocialAuthButton
          className="bg-red-500 border-2 border-border"
          textClassName="text-white text-center"
          icon={<Ionicons name="logo-google" size={24} color="white" />}
          text="Continue with Google"
          onPress={handleSignIn}
        />
      </View>
    </ScrollView>
  )
}

export default SignInScreen