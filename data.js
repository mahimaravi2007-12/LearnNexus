/**
 * LearnStream AI - Comprehensive Educational Dataset
 * Includes curated video lectures with timestamps, syllabus topics,
 * mock tests, quiz banks, sample notes, and performance statistics.
 */

window.LEARN_STREAM_DATA = {
  userProfile: {
    name: "Alex Rivera",
    email: "alex.rivera@edu.learnstream.ai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    gradeLevel: "Undergraduate (3rd Year) / Lifelong Learner",
    enrolledCourses: 6,
    streakDays: 14,
    totalStudyHours: 48.5,
    testsCompleted: 12,
    averageScore: 88,
    totalXP: 3420,
    currentLevel: "Advanced Scholar (Lvl 7)",
    weeklyGoalHours: 15,
    weeklyCurrentHours: 11.2,
    learningStyle: "Visual & Practical Builder",
    streakCalendar: [
      { date: "2026-09-12", count: 3 },
      { date: "2026-09-13", count: 4 },
      { date: "2026-09-14", count: 2 },
      { date: "2026-09-15", count: 5 },
      { date: "2026-09-16", count: 1 },
      { date: "2026-09-17", count: 4 },
      { date: "2026-09-18", count: 6 },
      { date: "2026-09-19", count: 5 },
      { date: "2026-09-20", count: 3 },
      { date: "2026-09-21", count: 7 },
      { date: "2026-09-22", count: 4 },
      { date: "2026-09-23", count: 5 },
      { date: "2026-09-24", count: 6 },
      { date: "2026-09-25", count: 8 },
      { date: "2026-09-26", count: 4 }
    ],
    badges: [
      { id: "streak-14", name: "Consistency Titan", icon: "🔥", desc: "14-day continuous learning streak" },
      { id: "quiz-master", name: "Quiz Master", icon: "🎯", desc: "Scored 100% on 5 consecutive quizzes" },
      { id: "ai-speed", name: "AI Polymath", icon: "⚡", desc: "Generated 25+ structured AI study notes" },
      { id: "mock-champ", name: "Exam Ready", icon: "🏆", desc: "Completed 3 full-length timed mock tests" }
    ]
  },

  subjects: [
    { id: "all", name: "All Disciplines", icon: "fas fa-globe" },
    { id: "ai-ml", name: "AI & Machine Learning", icon: "fas fa-brain" },
    { id: "dsa", name: "Data Structures & Algos", icon: "fas fa-code-branch" },
    { id: "quantum", name: "Quantum Physics & Math", icon: "fas fa-atom" },
    { id: "neuroscience", name: "Neuroscience & Biology", icon: "fas fa-dna" },
    { id: "webdev", name: "Modern Web Engineering", icon: "fas fa-laptop-code" },
    { id: "astronomy", name: "Astrophysics & Space", icon: "fas fa-satellite" }
  ],

  videos: [
    {
      id: "vid-1",
      title: "Neural Networks & Backpropagation from Scratch",
      channel: "3Blue1Brown (Grant Sanderson)",
      channelAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      youtubeId: "aircAruvnKk", // 3Blue1Brown Neural Networks
      subject: "ai-ml",
      duration: "18m 45s",
      durationSeconds: 1125,
      rating: 4.9,
      reviewsCount: 3840,
      matchScore: 98,
      difficulty: "Intermediate",
      summary: "A world-class visual breakdown of how multi-layer perceptrons compute gradients using the chain rule, transforming cost function surfaces into optimal weight trajectories.",
      prerequisites: ["Linear Algebra (Matrix Multiplication)", "Single Variable Calculus (Derivatives)"],
      keyTakeaways: [
        "A neural network is essentially a differentiable parametric function that minimizes an empirical loss function.",
        "Backpropagation is an efficient application of the multivariable calculus chain rule traversing backwards through the computational graph.",
        "Gradient descent nudges every weight and bias in the direction of steepest descent to minimize cost."
      ],
      timestamps: [
        { time: "00:00", title: "Introduction & What a neuron actually calculates" },
        { time: "03:45", title: "Activation functions: Sigmoid vs ReLU vs GELU" },
        { time: "07:20", title: "The Cost Function: Quantifying error" },
        { time: "11:15", title: "Chain Rule & Computing partial derivatives" },
        { time: "15:30", title: "Stochastic Gradient Descent in higher dimensions" }
      ],
      tags: ["Deep Learning", "Calculus", "Gradient Descent", "Vectors"]
    },
    {
      id: "vid-2",
      title: "Attention Is All You Need: Transformer Architecture Explained",
      channel: "AI Discovery Labs",
      channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
      youtubeId: "SZorAJ4I-sA",
      subject: "ai-ml",
      duration: "24m 12s",
      durationSeconds: 1452,
      rating: 4.95,
      reviewsCount: 5120,
      matchScore: 99,
      difficulty: "Advanced",
      summary: "Understand the core mechanism behind GPT-4, Gemini, and modern LLMs: Scaled Dot-Product Attention, Multi-Head projections, Positional Encodings, and Feed-Forward sublayers.",
      prerequisites: ["Matrix Operations", "Probability Fundamentals"],
      keyTakeaways: [
        "Self-attention allows tokens to dynamically relate to all other tokens regardless of distance, overcoming RNN vanishing gradient bottlenecks.",
        "Query (Q), Key (K), and Value (V) projections convert fixed embeddings into contextualized representations.",
        "Softmax((Q * K^T) / sqrt(d_k)) * V defines the universal attention formula."
      ],
      timestamps: [
        { time: "00:00", title: "Why RNNs and LSTMs hit scaling barriers" },
        { time: "04:30", title: "The Intuition of Queries, Keys, and Values" },
        { time: "09:50", title: "Scaled Dot-Product calculation" },
        { time: "14:10", title: "Multi-Head Attention: Diverse semantic representation spaces" },
        { time: "19:40", title: "Positional encodings & Residual connections" }
      ],
      tags: ["Transformers", "LLMs", "Self-Attention", "NLP"]
    },
    {
      id: "vid-3",
      title: "Graph Algorithms: Dijkstra, A*, and Dynamic Programming",
      channel: "CS Masterclass",
      channelAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1516116211227-bbc00685be47?w=600&auto=format&fit=crop&q=80",
      youtubeId: "EFg3u_E6eHU",
      subject: "dsa",
      duration: "31m 10s",
      durationSeconds: 1870,
      rating: 4.88,
      reviewsCount: 2980,
      matchScore: 94,
      difficulty: "Intermediate",
      summary: "Step-by-step visual exploration of finding shortest paths in weighted directed acyclic and cyclic graphs using Min-Heaps, relaxation techniques, and heuristic distance estimates.",
      prerequisites: ["Basic Graphs (Adjacency Lists)", "Binary Heaps"],
      keyTakeaways: [
        "Dijkstra algorithm uses a greedy approach with a priority queue achieving O((V + E) log V) complexity.",
        "A* search enhances Dijkstra by adding an admissible heuristic function h(n) <= h*(n).",
        "Edge relaxation updates shortest distances whenever distance[u] + weight(u, v) < distance[v]."
      ],
      timestamps: [
        { time: "00:00", title: "Graph representation: Matrix vs Adjacency List" },
        { time: "06:15", title: "Dijkstra algorithm step-by-step trace" },
        { time: "14:20", title: "Why Dijkstra fails with negative weight edges" },
        { time: "20:05", title: "A* Search & Euclidean / Manhattan heuristics" },
        { time: "27:40", title: "Complexity analysis & real-world routing systems" }
      ],
      tags: ["Algorithms", "Graphs", "Dijkstra", "Heuristics"]
    },
    {
      id: "vid-4",
      title: "Quantum Superposition & Entanglement Demystified",
      channel: "Quantum Frontier",
      channelAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
      youtubeId: "zNzzGgr2mhk",
      subject: "quantum",
      duration: "21m 50s",
      durationSeconds: 1310,
      rating: 4.92,
      reviewsCount: 1840,
      matchScore: 96,
      difficulty: "Beginner to Intermediate",
      summary: "A conceptual yet rigorous explanation of qubits, state vectors on the Bloch sphere, Hadamard gates, and Bell state creation without esoteric mathematical fog.",
      prerequisites: ["Complex Numbers", "Basic 2D Vector Spaces"],
      keyTakeaways: [
        "A qubit state is represented by |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1.",
        "Measurement collapses a superposition into an eigenstate probabilistically.",
        "Quantum entanglement binds two or more particles such that quantum state cannot be factored into independent states."
      ],
      timestamps: [
        { time: "00:00", title: "Classical bits vs Quantum states" },
        { time: "04:50", title: "The Bloch Sphere geometric model" },
        { time: "09:30", title: "Quantum Logic Gates: Pauli-X, Z, and Hadamard" },
        { time: "14:45", title: "Creating the Bell State: CNOT + Hadamard" },
        { time: "18:20", title: "Quantum Teleportation & No-Cloning Theorem" }
      ],
      tags: ["Quantum", "Physics", "Bloch Sphere", "Qubits"]
    },
    {
      id: "vid-5",
      title: "Synaptic Plasticity & How the Brain Learns",
      channel: "NeuroSci Institute",
      channelAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&auto=format&fit=crop&q=80",
      youtubeId: "w_fnH03e7sU",
      subject: "neuroscience",
      duration: "19m 30s",
      durationSeconds: 1170,
      rating: 4.86,
      reviewsCount: 1650,
      matchScore: 92,
      difficulty: "Intermediate",
      summary: "Explore Long-Term Potentiation (LTP), NMDA receptor activation, neurotransmitter release, and how biological neural networks rewire themselves during active recall.",
      prerequisites: ["Cellular Biology Basics"],
      keyTakeaways: [
        "Hebb's rule: Neurons that fire together, wire together.",
        "NMDA receptors act as molecular coincidence detectors requiring both depolarization and glutamate binding.",
        "Dendritic spine remodeling is the biological substrate of persistent memory storage."
      ],
      timestamps: [
        { time: "00:00", title: "Structure of the chemical synapse" },
        { time: "05:10", title: "Action potential and neurotransmitter exocytosis" },
        { time: "10:30", title: "Long-Term Potentiation (LTP) mechanisms" },
        { time: "15:00", title: "Memory consolidation and sleep rhythms" }
      ],
      tags: ["Neuroscience", "Synapses", "Memory", "Biology"]
    },
    {
      id: "vid-6",
      title: "Event Loop, Concurrency & Microtasks in Modern JavaScript",
      channel: "Frontend Masters Lab",
      channelAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      youtubeId: "8aGhZQkoFbQ",
      subject: "webdev",
      duration: "26m 40s",
      durationSeconds: 1600,
      rating: 4.94,
      reviewsCount: 4210,
      matchScore: 97,
      difficulty: "Intermediate to Advanced",
      summary: "Deep dive into the V8 engine call stack, Task Queue (Macrotasks), Microtask Queue (Promises), and rendering pipeline phases.",
      prerequisites: ["Asynchronous JS (Promises, async/await)"],
      keyTakeaways: [
        "JavaScript is single-threaded in execution, but the runtime environment (browser/Node) provides asynchronous concurrency via libuv/Web APIs.",
        "Microtasks (Promise reactions, queueMicrotask) execute immediately after the current call stack clears, before any macrotask.",
        "RequestAnimationFrame hooks directly into the browser paint cycle for smooth 60/120fps animations."
      ],
      timestamps: [
        { time: "00:00", title: "Call Stack execution model" },
        { time: "05:40", title: "Web APIs & Thread pool offloading" },
        { time: "11:20", title: "Macrotask vs Microtask order of priority" },
        { time: "18:15", title: "Common concurrency anti-patterns & starvation" },
        { time: "23:00", title: "Web Workers for compute-heavy offloading" }
      ],
      tags: ["JavaScript", "Event Loop", "V8", "Async"]
    }
  ],

  // Auto-Generated Sample AI Notes Library
  notesLibrary: [
    {
      id: "note-1",
      topic: "Neural Networks & Backpropagation",
      subject: "ai-ml",
      dateCreated: "2026-09-24",
      readTime: "7 min read",
      author: "LearnStream AI Assistant",
      summary: "Complete mathematical breakdown and intuitive mental model for multilayer perceptron training, cost minimization, and gradient flow.",
      keyFormulae: [
        { name: "Forward Activation", latex: "a^{[l]} = \\sigma(W^{[l]} a^{[l-1]} + b^{[l]})" },
        { name: "Mean Squared Error Loss", latex: "C = \\frac{1}{2n} \\sum ||y - a^{[L]}||^2" },
        { name: "Output Error Delta", latex: "\\delta^{[L]} = \\nabla_a C \\odot \\sigma'(z^{[L]})" },
        { name: "Backprop Error Recursion", latex: "\\delta^{[l]} = ((W^{[l+1]})^T \\delta^{[l+1]}) \\odot \\sigma'(z^{[l]})" },
        { name: "Weight Gradient", latex: "\\frac{\\partial C}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T" }
      ],
      sections: [
        {
          heading: "1. Core Philosophy: The Computational Graph",
          content: "Every neural network is a directed acyclic graph (DAG) of basic mathematical operations. Forward propagation evaluates expressions from inputs to outputs. Backpropagation applies the multivariate chain rule in reverse order to determine the gradient vector ∇C."
        },
        {
          heading: "2. The Four Fundamental Equations of Backprop",
          content: "1. Delta at output layer: Quantifies how fast the cost changes with respect to output activations multiplied by the derivative of the output non-linearity.\n2. Delta propagation: Error vector at layer l is reconstructed by transforming the error of layer l+1 through transposed weights.\n3. Rate of change of cost w.r.t. bias equals delta.\n4. Rate of change of cost w.r.t. weight equals delta times previous layer activation transpose."
        },
        {
          heading: "3. Vanishing & Exploding Gradients",
          content: "When using saturating activation functions like Sigmoid or Tanh, derivatives are at most 0.25. Multiplying many small factors across 20+ layers causes gradients to decay exponentially toward zero, preventing earlier layers from learning. Modern deep learning solves this via ReLU/Leaky ReLU/GELU, Batch Normalization, and Residual connections."
        },
        {
          heading: "4. Practical Optimization Tricks",
          content: "• Adam Optimizer (Adaptive Moment Estimation): Combines momentum (exponential moving average of gradients) and RMSprop (scaling by root mean squared past gradients).\n• Learning Rate Warmup & Cosine Annealing: Prevents catastrophic early weight destabilization.\n• Weight Decay (L2 Regularization): Penalizes oversized Euclidean norms of weight tensors to inhibit memorization."
        }
      ],
      flashcards: [
        { front: "What does the symbol ⊙ represent in backprop equations?", back: "The Hadamard (element-wise) product between two vectors or matrices." },
        { front: "Why does ReLU avoid vanishing gradients for positive inputs?", back: "Because the derivative of ReLU for all x > 0 is exactly 1, preserving gradient magnitude through deep layers." },
        { front: "What is the primary computational cost of backpropagation?", back: "Transposed matrix multiplications during recursive error delta propagation." }
      ]
    },
    {
      id: "note-2",
      topic: "Graph Algorithms: Shortest Paths & Heuristics",
      subject: "dsa",
      dateCreated: "2026-09-22",
      readTime: "6 min read",
      author: "LearnStream AI Assistant",
      summary: "Comprehensive guide to Dijkstra's algorithm, Bellman-Ford, Floyd-Warshall, and A* Pathfinding heuristics with space-time complexity analysis.",
      keyFormulae: [
        { name: "Edge Relaxation Condition", latex: "if \\; dist[u] + w(u, v) < dist[v] \\implies dist[v] = dist[u] + w(u, v)" },
        { name: "A* Evaluation Function", latex: "f(n) = g(n) + h(n)" },
        { name: "Heuristic Admissibility", latex: "h(n) \\le h^*(n) \\quad \\forall n" }
      ],
      sections: [
        {
          heading: "1. Dijkstra's Algorithm: Greedy Invariant",
          content: "Dijkstra maintains a set of visited vertices whose minimum distance from the source is finalized. At each iteration, it extracts the unvisited vertex with the minimum tentative distance using a Priority Queue (Min-Heap). Works only with non-negative edge weights."
        },
        {
          heading: "2. The A* Search Algorithm",
          content: "A* guides the search frontier toward the target using a heuristic function h(n). If the heuristic is admissible (never overestimates the true cost to reach the goal) and consistent (satisfies the triangle inequality), A* is guaranteed to return the mathematically optimal shortest path while visiting far fewer nodes than Dijkstra."
        },
        {
          heading: "3. Handling Negative Weights: Bellman-Ford",
          content: "When negative edges exist, Dijkstra can make premature greedy commitments that fail. Bellman-Ford relaxes all |E| edges |V| - 1 times. A subsequent |V|-th iteration allows detection of negative weight cycles."
        }
      ],
      flashcards: [
        { front: "What is the time complexity of Dijkstra using a Min-Heap?", back: "O((V + E) log V), where V is the number of vertices and E is the number of edges." },
        { front: "What happens if an A* heuristic is not admissible?", back: "The algorithm is no longer guaranteed to find the true shortest path; it may return a suboptimal path." }
      ]
    },
    {
      id: "note-3",
      topic: "Quantum Superposition & Bell States",
      subject: "quantum",
      dateCreated: "2026-09-20",
      readTime: "8 min read",
      author: "LearnStream AI Assistant",
      summary: "Theoretical foundations of single and multi-qubit systems, unitary matrix transformations, quantum entanglement, and measurement postulation.",
      keyFormulae: [
        { name: "Qubit State Vector", latex: "|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle, \\quad |\\alpha|^2 + |\\beta|^2 = 1" },
        { name: "Hadamard Gate", latex: "H = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}" },
        { name: "Maximally Entangled Bell State |Φ+⟩", latex: "|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)" }
      ],
      sections: [
        {
          heading: "1. The Qubit & The Bloch Sphere",
          content: "A classical bit is strictly 0 or 1. A quantum bit exists in a linear superposition of orthogonal basis vectors |0⟩ and |1⟩. Any single-qubit pure state corresponds to a unique point on the surface of the three-dimensional Bloch sphere."
        },
        {
          heading: "2. Quantum Entanglement & Non-Locality",
          content: "Two qubits are entangled when their composite state in Hilbert space cannot be written as a tensor product of individual qubit states: |ψ_AB⟩ ≠ |ψ_A⟩ ⊗ |ψ_B⟩. Measuring qubit A instantaneously dictates the measurement probability of qubit B regardless of spatial separation."
        }
      ],
      flashcards: [
        { front: "What is the probability of measuring state |0⟩ in state α|0⟩ + β|1⟩?", back: "|α|² (the squared magnitude of the complex probability amplitude)." },
        { front: "What does the No-Cloning Theorem establish?", back: "It is mathematically impossible to create an identical copy of an arbitrary unknown quantum state." }
      ]
    }
  ],

  // Interactive Quiz Questions Pool
  quizzes: [
    {
      id: "quiz-ai-1",
      topic: "Deep Learning & Neural Architectures",
      subject: "ai-ml",
      questions: [
        {
          id: "q1",
          question: "Which of the following activation functions completely avoids the vanishing gradient problem for positive input values?",
          options: [
            "Sigmoid function",
            "Rectified Linear Unit (ReLU)",
            "Hyperbolic Tangent (tanh)",
            "Softmax function"
          ],
          correct: 1,
          hint: "Think about which function has a constant derivative of 1 when x > 0.",
          explanation: "For any x > 0, the derivative of ReLU is exactly 1.0. This prevents gradients from shrinking exponentially during backpropagation through many hidden layers."
        },
        {
          id: "q2",
          question: "In the Transformer architecture, what is the computational complexity of standard self-attention with respect to sequence length N?",
          options: [
            "O(N)",
            "O(N log N)",
            "O(N²)",
            "O(N³)"
          ],
          correct: 2,
          hint: "Every token computes an attention score against every other token in the sequence.",
          explanation: "Because an N×N attention matrix is computed (Q × K^T), standard self-attention scales quadratically with sequence length: O(N²)."
        },
        {
          id: "q3",
          question: "What is the primary role of the Query, Key, and Value vectors in Multi-Head Attention?",
          options: [
            "To compress the vocabulary size into integers",
            "To project embeddings into semantic subspace roles for dynamic contextual weighting",
            "To act as convolutional kernel filters across time",
            "To calculate loss gradients directly without backprop"
          ],
          correct: 1,
          hint: "Consider how database searches use a query to match keys and extract corresponding values.",
          explanation: "Linear projections create Q, K, and V vectors allowing tokens to query relevant context (keys) and retrieve weighted semantic content (values)."
        },
        {
          id: "q4",
          question: "Why does the Adam optimizer generally converge faster than standard Stochastic Gradient Descent (SGD)?",
          options: [
            "It computes the full Hessian matrix every step",
            "It incorporates both first-moment momentum and second-moment adaptive learning rate scaling",
            "It discards past gradients to prevent overfitting",
            "It uses quantum probabilistic updates"
          ],
          correct: 1,
          hint: "Adam stands for 'Adaptive Moment Estimation'.",
          explanation: "Adam keeps running exponential averages of both past gradients (momentum) and squared gradients (variance), enabling robust step sizes across varying parameter landscapes."
        },
        {
          id: "q5",
          question: "What mathematical property ensures that Softmax outputs form a valid probability distribution?",
          options: [
            "The outputs are unbounded and symmetric",
            "Every output is in the interval [0, 1] and the sum of all outputs equals 1",
            "The determinant of the output matrix is zero",
            "The values are always integers"
          ],
          correct: 1,
          hint: "Probabilities must always be positive and sum up to unity.",
          explanation: "Softmax exponentiates logits (making them positive) and divides by the total sum of exponentials, strictly enforcing that ∑ p_i = 1."
        }
      ]
    },
    {
      id: "quiz-dsa-1",
      topic: "Algorithms & Complex Data Structures",
      subject: "dsa",
      questions: [
        {
          id: "qd1",
          question: "What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST)?",
          options: [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N log N)"
          ],
          correct: 2,
          hint: "Consider what happens if elements are inserted in already sorted ascending order.",
          explanation: "When elements are inserted in sorted order, an unbalanced BST degenerates into a singly linked list with height N, resulting in O(N) search time."
        },
        {
          id: "qd2",
          question: "Which graph shortest-path algorithm can correctly handle graphs with negative edge weights as long as there are no negative cycles?",
          options: [
            "Dijkstra's Algorithm",
            "Bellman-Ford Algorithm",
            "Kruskal's Algorithm",
            "Prim's Algorithm"
          ],
          correct: 1,
          hint: "This algorithm relaxes all edges |V| - 1 times.",
          explanation: "Bellman-Ford systematically relaxes all edges |V| - 1 times, correctly finding shortest paths even with negative edge weights and detecting negative cycles."
        },
        {
          id: "qd3",
          question: "In the A* search algorithm, what condition must the heuristic function h(n) satisfy to guarantee finding the optimal shortest path?",
          options: [
            "h(n) must equal 0 everywhere",
            "h(n) must be admissible (never overestimate true remaining cost)",
            "h(n) must be greater than total path length",
            "h(n) must be randomly distributed"
          ],
          correct: 1,
          hint: "If the heuristic thinks the goal is further than it really is, it might discard the best path.",
          explanation: "Admissibility ensures h(n) <= h*(n). This guarantees that A* never prematurely dismisses a true shortest path."
        }
      ]
    }
  ],

  // Full-Length Realistic Mock Tests
  mockTests: [
    {
      id: "mock-1",
      title: "AI Engineer & Machine Learning Specialist Certification Test",
      subject: "ai-ml",
      difficulty: "Advanced",
      durationMinutes: 20,
      totalQuestions: 10,
      passingScore: 70,
      instructions: "This timed exam simulates technical qualification tests used by leading AI labs. You can flag questions for review, jump across the question palette, and view instant performance analytics upon submission.",
      questions: [
        {
          id: "mt1-q1",
          section: "Foundations of Optimization",
          question: "Suppose the cost function surface has an ill-conditioned curvature with a very steep ravine in one dimension and a flat valley in another. Standard SGD oscillates wildly. Which technique specifically counteracts this by dampening perpendicular oscillations while accelerating along the valley?",
          options: [
            "Gradient clipping to ±0.1",
            "Momentum (exponential moving average of gradients)",
            "Dropping all biases to zero",
            "Decreasing batch size to 1"
          ],
          correct: 1,
          explanation: "Momentum accumulates velocity along directions of consistent gradient while canceling out fluctuating perpendicular components, stabilizing descent in steep ravines."
        },
        {
          id: "mt1-q2",
          section: "Deep Architecture Mechanics",
          question: "In a Residual Network (ResNet), why does the skip connection y = F(x) + x make training 100+ layer networks feasible?",
          options: [
            "It doubles the parameter count at every layer",
            "It creates an uninterrupted gradient highway: d(Loss)/dx = d(Loss)/dy * (dF/dx + 1), ensuring gradients never shrink to zero",
            "It converts non-linear activations into purely linear operations",
            "It eliminates the need for matrix multiplications"
          ],
          correct: 1,
          explanation: "Because of the '+ 1' term in the derivative of the identity mapping, gradients can flow directly from the final layer back to earlier layers without multiplying repeatedly by weight matrices < 1."
        },
        {
          id: "mt1-q3",
          section: "Transformer Models",
          question: "Why do Transformer encoders need Positional Encodings added to input embeddings?",
          options: [
            "Because self-attention is permutation-invariant: without positional cues, 'The dog bit the cat' and 'The cat bit the dog' produce identical contextual representations",
            "Because GPUs cannot process unindexed floating-point tensors",
            "To normalize activation values between -1 and +1",
            "To replace the word tokenization step"
          ],
          correct: 0,
          explanation: "Self-attention treats input sequences as unordered sets of tokens. Positional encodings (sinusoidal or learned) inject essential sequential order."
        },
        {
          id: "mt1-q4",
          section: "Regularization & Generalization",
          question: "How does Dropout with rate p = 0.5 act as an implicit ensemble during inference?",
          options: [
            "It averages the predictions of 2^N thinned sub-networks trained with shared parameters",
            "It permanently removes half the neurons from memory before deployment",
            "It randomly shuffles dataset labels during evaluation",
            "It runs the forward pass 100 times and takes the mode"
          ],
          correct: 0,
          explanation: "Dropout during training samples from 2^N possible sub-networks. At inference time, scaling weights by (1-p) approximates the geometric mean of all these sub-network predictions."
        },
        {
          id: "mt1-q5",
          section: "Foundations of Optimization",
          question: "Which of the following loss functions is most suitable for a multi-label classification problem where an input can belong to multiple categories simultaneously?",
          options: [
            "Categorical Cross-Entropy with Softmax activation",
            "Binary Cross-Entropy applied independently to each output with Sigmoid activations",
            "Mean Absolute Percentage Error (MAPE)",
            "Sparse Categorical Cross-Entropy"
          ],
          correct: 1,
          explanation: "Multi-label classification requires independent probability decisions per class. Binary Cross-Entropy with Sigmoid produces independent probabilities between 0 and 1."
        },
        {
          id: "mt1-q6",
          section: "Deep Architecture Mechanics",
          question: "What is the primary difference between Batch Normalization (BatchNorm) and Layer Normalization (LayerNorm)?",
          options: [
            "BatchNorm normalizes across the batch dimension for each feature; LayerNorm normalizes across the feature dimension for each individual sample",
            "BatchNorm only works with Convolutional networks; LayerNorm only works with Decision Trees",
            "LayerNorm requires a batch size of at least 256 to calculate variance",
            "There is no mathematical difference"
          ],
          correct: 0,
          explanation: "LayerNorm normalizes activations across the features of a single sample independently of other samples in the mini-batch, making it ideal for variable-length sequences and Transformers."
        },
        {
          id: "mt1-q7",
          section: "Transformer Models",
          question: "In the context of Large Language Models (LLMs), what does FlashAttention achieve?",
          options: [
            "Replaces Softmax with an approximate linear step",
            "Optimizes memory I/O between high-bandwidth GPU SRAM and HBM using tiling, eliminating large intermediate attention matrix reads/writes",
            "Quantizes all model weights from 16-bit to 1-bit integers",
            "Trains models exclusively on flash memory hard drives"
          ],
          correct: 1,
          explanation: "FlashAttention reorders the attention computation into tiles that fit entirely inside GPU fast SRAM, reducing slow HBM memory accesses by an order of magnitude without any mathematical approximation."
        },
        {
          id: "mt1-q8",
          section: "Evaluation & Metrics",
          question: "When evaluating a machine learning classifier on a highly imbalanced dataset (e.g., 99.8% negative and 0.2% positive fraud detection), which metric is LEAST informative?",
          options: [
            "Precision-Recall AUC (PR-AUC)",
            "F1-Score",
            "Raw Classification Accuracy",
            "Recall at 95% Precision"
          ],
          correct: 2,
          explanation: "A naive classifier that blindly predicts 'No Fraud' every time achieves 99.8% raw accuracy while detecting zero actual fraud cases, making accuracy highly misleading on imbalanced datasets."
        },
        {
          id: "mt1-q9",
          section: "Foundations of Optimization",
          question: "What is the key advantage of Stochastic Gradient Descent with Mini-Batches over pure Full-Batch Gradient Descent?",
          options: [
            "Mini-batches introduce beneficial stochastic noise that helps escape saddle points and poor local minima, while fitting efficiently into GPU VRAM",
            "Mini-batches compute mathematically exact true dataset gradients every iteration",
            "Mini-batches guarantee zero variance in loss updates",
            "Mini-batches require no learning rate hyperparameter"
          ],
          correct: 0,
          explanation: "Mini-batch sampling provides both computational parallelism on GPUs and stochastic gradient noise that prevents optimization from getting trapped in shallow sub-optimal basins."
        },
        {
          id: "mt1-q10",
          section: "Evaluation & Metrics",
          question: "What phenomenon occurs when a model fits training data noise so closely that its empirical training loss approaches zero while its validation loss begins escalating?",
          options: [
            "High Bias / Underfitting",
            "High Variance / Overfitting",
            "Gradient Explosion",
            "Dead ReLU Collapse"
          ],
          correct: 1,
          explanation: "Overfitting (high variance) occurs when a model memorizes sample-specific noise in the training set, failing to generalize to unseen test distributions."
        }
      ]
    },
    {
      id: "mock-2",
      title: "Data Structures, Algorithms & System Problem Solving Exam",
      subject: "dsa",
      difficulty: "Intermediate",
      durationMinutes: 15,
      totalQuestions: 6,
      passingScore: 66,
      instructions: "A high-stakes assessment testing algorithmic efficiency, Big-O reasoning, and dynamic programming.",
      questions: [
        {
          id: "mt2-q1",
          section: "Algorithmic Complexity",
          question: "What is the average and worst-case time complexity of QuickSort?",
          options: [
            "Average: O(N log N), Worst: O(N²)",
            "Average: O(N²), Worst: O(N³)",
            "Average: O(N), Worst: O(N log N)",
            "Average: O(log N), Worst: O(N)"
          ],
          correct: 0,
          explanation: "With balanced partitions QuickSort runs in O(N log N). However, if an extreme pivot is picked repeatedly on already-sorted arrays, it degenerates into O(N²)."
        },
        {
          id: "mt2-q2",
          section: "Data Structures",
          question: "Which data structure provides O(1) amortized insertion, O(1) amortized deletion, and O(1) random key lookup?",
          options: [
            "Hash Table (HashMap)",
            "Red-Black Tree",
            "Max-Heap",
            "Doubly Linked List"
          ],
          correct: 0,
          explanation: "A Hash Table with uniform hashing and dynamic bucket resizing achieves O(1) average/amortized time for insert, delete, and search."
        },
        {
          id: "mt2-q3",
          section: "Dynamic Programming",
          question: "The 0/1 Knapsack problem with N items and weight capacity W can be solved in pseudo-polynomial time of:",
          options: [
            "O(N * W)",
            "O(2^N)",
            "O(N!)",
            "O(W log N)"
          ],
          correct: 0,
          explanation: "Using dynamic programming table dp[i][w], the time complexity is O(N * W). It is called pseudo-polynomial because W depends on the numerical value of the input."
        },
        {
          id: "mt2-q4",
          section: "Graph Theory",
          question: "To detect cycles in a directed graph, which traversal approach with node color states (White, Gray, Black) is typically used?",
          options: [
            "Depth First Search (DFS) detecting a back edge to a Gray node",
            "Breadth First Search (BFS) starting from any arbitrary leaf",
            "Dijkstra's priority queue without visited array",
            "Binary Search on topological indices"
          ],
          correct: 0,
          explanation: "In DFS cycle detection: White = unvisited, Gray = currently on the recursion stack, Black = completed. Encountering a Gray node indicates a cycle (back edge)."
        },
        {
          id: "mt2-q5",
          section: "Data Structures",
          question: "What is the minimum number of comparisons required in the worst-case to sort N elements using comparison-based sorting algorithms?",
          options: [
            "Ω(N log N)",
            "Ω(N)",
            "Ω(N²)",
            "Ω(log N)"
          ],
          correct: 0,
          explanation: "By decision tree theory, a binary decision tree for sorting N elements has N! leaves. The height is at least log2(N!) = Ω(N log N)."
        },
        {
          id: "mt2-q6",
          section: "Algorithmic Complexity",
          question: "Given a monotonically increasing function f(x), which algorithm finds the integer x such that f(x) == Target in O(log Range) steps?",
          options: [
            "Binary Search",
            "Linear Probe",
            "Depth-First Search",
            "Bubble Sort"
          ],
          correct: 0,
          explanation: "Binary search repeatedly halves the search space [low, high], finding target values in logarithmic time O(log N)."
        }
      ]
    }
  ],

  // Performance Analytics Data for Charts
  analytics: {
    radarData: {
      labels: ["Conceptual Depth", "Problem Solving", "Speed & Agility", "Retention & Recall", "Code Implementation", "Consistency"],
      studentScores: [92, 85, 78, 90, 88, 96],
      cohortAverage: [72, 68, 70, 65, 74, 60]
    },
    weeklyHours: [
      { day: "Mon", hours: 2.5, goal: 2.0 },
      { day: "Tue", hours: 3.1, goal: 2.0 },
      { day: "Wed", hours: 1.8, goal: 2.0 },
      { day: "Thu", hours: 3.4, goal: 2.0 },
      { day: "Fri", hours: 2.2, goal: 2.0 },
      { day: "Sat", hours: 4.5, goal: 2.5 },
      { day: "Sun", hours: 3.8, goal: 2.5 }
    ],
    topicMastery: [
      { name: "Neural Networks & Backpropagation", score: 94, status: "Mastered", color: "#10b981" },
      { name: "Transformer & Attention Mechanisms", score: 91, status: "Mastered", color: "#10b981" },
      { name: "Graph Shortest Path & Heuristics", score: 82, status: "Proficient", color: "#6366f1" },
      { name: "Dynamic Programming Memoization", score: 68, status: "Needs Review", color: "#f59e0b" },
      { name: "Quantum Bloch Sphere Transformations", score: 62, status: "Needs Review", color: "#ef4444" },
      { name: "JS Event Loop & Microtasks", score: 88, status: "Proficient", color: "#6366f1" }
    ],
    aiRecommendations: [
      {
        type: "review",
        title: "Review Quantum State Transformations",
        reason: "You scored 62% in Bloch Sphere mechanics during your recent test.",
        actionLabel: "Generate Notes & Flashcards",
        actionSubject: "quantum"
      },
      {
        type: "practice",
        title: "Practice 5 Dynamic Programming Problems",
        reason: "Your speed on 0/1 Knapsack questions was 35% below your average velocity.",
        actionLabel: "Launch Mini Quiz",
        actionSubject: "dsa"
      },
      {
        type: "advance",
        title: "Explore FlashAttention & Kernel Tiling",
        reason: "You scored 99% in Transformer mechanics. Ready for hardware-level optimizations!",
        actionLabel: "Watch Next Lesson",
        actionSubject: "ai-ml"
      }
    ]
  }
};
