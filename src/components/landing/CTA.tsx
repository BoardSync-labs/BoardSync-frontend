import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform how your team works?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of teams already using BoardSync to streamline their workflow 
            and deliver projects faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/board">
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required • Free forever for small teams
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

