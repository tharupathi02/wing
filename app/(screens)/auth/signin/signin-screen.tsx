import SocialAuthButton from '@/components/custom-buttons/SocialAuthButton'
import ASSETS from '@/constant/Assets'
import AppColors from '@/constant/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { toast } from 'sonner-native'

const SignInScreen = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = () => {
    // Handle sign in logic
    toast.success('Sign in successful', { description: 'You have successfully signed in' })
    console.log('Sign in with:', email, password)
    router.push('/(screens)/(tabs)')
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
        >
          <Text className="text-white text-center text-base font-bold">
            Sign In
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