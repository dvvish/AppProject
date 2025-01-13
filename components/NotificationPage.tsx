import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Notification {
  id: string;
  title: string;
  body: string;
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch notifications from AsyncStorage
  const fetchNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Save a new notification to AsyncStorage
  const saveNotification = async (newNotification: Notification) => {
    try {
      const updatedNotifications = [newNotification, ...notifications]; // Newest notification first
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  };

  // Listen for notifications
  useEffect(() => {
    // Foreground notification listener
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage?.notification) {
        const { title, body } = remoteMessage.notification;
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: title || 'No Title',
          body: body || 'No Body',
        };
        saveNotification(newNotification);
      }
    });

    // Background notification handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (remoteMessage?.notification) {
        const { title, body } = remoteMessage.notification;
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: title || 'No Title',
          body: body || 'No Body',
        };
        saveNotification(newNotification);
      }
    });

    // Handle initial notification when app opens
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage?.notification) {
          const { title, body } = remoteMessage.notification;
          const newNotification: Notification = {
            id: Date.now().toString(),
            title: title || 'No Title',
            body: body || 'No Body',
          };
          saveNotification(newNotification);
        }
      });

    // Fetch stored notifications on component mount
    fetchNotifications();

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noNotifications}>No notifications to display.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  notificationCard: {
    padding: 16,
    backgroundColor: '#ed6156',
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  noNotifications: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NotificationPage;
