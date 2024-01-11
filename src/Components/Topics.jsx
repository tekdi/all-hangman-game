import { Select } from '@chakra-ui/react';
import React from 'react';

const Topics = ({topics, handleTopicChange}) => {
  return <div>
     <Select
          placeholder="Select a Topic"
          onChange={(e) => handleTopicChange(e.target.value)}
        >
          {topics.map((topic, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
        </Select>
  </div>;
};

export default Topics;
