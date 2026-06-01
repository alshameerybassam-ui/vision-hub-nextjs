'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types'

export function useAuth() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (data) {
          setProfile(data as Profile)
        } else {
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              full_name: user.user_metadata?.full_name,
              role: 'client',
              preferred_lang: 'ar',
            })
            .select()
            .single()

          if (newProfile) {
            setProfile(newProfile as Profile)
          }
        }
      }

      setLoading(false)
    }

    getProfile()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        getProfile()
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return { profile, loading }
}
