import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Tooltip } from '@ant-design/react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RecipeCardProps {
  id: number;
  title: string;
  portions: string;
  calories: string;
  time: string;
  image: string;
  onEdit: () => void;
  onDelete: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, portions, calories, time, image, onEdit, onDelete }) => {
  return (
    <Card style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title} / Porciones: {portions}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialIcons name="flash-on" size={24} color="#86A071" />
            <Text style={styles.infoText}>{calories} Cal</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="access-time" size={24} color="#86A071" />
            <Text style={styles.infoText}>{time} Min</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <MaterialIcons name="edit" size={24} color="#86A071" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="share" size={24} color="#86A071" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#86A071',
    fontFamily: 'Jomhuria, sans-serif',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#86A071',
    marginLeft: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    padding: 10,
  },
});

export default RecipeCard;
