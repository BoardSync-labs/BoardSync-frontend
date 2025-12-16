// "use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Checkbox,
//   CheckboxGroup,
// } from "@/components/ui/checkbox"; // assuming you have a checkbox component
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// type FilterProps = {
//   priorities: string[];
//   tags: string[];
//   assignees: string[];
//   onFilterChange: (filters: { priorities: string[]; tags: string[]; assignees: string[] }) => void;
// };

// export function BoardFilter({ priorities, tags, assignees, onFilterChange }: FilterProps) {
//   const [selectedPriorities, setSelectedPriorities] = React.useState<string[]>([]);
//   const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
//   const [selectedAssignees, setSelectedAssignees] = React.useState<string[]>([]);

//   const applyFilter = () => {
//     onFilterChange({
//       priorities: selectedPriorities,
//       tags: selectedTags,
//       assignees: selectedAssignees,
//     });
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="text-black">
//           Filter
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-64">
//         {/* Priority Section */}
//         <div className="mb-4">
//           <Label className="text-black mb-2">Priority</Label>
//           <CheckboxGroup
//             value={selectedPriorities}
//             onValueChange={setSelectedPriorities}
//           >
//             {priorities.map((priority) => (
//               <div key={priority} className="flex items-center space-x-2">
//                 <Checkbox value={priority} />
//                 <span className="text-black">{priority}</span>
//               </div>
//             ))}
//           </CheckboxGroup>
//         </div>

//         {/* Tags Section */}
//         <div className="mb-4">
//           <Label className="text-black mb-2">Tags</Label>
//           <CheckboxGroup value={selectedTags} onValueChange={setSelectedTags}>
//             {tags.map((tag) => (
//               <div key={tag} className="flex items-center space-x-2">
//                 <Checkbox value={tag} />
//                 <span className="text-black">{tag}</span>
//               </div>
//             ))}
//           </CheckboxGroup>
//         </div>

//         {/* Assignees Section */}
//         <div className="mb-4">
//           <Label className="text-black mb-2">Assignee</Label>
//           <CheckboxGroup
//             value={selectedAssignees}
//             onValueChange={setSelectedAssignees}
//           >
//             {assignees.map((assignee) => (
//               <div key={assignee} className="flex items-center space-x-2">
//                 <Checkbox value={assignee} />
//                 <span className="text-black">{assignee}</span>
//               </div>
//             ))}
//           </CheckboxGroup>
//         </div>

//         <Button className="w-full mt-2" onClick={applyFilter}>
//           Apply
//         </Button>
//       </PopoverContent>
//     </Popover>
//   );
// }
