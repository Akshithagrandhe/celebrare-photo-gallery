// Keep display names tied to Picsum IDs so they stay the same after refreshes.
const photoDisplayNames = {
  '0': 'Aarav Sharma',
  '1': 'Ananya Reddy',
  '2': 'Priya Nair',
  '3': 'Arjun Verma',
  '4': 'Meera Iyer',
  '5': 'Rahul Patil',
  '6': 'Sneha Kulkarni',
  '7': 'Aditya Rao',
  '8': 'Kavya Menon',
  '9': 'Ishaan Gupta',
  '10': 'Diya Chatterjee',
  '11': 'Vikram Singh',
  '12': 'Nisha Krishnan',
  '13': 'Karthik Subramanian',
  '14': 'Pooja Deshmukh',
  '15': 'Rohan Mukherjee',
  '16': 'Lakshmi Narayanan',
  '17': 'Sanjay Gowda',
  '18': 'Aditi Banerjee',
  '19': 'Harini Pillai',
  '20': 'Dev Malhotra',
  '21': 'Saanvi Joshi',
  '22': 'Naveen Ramaswamy',
  '23': 'Farah Khan',
  '24': 'Anirudh Das',
  '25': 'Tanvi Kapoor',
  '26': 'Pranav Hegde',
  '27': 'Ishita Bose',
  '28': 'Madhav Srinivasan',
  '29': 'Zoya Qureshi',
}

export function getPhotoDisplayName(photoId) {
  return photoDisplayNames[String(photoId)]
}

export function filterPhotosByDisplayName(photos, searchTerm) {
  const query = searchTerm.trim().toLowerCase()
  if (!query) return photos
  return photos.filter((photo) => getPhotoDisplayName(photo.id).toLowerCase().includes(query))
}

