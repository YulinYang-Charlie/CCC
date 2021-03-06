import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {
    title: 'Charts',
    icon: <BsIcons.BsFillBarChartFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Tweet counts',
        path: '/pie',
        icon: <BsIcons.BsFillBarChartFill />,
        cName: 'sub-nav'
      },
      {
        title: 'Tweet keywords',
        path: '/keyword-pie',
        icon: <BsIcons.BsFillBarChartFill />,
        cName: 'sub-nav'
      },
      {
        title: 'Emotion Sentiment',
        path: '/emotion-bar',
        icon: <BsIcons.BsFillBarChartFill />,
        cName: 'sub-nav'
      },
      {
        title: 'Twitter usage by hours',
        path: '/line',
        icon: <BsIcons.BsFillBarChartFill />
      },
      //   {
      //   title: 'Grouped Bar',
      //   path: '/grouped-bar',
      //   icon: <BsIcons.BsFillBarChartFill />
      // },
        {
        title: 'Focus trend',
        path: '/single-axis',
        icon: <BsIcons.BsFillBarChartFill />
      },
      //   {
      //   title: 'Radar',
      //   path: '/radar',
      //   icon: <BsIcons.BsFillBarChartFill />
      // },
      //   {
      //   title: 'Multi',
      //   path: '/multi',
      //   icon: <BsIcons.BsFillBarChartFill />
      // }
    ]
  },
  {
    title: 'Maps',
    icon: <FaIcons.FaMapMarkedAlt />,

    subNav: [
      {
        title: 'Map',
        path: '/map',
        icon: <FaIcons.FaMapMarkedAlt />
      }
    ]
  },
  // {
  //   title: 'Team',
  //   path: '/team',
  //   icon: <IoIcons.IoMdPeople />
  // }
];
