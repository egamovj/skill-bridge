import React from 'react';
import SkillCard from './SkillCard';

const SkillGrid = ({ skills, featuredIndex = -1 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {skills.map((skill, index) => (
        <SkillCard 
          key={skill.id} 
          skill={skill}
          featured={index === featuredIndex} 
        />
      ))}
    </div>
  );
};

export default SkillGrid;