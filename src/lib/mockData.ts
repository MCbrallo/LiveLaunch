export interface Launch {
  id: string;
  name: string;
  mission: string;
  rocket: string;
  site: string;
  date: string;
  image: string;
  status: string;
  isUpcoming: boolean;
  agency?: string;
}

export function getMockUpcomingLaunches(): Launch[] {
  const now = new Date();
  return [
    {
      id: 'mock-up-1',
      name: 'Falcon 9 Block 5 | Starlink Group 8-2',
      mission: 'Starlink Group 8-2',
      rocket: 'Falcon 9 Block 5',
      site: 'Space Launch Complex 40, Cape Canaveral, FL, USA',
      date: new Date(now.getTime() + 1000 * 60 * 60 * 42 + 1000 * 60 * 15).toISOString(), // ~42 hours from now
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/falcon2520925_image_20221009234147.png',
      status: 'Go for Launch',
      isUpcoming: true,
      agency: 'SpaceX'
    },
    {
      id: 'mock-up-2',
      name: 'Electron | "PREFIRE and Ice"',
      mission: 'PREFIRE and Ice',
      rocket: 'Electron',
      site: 'Launch Complex 1B, Mahia Peninsula, New Zealand',
      date: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 4 + 1000 * 60 * 60 * 5).toISOString(), // ~4 days from now
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/electron_image_20190705162646.jpeg',
      status: 'TBD',
      isUpcoming: true,
      agency: 'Rocket Lab'
    },
    {
      id: 'mock-up-3',
      name: 'Long March 2D | SuperView Neo 3-01',
      mission: 'SuperView Neo 3-01',
      rocket: 'Long March 2D',
      site: 'Jiuquan Satellite Launch Center, China',
      date: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7).toISOString(), // ~7 days from now
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/cz-2d_image_20190222031211.jpeg',
      status: 'TBD',
      isUpcoming: true,
      agency: 'CASC'
    },
    {
      id: 'mock-up-4',
      name: 'H3-22S | ALOS-4',
      mission: 'ALOS-4',
      rocket: 'H3-22S',
      site: 'Yoshinobu Launch Complex, Tanegashima, Japan',
      date: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 12).toISOString(), // ~12 days from now
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/h-iii_image_20221104084430.jpeg',
      status: 'Go for Launch',
      isUpcoming: true,
      agency: 'JAXA'
    },
    {
      id: 'mock-up-5',
      name: 'Starship | Flight 6',
      mission: 'Flight 6',
      rocket: 'Starship',
      site: 'Orbital Launch Mount A, Starbase, TX, USA',
      date: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 20).toISOString(), // ~20 days from now
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/starship_liftof_image_20240314160301.jpeg',
      status: 'TBD',
      isUpcoming: true,
      agency: 'SpaceX'
    }
  ];
}

export function getMockPastLaunches(): Launch[] {
  return [
    {
      id: 'mock-past-1',
      name: 'Starship | Flight 4',
      mission: 'Flight 4',
      rocket: 'Starship',
      site: 'Orbital Launch Mount A, Starbase, TX, USA',
      date: '2024-06-06T12:50:00Z',
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/starship_liftof_image_20240314160301.jpeg',
      status: 'Success',
      isUpcoming: false,
      agency: 'SpaceX'
    },
    {
      id: 'mock-past-2',
      name: 'Falcon 9 Block 5 | Crew-8',
      mission: 'Crew-8',
      rocket: 'Falcon 9 Block 5',
      site: 'Launch Complex 39A, Kennedy Space Center, FL, USA',
      date: '2024-03-04T03:53:38Z',
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/falcon2520925_image_20221009234147.png',
      status: 'Success',
      isUpcoming: false,
      agency: 'SpaceX'
    },
    {
      id: 'mock-past-3',
      name: 'Vulcan Centaur | Cert-1',
      mission: 'Cert-1 (Peregrine)',
      rocket: 'Vulcan Centaur',
      site: 'Space Launch Complex 41, Cape Canaveral, FL, USA',
      date: '2024-01-08T07:18:38Z',
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/vulcan_centaur__image_20240107173347.jpeg',
      status: 'Success',
      isUpcoming: false,
      agency: 'ULA'
    },
    {
      id: 'mock-past-4',
      name: 'Falcon Heavy | Psyche',
      mission: 'Psyche',
      rocket: 'Falcon Heavy',
      site: 'Launch Complex 39A, Kennedy Space Center, FL, USA',
      date: '2023-10-13T14:19:43Z',
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/falcon_heavy_image_20220129192819.jpeg',
      status: 'Success',
      isUpcoming: false,
      agency: 'SpaceX'
    },
    {
      id: 'mock-past-5',
      name: 'SLS Block 1 | Artemis I',
      mission: 'Artemis I',
      rocket: 'Space Launch System (SLS)',
      site: 'Launch Complex 39B, Kennedy Space Center, FL, USA',
      date: '2022-11-16T06:47:44Z',
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/space_launch_sy_image_20220331082429.jpeg',
      status: 'Success',
      isUpcoming: false,
      agency: 'NASA'
    },
    {
      id: 'mock-past-6',
      name: 'Ariane 5 ECA | James Webb Space Telescope',
      mission: 'James Webb Space Telescope',
      rocket: 'Ariane 5 ECA',
      site: 'ELA-3, Guiana Space Centre, French Guiana',
      date: '2021-12-25T12:20:00Z',
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/ariane_5_eca_image_20211223091522.jpeg',
      status: 'Success',
      isUpcoming: false,
      agency: 'Arianespace'
    },
    {
      id: 'mock-past-7',
      name: 'Falcon 9 Block 5 | Inspiration4',
      mission: 'Inspiration4',
      rocket: 'Falcon 9 Block 5',
      site: 'Launch Complex 39A, Kennedy Space Center, FL, USA',
      date: '2021-09-16T00:02:56Z',
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/falcon2520925_image_20221009234147.png',
      status: 'Success',
      isUpcoming: false,
      agency: 'SpaceX'
    },
    {
      id: 'mock-past-8',
      name: 'Atlas V 541 | Mars 2020 (Perseverance)',
      mission: 'Mars 2020',
      rocket: 'Atlas V 541',
      site: 'Space Launch Complex 41, Cape Canaveral, FL, USA',
      date: '2020-07-30T11:50:00Z',
      image: 'https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/images/atlas2520v252_image_20200729144937.jpg',
      status: 'Success',
      isUpcoming: false,
      agency: 'ULA'
    }
  ];
}
