'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Order } from '@/types'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
      } else {
        setOrders(data || [])
      }
      setLoading(false)
    }

    fetchOrders()

    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setOrders((prev) => [payload.new as Order, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setOrders((prev) =>
              prev.map((order) => (order.id === payload.new.id ? (payload.new as Order) : order))
            )
          } else if (payload.eventType === 'DELETE') {
            setOrders((prev) => prev.filter((order) => order.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { orders, loading }
}
