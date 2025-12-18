import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MapPin, Users, Check } from 'lucide-react';
import { Tutor, IndianRegion } from '@/types/therapy';
import { indianRegions } from '@/data/regions';

// Mock tutors data
const mockTutors: Tutor[] = [
  {
    id: 'tutor-1',
    email: 'priya.sharma@example.com',
    name: 'Dr. Priya Sharma',
    role: 'tutor',
    region: 'north',
    specialization: ['Autism', 'Speech Therapy'],
    experience: 8,
    qualifications: ['M.Sc. Speech Therapy', 'RCI Certified'],
    bio: 'Specialized in autism and speech therapy with 8 years of experience',
    rating: 4.8,
    totalStudents: 45,
    totalActivities: 120,
    verified: true,
    createdAt: new Date('2020-01-15'),
  },
  {
    id: 'tutor-2',
    email: 'ramesh.kumar@example.com',
    name: 'Dr. Ramesh Kumar',
    role: 'tutor',
    region: 'south',
    specialization: ['Cognitive Development', 'Learning Disabilities'],
    experience: 12,
    qualifications: ['Ph.D. Special Education', 'RCI Certified'],
    bio: 'Expert in cognitive development and learning disabilities',
    rating: 4.9,
    totalStudents: 78,
    totalActivities: 200,
    verified: true,
    createdAt: new Date('2018-05-20'),
  },
  {
    id: 'tutor-3',
    email: 'anjali.patel@example.com',
    name: 'Ms. Anjali Patel',
    role: 'tutor',
    region: 'west',
    specialization: ['Early Intervention', 'ADHD'],
    experience: 6,
    qualifications: ['M.Ed. Special Education'],
    bio: 'Focused on early intervention and ADHD support',
    rating: 4.6,
    totalStudents: 32,
    totalActivities: 85,
    verified: true,
    createdAt: new Date('2021-03-10'),
  },
  {
    id: 'tutor-4',
    email: 'suresh.reddy@example.com',
    name: 'Dr. Suresh Reddy',
    role: 'tutor',
    region: 'south',
    specialization: ['Down Syndrome', 'Motor Skills'],
    experience: 10,
    qualifications: ['M.Sc. Occupational Therapy', 'RCI Certified'],
    bio: 'Specialized in Down syndrome and motor skills development',
    rating: 4.7,
    totalStudents: 56,
    totalActivities: 150,
    verified: true,
    createdAt: new Date('2019-08-15'),
  },
  {
    id: 'tutor-5',
    email: 'meera.singh@example.com',
    name: 'Ms. Meera Singh',
    role: 'tutor',
    region: 'north',
    specialization: ['Speech Therapy', 'Language Development'],
    experience: 5,
    qualifications: ['M.Sc. Speech Therapy'],
    bio: 'Expert in speech therapy and language development',
    rating: 4.5,
    totalStudents: 28,
    totalActivities: 95,
    verified: false,
    createdAt: new Date('2022-01-05'),
  },
];

interface TutorSelectorProps {
  selectedTutorId?: string;
  onSelectTutor: (tutorId: string) => void;
}

export function TutorSelector({ selectedTutorId, onSelectTutor }: TutorSelectorProps) {
  const [selectedRegion, setSelectedRegion] = useState<IndianRegion | 'all'>('all');

  const filteredTutors = mockTutors.filter(tutor => 
    selectedRegion === 'all' || tutor.region === selectedRegion
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Select Your Therapist
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose a therapist from your region to access their activities
          </p>
        </div>
        <Select value={selectedRegion} onValueChange={(value) => setSelectedRegion(value as IndianRegion | 'all')}>
          <SelectTrigger className="w-[180px]">
            <MapPin className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {indianRegions.map((region) => (
              <SelectItem key={region.code} value={region.code}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTutors.map((tutor) => {
          const isSelected = selectedTutorId === tutor.id;
          return (
            <Card
              key={tutor.id}
              className={`p-5 cursor-pointer transition-all hover:shadow-medium ${
                isSelected ? 'ring-2 ring-primary shadow-glow-primary' : ''
              }`}
              onClick={() => onSelectTutor(tutor.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg gradient-warm">
                    {tutor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{tutor.name}</h3>
                    {tutor.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{indianRegions.find(r => r.code === tutor.region)?.name}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-medium">{tutor.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({tutor.totalStudents} students)
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap gap-1">
                  {tutor.specialization?.slice(0, 2).map((spec) => (
                    <Badge key={spec} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {tutor.bio}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{tutor.totalActivities} activities</span>
                </div>
                <span>{tutor.experience} years exp.</span>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTutors.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">No therapists found</h3>
          <p className="text-muted-foreground">
            Try selecting a different region
          </p>
        </Card>
      )}
    </div>
  );
}

