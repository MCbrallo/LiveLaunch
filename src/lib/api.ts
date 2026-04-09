import { Launch, getMockUpcomingLaunches, getMockPastLaunches } from './mockData';

const API_BASE = 'https://lldev.thespacedevs.com/2.2.0';

// Helper to map SpaceDevs API response to our Launch interface
function mapSpaceDevsLaunch(data: any, isUpcoming: boolean): Launch {
  return {
    id: data.id,
    name: data.name,
    mission: data.mission?.name || data.name.split('|')[1]?.trim() || 'Unknown Mission',
    rocket: data.rocket?.configuration?.name || 'Unknown Rocket',
    site: data.pad?.name ? `${data.pad.name}, ${data.pad.location?.name || ''}` : 'Unknown Site',
    date: data.net,
    image: data.image || 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/falcon2520925_image_20221009234147.png', // fallback image
    status: data.status?.name || 'Unknown',
    isUpcoming,
    agency: data.launch_service_provider?.name || 'Unknown Agency'
  };
}

export async function fetchUpcomingLaunches(): Promise<Launch[]> {
  try {
    const response = await fetch(`${API_BASE}/launch/upcoming/?limit=10`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return data.results.map((l: any) => mapSpaceDevsLaunch(l, true));
  } catch (error) {
    console.warn('Failed to fetch upcoming launches from API, using fallback data.', error);
    // SpaceDevs dev API has strict rate limits (15/hr), so we fallback gracefully
    return getMockUpcomingLaunches();
  }
}

export async function fetchPastLaunches(): Promise<Launch[]> {
  try {
    const response = await fetch(`${API_BASE}/launch/previous/?limit=30`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return data.results.map((l: any) => mapSpaceDevsLaunch(l, false));
  } catch (error) {
    console.warn('Failed to fetch past launches from API, using fallback data.', error);
    return getMockPastLaunches();
  }
}
