import { motion } from 'framer-motion';
import { 
  Layers, 
  Users, 
  Zap, 
  Shield, 
  Bell, 
  Search,
  GitBranch,
  MessageSquare
} from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'Kanban Boards',
    description: 'Visualize your workflow with customizable boards and columns. Drag and drop tasks effortlessly.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite team members, assign tasks, and work together in real-time with live updates.',
  },
  {
    icon: Zap,
    title: 'Real-Time Sync',
    description: 'See changes instantly as your team works. No refresh needed, everything syncs automatically.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Control who can view, edit, or manage your boards with granular permission settings.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Stay informed with email notifications for task updates, mentions, and deadlines.',
  },
  {
    icon: Search,
    title: 'Powerful Search',
    description: 'Find any task instantly with advanced filtering by assignee, labels, and status.',
  },
  {
    icon: GitBranch,
    title: 'Activity Tracking',
    description: 'Full audit trail of all changes. See who did what and when with detailed logs.',
  },
  {
    icon: MessageSquare,
    title: 'Comments & Mentions',
    description: 'Discuss tasks in context with threaded comments and @mentions for teammates.',
  },
];

const Features = () => {
  return (
    <section className="py-32 relative">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to{' '}
            <span className="gradient-text">ship faster</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for modern engineering teams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card rounded-xl p-6 hover-lift cursor-default"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
