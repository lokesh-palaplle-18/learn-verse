// content.js — LearnVerse full content (topics, 6 points each, unique code examples)

export const SUBJECTS = [

// ══════════════════════════════════════════════════════════════════
// PYTHON
// ══════════════════════════════════════════════════════════════════
{
  id:'python', title:'Python', subtitle:'The Language of AI & Data',
  color:'#4FC3F7', dim:'rgba(79,195,247,0.1)', icon:'fa-brands fa-python',
  pos:{x:-9,y:0.5,z:18}, r:2.5, geo:'sphere',
  topics:[
    {
      name:'Variables & Data Types',
      points:[
        'int, float, str, bool, None — Python is dynamically typed; no type declaration needed',
        'type() returns the type; isinstance(x, int) checks type safely',
        'Type casting: int("42"), str(3.14), float("3.7")',
        'Multiple assignment in one line: a, b, c = 10, 20, 30',
        'Constants use UPPER_CASE by convention — Python has no true const keyword',
        'f-strings (Python 3.6+): f"Name: {name}, Age: {age}" — fastest string formatting'
      ],
      code:{lang:'python', label:'Variables, types & f-strings',
lines:`name   = "Lokesh"
score  = 97.5
passed = True
grade  = None

# f-string formatting
print(f"Student : {name}")
print(f"Score   : {score:.1f}%")
print(f"Passed  : {passed}")
print(f"Type of score : {type(score).__name__}")

# Multiple assignment + swap
x, y = 5, 10
x, y = y, x          # swap without temp variable
print(f"Swapped : x={x}, y={y}")`}
    },
    {
      name:'Data Structures',
      points:[
        'List [ ] — ordered, mutable; supports indexing, slicing, append, extend',
        'Tuple ( ) — ordered, immutable; faster than list, used as dict keys',
        'Set { } — unordered, unique elements; O(1) lookup, supports union/intersection',
        'Dictionary { } — key-value pairs; O(1) access; keys must be immutable',
        'List comprehension: [expr for x in iterable if condition] — concise & fast',
        'Nested structures: list of dicts is the backbone of most real-world data'
      ],
      code:{lang:'python', label:'Word frequency counter using dict + comprehension',
lines:`text = "apple banana apple cherry banana apple mango cherry"

# Build frequency dict using comprehension
freq = {word: text.split().count(word)
        for word in set(text.split())}

# Sort by count descending
ranked = sorted(freq.items(), key=lambda kv: kv[1], reverse=True)

print("Word Frequency Ranking:")
for rank, (word, count) in enumerate(ranked, 1):
    bar = "█" * count
    print(f"  {rank}. {word:<10} {bar} ({count})")`}
    },
    {
      name:'OOP — The 4 Pillars',
      points:[
        'Encapsulation: bundle data + methods in a class; use _ prefix for private attributes',
        'Inheritance: child class extends parent with class Dog(Animal) — reuse code',
        'Polymorphism: same method name behaves differently in each subclass (method overriding)',
        'Abstraction: expose only necessary interface; hide implementation details',
        '__init__ is the constructor; self refers to the current instance',
        'super().__init__() calls parent constructor — always call it in child __init__'
      ],
      code:{lang:'python', label:'Polymorphism — Animal speaks differently',
lines:`class Animal:
    def __init__(self, name):
        self._name = name          # encapsulated attribute

    def speak(self):               # to be overridden
        raise NotImplementedError

    def __str__(self):
        return f"{type(self).__name__}({self._name})"

class Dog(Animal):
    def speak(self): return f"{self._name} says: Woof!"

class Cat(Animal):
    def speak(self): return f"{self._name} says: Meow!"

class Duck(Animal):
    def speak(self): return f"{self._name} says: Quack!"

zoo = [Dog("Rex"), Cat("Whiskers"), Duck("Donald")]
for animal in zoo:           # polymorphism in action
    print(animal.speak())`}
    },
    {
      name:'Functions, Decorators & Generators',
      points:[
        'Default params, *args (tuple), **kwargs (dict) — flexible function signatures',
        'Lambda: lambda x, y: x + y — anonymous one-liner, used in map/filter/sorted',
        'Decorator: a function that wraps another to add behaviour (@timer, @login_required)',
        'Generator: uses yield instead of return — produces values lazily (memory efficient)',
        'map(fn, iterable) and filter(fn, iterable) apply functions without loops',
        'Closure: inner function captures variables from outer scope even after outer returns'
      ],
      code:{lang:'python', label:'Decorator that measures function execution time',
lines:`import time
import functools

def timer(func):
    @functools.wraps(func)        # preserves original function metadata
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"[timer] {func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

result = slow_sum(5_000_000)
print(f"Sum = {result:,}")`}
    },
    {
      name:'NumPy & Pandas',
      points:[
        'NumPy ndarray: vectorised operations run in C — 100× faster than Python loops',
        'Broadcasting: operations between arrays of different shapes work automatically',
        'Pandas DataFrame: 2D labelled table; Series is a single labelled column',
        '.groupby(col).agg() groups rows and applies aggregate functions per group',
        '.merge(df2, on="key") joins two DataFrames — similar to SQL JOIN',
        '.isnull(), .fillna(val), .dropna() — three steps to handle missing data'
      ],
      code:{lang:'python', label:'Sales analysis — group, aggregate, sort with Pandas',
lines:`import pandas as pd

data = {
    "region":  ["North","South","North","East","South","East","North"],
    "product": ["Laptop","Phone","Phone","Laptop","Laptop","Phone","Tablet"],
    "sales":   [1200, 850, 950, 1100, 780, 620, 430]
}
df = pd.DataFrame(data)

# Group by region → sum + mean sales
summary = (df.groupby("region")["sales"]
             .agg(total="sum", average="mean", orders="count")
             .sort_values("total", ascending=False))

print(summary.round(1))`}
    }
  ],
  practice:[
    {title:'Number Guessing Game',desc:'Build a random-number guessing game with too-high/too-low hints and attempt tracking.'},
    {title:'BankAccount Class',     desc:'OOP: deposit, withdraw, balance with custom InsufficientFundsError exception.'},
    {title:'CSV Clean & Plot',      desc:'Load CSV with Pandas, handle nulls, visualise with Matplotlib bar chart.'},
    {title:'Generator Pipeline',    desc:'Use a generator to yield prime numbers up to N — compare memory vs list approach.'}
  ]
},

// ══════════════════════════════════════════════════════════════════
// JAVA
// ══════════════════════════════════════════════════════════════════
{
  id:'java', title:'Java', subtitle:'Enterprise Backend Powerhouse',
  color:'#FF8C42', dim:'rgba(255,140,66,0.1)', icon:'fa-brands fa-java',
  pos:{x:10,y:-0.5,z:3}, r:2.3, geo:'sphere',
  topics:[
    {
      name:'Core OOP in Java',
      points:[
        'Every Java program lives inside a class — public class MyClass { }',
        '4 access modifiers: public (all), private (class only), protected (package+child), default (package)',
        'Constructor: same name as class, no return type — initialises the object state',
        'this keyword refers to current instance; useful when param name matches field name',
        'Static members belong to the class, not to any instance — shared across all objects',
        'Method overloading: same method name, different parameter types — compile-time polymorphism'
      ],
      code:{lang:'java', label:'BankAccount — constructor, this, encapsulation',
lines:`public class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double initialBalance) {
        this.owner   = owner;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalArgumentException("Insufficient funds");
        balance -= amount;
    }

    public double getBalance() { return balance; }

    @Override
    public String toString() {
        return owner + " | Balance: ₹" + balance;
    }
}`}
    },
    {
      name:'Collections Framework',
      points:[
        'ArrayList<T>: resizable array — O(1) get, O(n) insert/delete in middle',
        'LinkedList<T>: doubly-linked — O(1) add/remove at ends, O(n) random access',
        'HashMap<K,V>: hash table — O(1) average get/put; keys must implement hashCode + equals',
        'HashSet<T>: unique elements backed by HashMap — O(1) contains',
        'TreeMap<K,V>: sorted by natural order — O(log n) operations',
        'Use enhanced for-each on any Collection — all implement Iterable<T>'
      ],
      code:{lang:'java', label:'Top-3 words using HashMap + stream sort',
lines:`import java.util.*;
import java.util.stream.*;

public class WordRank {
  public static void main(String[] args) {
    String text = "java is fast java is safe java python java";

    Map<String, Long> freq = Arrays.stream(text.split(" "))
        .collect(Collectors.groupingBy(w -> w, Collectors.counting()));

    System.out.println("Top words:");
    freq.entrySet().stream()
        .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
        .limit(3)
        .forEach(e -> System.out.printf("  %-8s → %d%n", e.getKey(), e.getValue()));
  }
}`}
    },
    {
      name:'Exception Handling',
      points:[
        'Checked exceptions: must declare with throws or catch — IOException, SQLException',
        'Unchecked (RuntimeException): NullPointerException, IndexOutOfBoundsException — no forced handling',
        'try-catch-finally: catch handles error; finally always runs (close resources)',
        'try-with-resources: auto-closes Closeable objects — cleaner than finally',
        'Custom exception: extend Exception (checked) or RuntimeException (unchecked)',
        'Multi-catch: catch (IOException | SQLException e) — reduces boilerplate'
      ],
      code:{lang:'java', label:'Custom InsufficientFundsException with try-catch',
lines:`class InsufficientFundsException extends RuntimeException {
    private final double shortfall;

    public InsufficientFundsException(double shortfall) {
        super(String.format("Short by ₹%.2f", shortfall));
        this.shortfall = shortfall;
    }
    public double getShortfall() { return shortfall; }
}

class Wallet {
    private double balance = 500.0;

    public void pay(double amount) {
        if (amount > balance)
            throw new InsufficientFundsException(amount - balance);
        balance -= amount;
        System.out.println("Paid ₹" + amount + " | Left: ₹" + balance);
    }
}
// Usage
try {
    new Wallet().pay(700);
} catch (InsufficientFundsException e) {
    System.out.println("Failed: " + e.getMessage());
}`}
    },
    {
      name:'Java 8 — Lambdas & Streams',
      points:[
        'Lambda: (a, b) -> a + b replaces verbose anonymous class implementations',
        'Functional interface: exactly one abstract method — @FunctionalInterface annotation',
        'Method reference: Integer::parseInt is shorthand for x -> Integer.parseInt(x)',
        'Intermediate stream ops: filter(), map(), sorted(), distinct() — lazy, not executed yet',
        'Terminal stream ops: collect(), forEach(), count(), reduce() — trigger execution',
        'Collectors.groupingBy(), toList(), toMap(), joining() — common collectors'
      ],
      code:{lang:'java', label:'Employee stream — filter, map, sort, collect',
lines:`import java.util.*;
import java.util.stream.*;

record Employee(String name, String dept, double salary) {}

public class StreamDemo {
  public static void main(String[] args) {
    List<Employee> staff = List.of(
        new Employee("Alice", "Engineering", 95000),
        new Employee("Bob",   "Marketing",   62000),
        new Employee("Carol", "Engineering", 88000),
        new Employee("Dave",  "Marketing",   71000)
    );

    // Engineers earning > 80k, sorted by salary desc
    staff.stream()
         .filter(e -> e.dept().equals("Engineering") && e.salary() > 80_000)
         .sorted(Comparator.comparingDouble(Employee::salary).reversed())
         .map(e -> e.name() + " → ₹" + e.salary())
         .forEach(System.out::println);
  }
}`}
    },
    {
      name:'Optional & java.time',
      points:[
        'Optional<T> wraps a value that may be absent — eliminates NullPointerException',
        'Optional.of(val) for non-null; Optional.ofNullable(val) when null is possible',
        '.orElse(default), .orElseGet(() -> fn()), .orElseThrow() — safe extraction',
        'LocalDate, LocalTime, LocalDateTime — immutable and thread-safe date/time',
        'Period for date differences (years/months/days); Duration for time differences',
        'DateTimeFormatter.ofPattern("dd-MM-yyyy") for custom formatting'
      ],
      code:{lang:'java', label:'Project deadline tracker using LocalDate + Optional',
lines:`import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

public class DeadlineTracker {
  public static void main(String[] args) {
    LocalDate today    = LocalDate.now();
    LocalDate deadline = LocalDate.of(2026, 12, 31);

    Period gap = Period.between(today, deadline);
    System.out.printf("Deadline in %d months, %d days%n",
        gap.toTotalMonths(), gap.getDays());

    // Optional — user may not set a reminder
    Optional<LocalDate> reminder = Optional.of(deadline.minusDays(7));
    String msg = reminder
        .filter(d -> d.isAfter(today))
        .map(d -> "Reminder set: " + d.format(DateTimeFormatter.ofPattern("MMM dd, yyyy")))
        .orElse("No upcoming reminder");

    System.out.println(msg);
  }
}`}
    }
  ],
  practice:[
    {title:'String Reverse & Palindrome',  desc:'Reverse without built-ins; check palindrome — no library methods.'},
    {title:'Custom Exception',              desc:'InsufficientFundsException for a bank with try-catch-finally.'},
    {title:'Stream Filter/Map/Collect',     desc:'Java 8: filter employees by salary, map to names, sorted list.'},
    {title:'Optional Chain',                desc:'Parse a config map that may have missing keys — use Optional chain.'}
  ]
},

// ══════════════════════════════════════════════════════════════════
// SQL
// ══════════════════════════════════════════════════════════════════
{
  id:'sql', title:'SQL', subtitle:'Structured Data Mastery',
  color:'#00E5FF', dim:'rgba(0,229,255,0.1)', icon:'fa-solid fa-database',
  pos:{x:-10,y:1,z:-13}, r:2.2, geo:'discs',
  topics:[
    {
      name:'Basic Queries',
      points:[
        'SELECT col1, col2 FROM table — prefer explicit columns over SELECT *',
        'WHERE filters rows: =, !=, >, <, BETWEEN x AND y, IN (a,b,c), LIKE "%pattern%"',
        'ORDER BY col ASC|DESC — default is ASC; multiple columns allowed',
        'LIMIT n (MySQL/Postgres) or TOP n (SQL Server) — restricts returned rows',
        'DISTINCT eliminates duplicate rows from the result set',
        'Column aliases: SELECT salary * 12 AS annual_salary — improves readability'
      ],
      code:{lang:'sql', label:'Top 5 customers by total spend',
lines:`-- Top 5 customers with total spend > 1000
SELECT
    c.customer_name                    AS customer,
    COUNT(o.order_id)                  AS total_orders,
    SUM(o.amount)                      AS total_spent,
    ROUND(AVG(o.amount), 2)            AS avg_order
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.order_date >= '2026-01-01'
GROUP BY c.customer_name
HAVING SUM(o.amount) > 1000
ORDER BY total_spent DESC
LIMIT 5;`}
    },
    {
      name:'Joins',
      points:[
        'INNER JOIN: returns only rows that have a match in BOTH tables',
        'LEFT JOIN: all rows from the left table + matched rows from right (NULL if no match)',
        'RIGHT JOIN: mirror of LEFT — all from right + matched from left',
        'FULL OUTER JOIN: all rows from both tables; NULLs where no match on either side',
        'SELF JOIN: join a table to itself — used for hierarchies (manager → employee)',
        'JOIN condition written as ON t1.id = t2.foreign_key — always verify foreign key'
      ],
      code:{lang:'sql', label:'Student-course enrollment with LEFT JOIN to find unenrolled',
lines:`-- All students, showing their enrolled course (NULL if none)
SELECT
    s.student_name,
    c.course_title,
    e.enrolled_on
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
LEFT JOIN courses c     ON e.course_id = c.id
ORDER BY s.student_name;

-- Find students not enrolled in any course
SELECT student_name
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
WHERE e.student_id IS NULL;`}
    },
    {
      name:'Aggregations & GROUP BY',
      points:[
        'COUNT(*) counts all rows; COUNT(col) skips NULLs in that column',
        'SUM, AVG, MAX, MIN — applied per group defined by GROUP BY',
        'GROUP BY: one result row per unique value of the grouped column',
        'HAVING filters groups after aggregation — WHERE filters rows before',
        'NULL in SUM/AVG: silently ignored — only COUNT(*) includes NULL rows',
        'Combine GROUP BY with CASE WHEN for conditional aggregation'
      ],
      code:{lang:'sql', label:'Monthly sales report by region with HAVING filter',
lines:`SELECT
    region,
    EXTRACT(MONTH FROM sale_date)          AS month,
    COUNT(*)                               AS num_sales,
    SUM(revenue)                           AS total_revenue,
    ROUND(AVG(revenue), 2)                 AS avg_revenue,
    MAX(revenue)                           AS best_sale,
    SUM(CASE WHEN revenue > 500
             THEN revenue ELSE 0 END)      AS premium_revenue
FROM sales
WHERE EXTRACT(YEAR FROM sale_date) = 2026
GROUP BY region, EXTRACT(MONTH FROM sale_date)
HAVING SUM(revenue) > 10000
ORDER BY total_revenue DESC;`}
    },
    {
      name:'Window Functions',
      points:[
        'OVER() makes any aggregate a window function — does NOT collapse rows like GROUP BY',
        'PARTITION BY col resets the window calculation for each distinct value of col',
        'ORDER BY inside OVER() defines which rows come "before" the current one',
        'ROW_NUMBER(): unique sequential integers (1,2,3) — no ties',
        'RANK(): gaps after ties (1,2,2,4); DENSE_RANK(): no gaps (1,2,2,3)',
        'LAG(col,1) accesses previous row; LEAD(col,1) accesses next row'
      ],
      code:{lang:'sql', label:'Running total + department rank per employee',
lines:`SELECT
    name,
    department,
    salary,
    -- Running total within department
    SUM(salary) OVER (
        PARTITION BY department
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    )                                         AS running_total,
    -- Rank within department
    DENSE_RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    )                                         AS dept_rank,
    -- Salary vs previous employee
    salary - LAG(salary, 1, salary) OVER (
        PARTITION BY department ORDER BY salary DESC
    )                                         AS diff_from_above
FROM employees
ORDER BY department, dept_rank;`}
    },
    {
      name:'Database Design & Normalization',
      points:[
        '1NF: atomic values — each cell holds ONE value; no repeating groups or arrays',
        '2NF: 1NF + no partial dependency — every non-key column depends on the FULL primary key',
        '3NF: 2NF + no transitive dependency — non-key column must not depend on another non-key',
        'Primary key: uniquely identifies each row — NOT NULL, unique, immutable preferred',
        'Foreign key: column referencing another table\'s PK — enforces referential integrity',
        'Index on JOIN/WHERE columns speeds up reads but adds write overhead'
      ],
      code:{lang:'sql', label:'Library database schema in 3NF',
lines:`-- 3NF: books, members, loans — no redundant data

CREATE TABLE books (
    book_id   INT PRIMARY KEY AUTO_INCREMENT,
    title     VARCHAR(200) NOT NULL,
    author    VARCHAR(100) NOT NULL,
    isbn      CHAR(13) UNIQUE
);

CREATE TABLE members (
    member_id   INT PRIMARY KEY AUTO_INCREMENT,
    full_name   VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    joined_on   DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE loans (
    loan_id     INT PRIMARY KEY AUTO_INCREMENT,
    book_id     INT NOT NULL REFERENCES books(book_id),
    member_id   INT NOT NULL REFERENCES members(member_id),
    loaned_on   DATE NOT NULL,
    due_date    DATE NOT NULL,
    returned_on DATE                          -- NULL = still out
);

CREATE INDEX idx_loans_member ON loans(member_id);
CREATE INDEX idx_loans_book   ON loans(book_id);`}
    }
  ],
  practice:[
    {title:'Top 3 by Spend',          desc:'SUM + GROUP BY + ORDER BY + LIMIT — top 3 customers from orders table.'},
    {title:'Window Rank Challenge',    desc:'ROW_NUMBER() OVER(PARTITION BY dept) — 2nd-highest salary per dept.'},
    {title:'Join Master',              desc:'Practice all 4 join types on employees + departments — document NULLs.'},
    {title:'Library Schema + Queries', desc:'Design 3NF library DB, write 5 queries including a multi-table join.'}
  ]
},

// ══════════════════════════════════════════════════════════════════
// AI FUNDAMENTALS
// ══════════════════════════════════════════════════════════════════
{
  id:'ai', title:'AI Fundamentals', subtitle:'Understanding Intelligence',
  color:'#A78BFA', dim:'rgba(167,139,250,0.1)', icon:'fa-solid fa-brain',
  pos:{x:9,y:0.5,z:-28}, r:2.4, geo:'icosahedron',
  topics:[
    {
      name:'AI vs ML vs Deep Learning',
      points:[
        'AI (umbrella): any technique that makes a machine appear intelligent',
        'ML (subset of AI): algorithms that learn patterns from data without explicit rules',
        'Deep Learning (subset of ML): neural networks with many layers, learns features automatically',
        'Rule-based AI: handcrafted if-then logic — deterministic, interpretable, brittle',
        'Statistical ML: models trained on labelled data — SVM, Decision Tree, Random Forest',
        'DL advantage: works on unstructured data (images, audio, text) — no manual feature engineering'
      ],
      code:{lang:'python', label:'Choose approach based on data type and size',
lines:`def choose_approach(data_type, samples, needs_interpretability):
    """Returns recommended AI approach."""
    if data_type == "rules" or samples < 100:
        return "Rule-based AI — not enough data for learning"

    if data_type in ("tabular",) and needs_interpretability:
        return "Classical ML — Decision Tree / Logistic Regression"

    if data_type == "tabular" and samples > 1_000:
        return "Classical ML — Random Forest / Gradient Boosting"

    if data_type in ("image", "audio", "text") and samples > 10_000:
        return "Deep Learning — CNN / Transformer"

    return "Collect more labelled data first"

print(choose_approach("image",   50_000, False))  # Deep Learning
print(choose_approach("tabular",  3_000, True))   # Classical ML
print(choose_approach("rules",       50, True))   # Rule-based`}
    },
    {
      name:'History of AI',
      points:[
        '1950 — Alan Turing proposes the Turing Test: "Can machines think?"',
        '1956 — Dartmouth Conference: the term "Artificial Intelligence" is coined',
        '1980s — Expert systems boom, then first AI Winter due to overpromising',
        '1997 — IBM Deep Blue defeats world chess champion Garry Kasparov',
        '2012 — AlexNet wins ImageNet with 16% error (vs 26% runner-up) — DL breakthrough',
        '2017 — "Attention Is All You Need" paper introduces the Transformer architecture'
      ],
      code:{lang:'python', label:'AI milestones timeline dict — find by decade',
lines:`milestones = {
    1950: "Turing Test proposed — 'Can machines think?'",
    1956: "Dartmouth Conference — AI named as a field",
    1966: "ELIZA: first chatbot (pattern matching, no ML)",
    1980: "Expert systems boom — MYCIN, XCON",
    1987: "First AI Winter — funding collapses",
    1997: "Deep Blue beats Kasparov at chess",
    2006: "Hinton coin 'deep learning' — revival begins",
    2012: "AlexNet — ImageNet error drops 10 points",
    2017: "Transformer architecture published",
    2022: "ChatGPT reaches 100M users in 2 months"
}

decade = int(input("Enter decade (e.g. 2010): "))
events = {y:e for y,e in milestones.items()
          if decade <= y < decade + 10}
for year, event in sorted(events.items()):
    print(f"  {year} → {event}")`}
    },
    {
      name:'Narrow vs General AI',
      points:[
        'ANI (Narrow): excels at exactly ONE task — every AI product today is ANI',
        'AGI (General): human-level reasoning across ANY domain — does not exist yet',
        'ASI (Super): exceeds human intelligence on all tasks — purely hypothetical',
        'Turing Test: can a machine converse indistinguishably from a human for 5 minutes?',
        'Chinese Room (Searle): manipulating symbols ≠ understanding — AGI debate classic',
        'LLMs appear general but are still ANI — no persistent memory, no real-world goals'
      ],
      code:{lang:'python', label:'Classify real AI products as ANI / AGI / ASI',
lines:`products = {
    "ChatGPT":        "ANI — language generation only",
    "AlphaFold":      "ANI — protein structure prediction only",
    "Self-driving car":"ANI — driving in defined conditions",
    "Spam filter":    "ANI — binary email classification",
    "AlphaGo":        "ANI — Go board game only",
    "Human brain":    "AGI — general reasoning across domains",
    "Hypothetical X": "ASI — beyond human on all tasks"
}

for name, classification in products.items():
    level = classification.split(" — ")[0]
    color = {"ANI":"🟡", "AGI":"🟢", "ASI":"🔴"}.get(level, "⚪")
    print(f"  {color} {name:<22} → {classification}")`}
    },
    {
      name:'AI Applications',
      points:[
        'NLP: text classification, machine translation, summarisation, chatbots (GPT, BERT)',
        'Computer Vision: object detection (YOLO), face recognition, medical image analysis',
        'Recommendation Systems: collaborative filtering (Netflix) + content-based filtering',
        'Robotics: autonomous navigation (Boston Dynamics Spot), pick-and-place arms',
        'Healthcare: drug discovery (AlphaFold), radiology assistance, genomics analysis',
        'Finance: fraud detection, algorithmic trading, credit risk scoring'
      ],
      code:{lang:'python', label:'Sentiment analysis using TextBlob (no GPU needed)',
lines:`from textblob import TextBlob  # pip install textblob

reviews = [
    "The course was absolutely amazing and very clear!",
    "I did not understand the ML section at all.",
    "Pretty decent — could use more code examples.",
    "Worst explanation I have ever seen in my life.",
    "Fantastic content, well structured and concise."
]

print(f"{'Review':<50} {'Sentiment':<12} Score")
print("-" * 70)
for review in reviews:
    blob = TextBlob(review)
    score = blob.sentiment.polarity        # -1.0 to 1.0
    label = "POSITIVE" if score > 0.1 else "NEGATIVE" if score < -0.1 else "NEUTRAL"
    print(f"{review[:48]:<50} {label:<12} {score:+.2f}")`}
    },
    {
      name:'AI Ethics',
      points:[
        'Algorithmic bias: training data reflects historical inequalities → model inherits them',
        'Explainability: high-stakes decisions (loans, hiring) require interpretable models',
        'Privacy: facial recognition, data scraping without consent, GDPR implications',
        'Job displacement: automation replaces repetitive tasks — new roles also created',
        'Autonomous weapons: lethal decisions without human in the loop — active debate',
        'Frameworks: EU AI Act (2024), IEEE Ethically Aligned Design, model cards for documentation'
      ],
      code:{lang:'python', label:'Detect disparate prediction rates across groups (bias audit)',
lines:`# Simulated hiring model predictions by group
predictions = [
    {"name":"Alice", "group":"A", "hired":1, "qualified":1},
    {"name":"Bob",   "group":"B", "hired":0, "qualified":1},
    {"name":"Carol", "group":"A", "hired":1, "qualified":1},
    {"name":"Dave",  "group":"B", "hired":0, "qualified":1},
    {"name":"Eve",   "group":"A", "hired":1, "qualified":0},
]

from collections import defaultdict
rates = defaultdict(lambda: {"hired":0,"total":0})
for p in predictions:
    rates[p["group"]]["total"] += 1
    rates[p["group"]]["hired"] += p["hired"]

print("Hiring rate by group:")
for group, r in rates.items():
    rate = r["hired"] / r["total"]
    flag = "⚠️  BIAS DETECTED" if rate < 0.5 else "✅ OK"
    print(f"  Group {group}: {rate:.0%} hired  {flag}")`}
    }
  ],
  practice:[
    {title:'AI Type Classifier',   desc:'Classify 10 real apps (Siri, Netflix, AlphaGo) as AI / ML / DL.'},
    {title:'Ethics Case Study',    desc:'Analyse one real AI bias incident — propose 3 mitigation steps.'},
    {title:'Turing Test Debate',   desc:'Write a 200-word argument: can ChatGPT pass the Turing Test? Why / why not?'}
  ]
},

// ══════════════════════════════════════════════════════════════════
// MACHINE LEARNING
// ══════════════════════════════════════════════════════════════════
{
  id:'ml', title:'Machine Learning', subtitle:'The Learning System',
  color:'#00FF88', dim:'rgba(0,255,136,0.1)', icon:'fa-solid fa-chart-line',
  pos:{x:-2,y:-1.5,z:-44}, r:3.5, geo:'sphere-large',
  topics:[
    {
      name:'ML Workflow',
      points:[
        'Step 1 — Define: frame the problem as classification, regression, or clustering',
        'Step 2 — Collect: gather labelled data (quality > quantity); document data source',
        'Step 3 — EDA: plot distributions, check class balance, find correlations',
        'Step 4 — Preprocess: handle nulls, encode categoricals, scale features',
        'Step 5 — Train: fit model on training set; tune hyperparameters with CV',
        'Step 6 — Evaluate on held-out test set; deploy only when metrics meet threshold'
      ],
      code:{lang:'python', label:'End-to-end sklearn pipeline on Iris dataset',
lines:`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier
from sklearn.pipeline import make_pipeline

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

pipe = make_pipeline(
    StandardScaler(),
    DecisionTreeClassifier(max_depth=4, random_state=42)
)
pipe.fit(X_train, y_train)

cv_scores = cross_val_score(pipe, X_train, y_train, cv=5)
print(f"CV accuracy : {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")
print(f"Test accuracy: {pipe.score(X_test, y_test):.3f}")`}
    },
    {
      name:'Data Preprocessing',
      points:[
        'Missing values: impute with mean (numeric) or most frequent (categorical) or drop',
        'OneHotEncoder: turns "Red/Blue/Green" into 3 binary columns — for nominal categories',
        'LabelEncoder: turns "Low/Med/High" into 0/1/2 — only for ordinal categories',
        'StandardScaler: z-score normalisation — mean=0, std=1 — needed for SVM, KNN, LR',
        'MinMaxScaler: scales to [0,1] — use when you need bounded range (neural nets)',
        'ColumnTransformer: apply different transforms to different columns in one pipeline step'
      ],
      code:{lang:'python', label:'ColumnTransformer — different transforms per column type',
lines:`import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

data = pd.DataFrame({
    "age":    [25, None, 35, 28],
    "salary": [40000, 55000, None, 62000],
    "dept":   ["Eng", "HR", "Eng", None]
})

num_pipe = Pipeline([
    ("impute", SimpleImputer(strategy="mean")),
    ("scale",  StandardScaler())
])
cat_pipe = Pipeline([
    ("impute", SimpleImputer(strategy="most_frequent")),
    ("encode", OneHotEncoder(sparse_output=False, handle_unknown="ignore"))
])

ct = ColumnTransformer([
    ("num", num_pipe, ["age","salary"]),
    ("cat", cat_pipe, ["dept"])
])
result = ct.fit_transform(data)
print("Transformed shape:", result.shape)`}
    },
    {
      name:'Evaluation Metrics',
      points:[
        'Accuracy = (TP+TN)/(TP+TN+FP+FN) — misleading when classes are imbalanced',
        'Precision = TP/(TP+FP) — "of all positive predictions, how many were right?"',
        'Recall = TP/(TP+FN) — "of all actual positives, how many did we catch?"',
        'F1 = 2×(P×R)/(P+R) — harmonic mean, balances precision and recall',
        'AUC-ROC: area under ROC curve — 0.5 = random, 1.0 = perfect',
        'Confusion matrix is the source of all above metrics — always check it first'
      ],
      code:{lang:'python', label:'Build confusion matrix by hand, compute P/R/F1',
lines:`actual    = [1,0,1,1,0,1,0,0,1,0]
predicted = [1,0,1,0,0,1,1,0,1,0]

TP = sum(a==1 and p==1 for a,p in zip(actual,predicted))
TN = sum(a==0 and p==0 for a,p in zip(actual,predicted))
FP = sum(a==0 and p==1 for a,p in zip(actual,predicted))
FN = sum(a==1 and p==0 for a,p in zip(actual,predicted))

accuracy  = (TP+TN) / len(actual)
precision = TP / (TP+FP) if (TP+FP) else 0
recall    = TP / (TP+FN) if (TP+FN) else 0
f1        = 2*precision*recall/(precision+recall) if (precision+recall) else 0

print(f"Confusion Matrix:  TP={TP} TN={TN} FP={FP} FN={FN}")
print(f"Accuracy  : {accuracy:.2f}")
print(f"Precision : {precision:.2f}")
print(f"Recall    : {recall:.2f}")
print(f"F1-score  : {f1:.2f}")`}
    },
    {
      name:'Overfitting & Regularization',
      points:[
        'Underfitting: high bias — model too simple, poor on both train and test',
        'Overfitting: high variance — memorises training data, fails on unseen data',
        'Bias-variance tradeoff: as model complexity increases, bias ↓ but variance ↑',
        'L1 (Lasso): adds Σ|w| penalty → drives unimportant weights to exactly zero',
        'L2 (Ridge): adds Σw² penalty → shrinks all weights, keeps all features',
        'Cross-validation + early stopping + more data are the most effective fixes'
      ],
      code:{lang:'python', label:'Visualise overfitting — train vs test vs tree depth',
lines:`from sklearn.datasets import load_wine
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

X, y = load_wine(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)

print(f"{'Depth':<8} {'Train Acc':>10} {'Test Acc':>10}  Verdict")
print("-" * 45)
for depth in [1, 2, 3, 5, 8, None]:
    model = DecisionTreeClassifier(max_depth=depth, random_state=0)
    model.fit(X_tr, y_tr)
    tr = model.score(X_tr, y_tr)
    te = model.score(X_te, y_te)
    gap = tr - te
    verdict = ("underfit" if tr < 0.80 else
               "overfit"  if gap > 0.10 else "GOOD FIT")
    label = str(depth) if depth else "None"
    print(f"{label:<8} {tr:>10.3f} {te:>10.3f}  {verdict}")`}
    },
    {
      name:'scikit-learn API',
      points:[
        'Estimator API: every model has .fit(X,y), .predict(X), .score(X,y)',
        'Transformers additionally have .fit_transform(X) — learns + applies in one call',
        'Pipeline: make_pipeline(step1, step2, model) chains transforms + model safely',
        'GridSearchCV: exhaustive hyperparameter search; cross-validates each combination',
        'cross_val_score(model, X, y, cv=5) gives reliable unbiased performance estimate',
        'joblib.dump(model, "model.pkl") saves; joblib.load("model.pkl") reloads model'
      ],
      code:{lang:'python', label:'GridSearchCV to tune Random Forest on Breast Cancer dataset',
lines:`from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, train_test_split

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=1)

param_grid = {
    "n_estimators": [50, 100, 200],
    "max_depth":    [None, 5, 10],
    "min_samples_leaf": [1, 3]
}
gs = GridSearchCV(
    RandomForestClassifier(random_state=1),
    param_grid, cv=5, scoring="f1", n_jobs=-1, verbose=0
)
gs.fit(X_tr, y_tr)
print("Best params :", gs.best_params_)
print("CV F1       :", round(gs.best_score_, 3))
print("Test F1     :", round(gs.score(X_te, y_te), 3))`}
    }
  ],
  algorithms:[
    {name:'Linear Regression',  color:'#00FF88', formula:'ŷ = wx + b',                use:'Predict continuous values (prices, scores)', steps:['Plot data points','Initialise w=0, b=0','Compute ŷ = wx + b','Calculate MSE = mean((ŷ−y)²)','Update w,b via gradient descent','Repeat until loss converges']},
    {name:'Logistic Regression',color:'#4FC3F7', formula:'σ(z) = 1/(1+e⁻ᶻ)',        use:'Binary classification — spam or not',        steps:['Compute z = wx + b','Apply sigmoid → probability 0–1','Threshold 0.5 → class label','Minimise log-loss (cross-entropy)','Update weights via gradient','Predict on new data']},
    {name:'Decision Tree',      color:'#FF8C42', formula:'Gini = 1−Σpᵢ²',           use:'Interpretable classification & regression',  steps:['Start at root with full dataset','Choose split with lowest Gini/entropy','Create left/right child nodes','Recurse on each branch','Stop at max depth or pure leaf','Predict by leaf majority vote']},
    {name:'Random Forest',      color:'#A78BFA', formula:'ŷ = mode(T₁…Tₙ)',         use:'High accuracy, robust to overfitting',       steps:['Bootstrap n random subsamples','Train a Decision Tree on each','Random subset of features per split','Collect all tree predictions','Vote (class) or average (regression)','Final = ensemble output']},
    {name:'KNN',                color:'#F472B6', formula:'d=√Σ(xᵢ−yᵢ)²',           use:'Simple baseline — no training phase',        steps:['Choose K (e.g. K=5)','Store all training examples','Compute Euclidean distance to all','Find K nearest neighbours','Vote most common class','Return prediction']},
    {name:'SVM',                color:'#00E5FF', formula:'max 2/‖w‖',               use:'High-dim text and image classification',     steps:['Map data to feature space','Find maximum-margin hyperplane','Support vectors define the margin','Use kernel trick for non-linear','Soft-margin C controls tolerance','Predict by side of hyperplane']},
    {name:'Naive Bayes',        color:'#FBBF24', formula:'P(C|x)∝P(C)·ΠP(xᵢ|C)',   use:'Spam, sentiment, text classification',      steps:['Compute prior P(class)','Compute P(feature|class) from data','Assume feature independence','Multiply priors × likelihoods','Pick class with highest posterior','Fast even on small datasets']},
    {name:'Gradient Boosting',  color:'#2DD4BF', formula:'F(x)=Σαₘhₘ(x)',          use:'Top performer on tabular/Kaggle data',      steps:['Start with constant prediction','Compute residuals (actual − ŷ)','Fit a shallow tree to residuals','Add tree × learning rate α','Repeat M times','Sum all trees for final answer']}
  ],
  unsupervised:['K-Means: assign→update→repeat until centroids stable','Hierarchical Clustering: build a dendrogram, cut at desired level','PCA: find axes of maximum variance to reduce dimensions'],
  unsupervisedPractice:'Segment customers with K-Means on RFM data; reduce Iris 4D → 2D with PCA and plot.',
  rlFormula:'Q(s,a) ← Q(s,a) + α[r + γ·maxQ(s′,a′) − Q(s,a)]',
  rlPractice:'Build a Q-table agent that learns to cross FrozenLake without falling in holes.',
  practice:[
    {title:'Train/Test Split',          desc:'Split Iris 80/20, train Decision Tree, measure accuracy on held-out test set.'},
    {title:'Hand-built Confusion Matrix',desc:'20 predictions → confusion matrix by hand → compute Precision, Recall, F1.'},
    {title:'Overfitting Demo',           desc:'Train tree depth=1 vs unlimited — print train/test accuracy table.'},
    {title:'RFM Segmentation',           desc:'Apply K-Means to customer data to find 3–4 behavioural segments.'}
  ]
},

// ══════════════════════════════════════════════════════════════════
// LLM FUNDAMENTALS
// ══════════════════════════════════════════════════════════════════
{
  id:'llm', title:'LLM Fundamentals', subtitle:'How Language Models Think',
  color:'#F472B6', dim:'rgba(244,114,182,0.1)', icon:'fa-solid fa-microchip',
  pos:{x:10,y:0.5,z:-60}, r:2.3, geo:'torus',
  topics:[
    {
      name:'Tokenization',
      points:[
        'Tokens ≠ words: "unhappiness" → ["un","happi","ness"] — BPE merges frequent pairs',
        'BPE (Byte Pair Encoding): starts from characters, merges most frequent pairs iteratively',
        'WordPiece (BERT) and SentencePiece (T5, LLaMA) are alternative subword algorithms',
        'GPT-4 vocabulary: ~100,000 tokens; 1 token ≈ 0.75 words (English text)',
        'Rare or non-English words split into more tokens → higher cost and slower generation',
        'tiktoken (OpenAI) lets you count tokens locally before sending API calls'
      ],
      code:{lang:'python', label:'Count tokens and inspect token IDs with tiktoken',
lines:`import tiktoken                        # pip install tiktoken

enc = tiktoken.get_encoding("cl100k_base")   # GPT-4 encoding

sentences = [
    "Hello world",
    "unhappiness",                           # splits into subwords
    "नमस्ते",                                # Hindi — more tokens per char
    "def calculate_rmse(predictions):",      # code tokens
]

for s in sentences:
    tokens = enc.encode(s)
    print(f"Text   : {s}")
    print(f"Tokens : {tokens}")
    print(f"Count  : {len(tokens)}")
    decoded = [enc.decode([t]) for t in tokens]
    print(f"Parts  : {decoded}")
    print()`}
    },
    {
      name:'Embeddings',
      points:[
        'Embedding: map token ID to a dense float vector (e.g. 768 or 1536 dimensions)',
        'Similar meanings → vectors close in high-dimensional space (cosine similarity)',
        'Word2Vec trained vectors: "king − man + woman ≈ queen" — arithmetic on meaning',
        'Sentence embeddings encode the FULL sentence meaning in one vector (not just words)',
        'sentence-transformers (Hugging Face) is the go-to library for local embeddings',
        'Used in: semantic search, clustering, RAG retrieval, classification without fine-tuning'
      ],
      code:{lang:'python', label:'Cosine similarity between word pairs — semantic distance',
lines:`import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Tiny 4-dim toy embeddings (real ones are 768+ dims)
king   = np.array([ 0.9,  0.1,  0.8,  0.2])
queen  = np.array([ 0.85, 0.3,  0.8,  0.7])
man    = np.array([ 0.8,  0.1,  0.2,  0.1])
woman  = np.array([ 0.75, 0.3,  0.2,  0.7])
banana = np.array([-0.1,  0.9, -0.2,  0.05])

print("king  ↔ queen  :", round(cosine_similarity(king, queen),  3))
print("king  ↔ man    :", round(cosine_similarity(king, man),    3))
print("king  ↔ banana :", round(cosine_similarity(king, banana), 3))

# Vector arithmetic: king - man + woman ≈ ?
analogy = king - man + woman
print("king-man+woman ↔ queen :", round(cosine_similarity(analogy, queen), 3))`}
    },
    {
      name:'Attention Mechanism',
      points:[
        'Attention solves RNN\'s vanishing gradient — can reference any position directly',
        'Query (Q): what am I looking for?  Key (K): what do I offer?  Value (V): what I give',
        'Attention(Q,K,V) = softmax(QKᵀ / √d_k) · V — scaled dot-product',
        'Self-attention: every token in the sequence attends to every other token',
        'Multi-head: run attention h times with different learned projections, then concatenate',
        'Attention is O(n²) in sequence length — the reason context windows have limits'
      ],
      code:{lang:'python', label:'Minimal self-attention in NumPy — see the weights',
lines:`import numpy as np

def softmax(x): return np.exp(x - x.max()) / np.exp(x - x.max()).sum()

# 3 tokens, 4-dim embeddings  (toy example)
tokens = np.array([[1,0,1,0],   # "I"
                   [0,1,0,1],   # "love"
                   [1,1,0,0]])  # "Python"

d_k = tokens.shape[1]
Wq = Wk = Wv = np.eye(d_k)    # identity for clarity

Q = tokens @ Wq
K = tokens @ Wk
V = tokens @ Wv

scores  = Q @ K.T / np.sqrt(d_k)      # shape (3,3)
weights = np.array([softmax(row) for row in scores])

print("Attention weights (row = token, col = attends-to):")
for i, row in enumerate(weights):
    print(f"  token {i}: {[round(w,3) for w in row]}")

output = weights @ V
print("\nContext-aware output shape:", output.shape)`}
    },
    {
      name:'Context Window',
      points:[
        'Context window = max total tokens the model reads: system + history + input + output',
        'GPT-3.5: 16k · GPT-4 Turbo: 128k · Gemini 1.5 Pro: 1M+ tokens',
        'When context fills up, oldest messages are truncated — model loses early context',
        '"Lost in the middle" problem: models focus best on start and end of long contexts',
        'Solutions: RAG (retrieve only relevant chunks), summarisation, structured memory',
        'Every extra token in the window adds latency and cost — keep prompts concise'
      ],
      code:{lang:'python', label:'Calculate token budget for a 4096-token context window',
lines:`import tiktoken

enc = tiktoken.get_encoding("cl100k_base")

CONTEXT_LIMIT = 4096
RESERVED_FOR_RESPONSE = 512

system_prompt = "You are a helpful Python tutor. Answer clearly and concisely."
user_history  = ["What is a list?", "A list is...", "What is a dict?"]
new_message   = "Explain list comprehension with an example."

def count(text): return len(enc.encode(text))

system_tokens  = count(system_prompt)
history_tokens = sum(count(m) for m in user_history)
message_tokens = count(new_message)
used = system_tokens + history_tokens + message_tokens + RESERVED_FOR_RESPONSE
remaining = CONTEXT_LIMIT - used

print(f"System   : {system_tokens:>5} tokens")
print(f"History  : {history_tokens:>5} tokens")
print(f"Message  : {message_tokens:>5} tokens")
print(f"Reserved : {RESERVED_FOR_RESPONSE:>5} tokens (response)")
print(f"{'─'*26}")
print(f"Used     : {used:>5} / {CONTEXT_LIMIT}")
print(f"Free     : {remaining:>5} tokens")`}
    },
    {
      name:'Temperature & Sampling',
      points:[
        'Temperature=0: always choose the highest probability token — fully deterministic',
        'Temperature=1: sample proportionally to model probabilities — default, balanced',
        'Temperature>1: flatten the distribution — more random and creative output',
        'Top-p (nucleus): sample only from tokens whose cumulative probability ≥ p (e.g. 0.9)',
        'Top-k: sample from exactly the k most probable tokens (e.g. top_k=40)',
        'Beam search: keeps B best sequences in parallel — used for translation, not chatbots'
      ],
      code:{lang:'python', label:'Simulate temperature effect on a toy token distribution',
lines:`import numpy as np

# Toy vocabulary with raw logits from model
vocab   = ["cat","dog","fish","cloud","justice","purple"]
logits  = np.array([3.5, 3.0, 2.0, 0.5, -1.0, -2.0])

def sample_with_temperature(logits, temp, n=10_000):
    scaled = logits / temp
    scaled -= scaled.max()
    probs  = np.exp(scaled) / np.exp(scaled).sum()
    picks  = np.random.choice(vocab, size=n, p=probs)
    from collections import Counter
    return {w: f"{v/n:.1%}" for w,v in Counter(picks).most_common()}

for temp in [0.1, 1.0, 2.0]:
    print(f"\n  temperature = {temp}")
    for word, pct in sample_with_temperature(logits, temp).items():
        print(f"    {word:<10} {pct}")`}
    }
  ],
  practice:[
    {title:'Count Tokens',        desc:'Use tiktoken on 5 sentences — notice how code and rare words tokenise.'},
    {title:'Temperature 0 vs 1',  desc:'Same creative prompt at temp=0 and temp=1 — document every difference.'},
    {title:'Embedding Similarity', desc:'Compute cosine similarity for 5 word pairs — rank from most to least similar.'}
  ]
},

// ══════════════════════════════════════════════════════════════════
// PROMPT ENGINEERING
// ══════════════════════════════════════════════════════════════════
{
  id:'prompt', title:'Prompt Engineering', subtitle:'The Art of Talking to AI',
  color:'#FBBF24', dim:'rgba(251,191,36,0.1)', icon:'fa-solid fa-terminal',
  pos:{x:-9,y:1,z:-76}, r:2.0, geo:'box',
  topics:[
    {
      name:'Prompt Structure',
      points:[
        'Role: "You are a senior Java developer..." — sets expertise level and tone',
        'Task: state exactly WHAT to produce — be specific, not vague ("explain" vs "list 5 bullet points")',
        'Context: give background the model needs — tech stack, audience, constraints',
        'Format: "Respond as JSON with keys: title, summary, tags" — eliminates guessing',
        'Constraints: "in under 100 words", "avoid jargon", "use British English"',
        'One example in the prompt improves output quality more than any other tweak'
      ],
      code:{lang:'python', label:'Reusable structured prompt template builder',
lines:`def build_prompt(role, task, context="", format_spec="", constraints="", example=""):
    parts = [f"ROLE: {role}", f"TASK: {task}"]
    if context:     parts.append(f"CONTEXT: {context}")
    if format_spec: parts.append(f"OUTPUT FORMAT: {format_spec}")
    if constraints: parts.append(f"CONSTRAINTS: {constraints}")
    if example:     parts.append(f"EXAMPLE OUTPUT:\\n{example}")
    return "\\n\\n".join(parts)

prompt = build_prompt(
    role        = "You are a senior Python developer who explains for beginners.",
    task        = "Explain what a decorator is.",
    format_spec = "2-sentence definition, then a 5-line code example.",
    constraints = "No jargon. Maximum 80 words total.",
    example     = "A list is a container... (code block here)"
)
print(prompt)`}
    },
    {
      name:'Zero-shot Prompting',
      points:[
        'Ask the model directly with no examples — relies entirely on pre-training knowledge',
        'Best for: simple, common tasks the model has seen millions of times',
        'Be explicit about format — "list 5 bullet points" beats "tell me about"',
        'Add persona: "As a data scientist, explain..." biases output toward expertise',
        'Add audience: "Explain for a 10-year-old" adjusts complexity automatically',
        'Failure mode: complex multi-step logic, niche domains, precise calculations'
      ],
      code:{lang:'python', label:'Weak vs strong zero-shot prompt comparison',
lines:`# Same task, 3 increasingly better zero-shot prompts

TASK = "Python list comprehension"

# ❌ Vague — model guesses scope
weak = f"Explain {TASK}."

# ⚡ Better — format specified
medium = (
    f"Explain {TASK} in exactly 2 sentences for a Python beginner. "
    f"Then show one 3-line code example."
)

# ✅ Best — role + audience + format + length
strong = (
    f"You are a Python tutor teaching absolute beginners. "
    f"Explain {TASK} in 2 clear sentences. "
    f"Then show a single code example (max 3 lines) with a comment on each line. "
    f"Total response: under 60 words."
)

for label, prompt in [("WEAK",weak),("MEDIUM",medium),("STRONG",strong)]:
    print(f"[{label}]\\n{prompt}\\n")`}
    },
    {
      name:'Few-shot Prompting',
      points:[
        'Provide 2–5 input/output pairs before the real query — model pattern-matches',
        'No weight updates happen — all "learning" is inside the context window',
        'Example format: Input: X\\nOutput: Y\\n\\nInput: Z\\nOutput: (model completes)',
        'Last example should be the most similar to your actual task',
        'Diverse examples: cover edge cases, not just the happy path',
        'Few-shot outperforms zero-shot significantly for structured or unusual output formats'
      ],
      code:{lang:'python', label:'Few-shot sentiment classifier inside a prompt string',
lines:`few_shot_prompt = """
Classify the sentiment of customer reviews as POSITIVE, NEGATIVE, or NEUTRAL.

Review: "The product arrived on time and works perfectly."
Sentiment: POSITIVE

Review: "Completely broken after two days. Terrible quality."
Sentiment: NEGATIVE

Review: "It is okay. Does what it says, nothing special."
Sentiment: NEUTRAL

Review: "Absolutely love it! Changed my workflow completely."
Sentiment: POSITIVE

Review: "Battery life is worse than advertised but camera is good."
Sentiment:"""

# This is sent to an LLM API — model completes: NEUTRAL
print("Prompt ready. Model will complete the final Sentiment line.")
print(f"Total chars: {len(few_shot_prompt)}")`}
    },
    {
      name:'Chain-of-Thought (CoT)',
      points:[
        'Append "Think step by step" → model shows reasoning before giving the answer',
        'Zero-shot CoT: just add the phrase — no examples needed — works on math/logic',
        'Few-shot CoT: examples include the full reasoning chain, not just the answer',
        'ReAct pattern: interleave Reason + Act (tool call) for agent tasks',
        'Self-consistency: generate multiple CoT paths, take majority vote for reliability',
        'Works best on: arithmetic, commonsense reasoning, multi-step planning, debugging'
      ],
      code:{lang:'python', label:'Zero-shot CoT vs direct prompt on a multi-step problem',
lines:`# Multi-step word problem
problem = (
    "Arjun earns ₹60,000/month. He saves 20% and spends "
    "₹8,000 on rent, ₹5,000 on food, and ₹3,000 on transport. "
    "How much is left after savings and fixed expenses?"
)

# ❌ Direct prompt — model often miscalculates
direct = f"{problem}\\nAnswer:"

# ✅ Zero-shot CoT — "think step by step" forces workings
cot = (
    f"{problem}\\n"
    f"Think through this step by step, showing each calculation, "
    f"then give the final answer on the last line."
)

# Manual solution (what CoT helps model reach)
monthly  = 60_000
savings  = monthly * 0.20
expenses = 8_000 + 5_000 + 3_000
leftover = monthly - savings - expenses
print(f"Correct answer: ₹{leftover:,.0f}")
print(f"\\nCoT prompt length: {len(cot)} chars")`}
    },
    {
      name:'System Prompts & Templates',
      points:[
        'System prompt sets persistent role, tone, and rules for the whole conversation',
        'Persona pattern: "You are X who always Y and never Z"',
        'Output format pattern: "Always respond as valid JSON with keys: ..."',
        'Self-critique pattern: "After answering, rate your own confidence 1–10"',
        'Template pattern: define {{variable}} placeholders in a reusable string',
        'Guard rails: "If asked about topic X, respond with: I cannot help with that"'
      ],
      code:{lang:'python', label:'Reusable prompt template class with variable substitution',
lines:`class PromptTemplate:
    def __init__(self, system: str, user_template: str):
        self.system        = system
        self.user_template = user_template

    def fill(self, **kwargs) -> dict:
        user_msg = self.user_template
        for key, val in kwargs.items():
            user_msg = user_msg.replace(f"{{{{{key}}}}}", str(val))
        return {"system": self.system, "user": user_msg}

# Define once, reuse with different inputs
code_reviewer = PromptTemplate(
    system = "You are a strict Java code reviewer. Point out bugs, then suggest fixes. "
             "Always format as: BUGS: ... | FIXES: ...",
    user_template = "Review this Java code:\\n[java]\\n{{code}}\\n[/java]"
)

snippet = "int x = 10; System.out.println(x/0);"
prompt  = code_reviewer.fill(code=snippet)
print("System:", prompt["system"][:60], "...")
print("User  :", prompt["user"])`}
    }
  ],
  practice:[
    {title:'3-Way Prompt Rewrite',  desc:'Write "summarise this article" as zero-shot, few-shot, and chain-of-thought.'},
    {title:'Persona System Prompt', desc:'Write a system prompt making the model act as a strict Java code reviewer.'},
    {title:'Prompt Debugging',      desc:'Fix 3 broken prompts that gave wrong output — explain each fix.'}
  ]
},

// ══════════════════════════════════════════════════════════════════
// RAG & ITS TYPES
// ══════════════════════════════════════════════════════════════════
{
  id:'rag', title:'RAG & Its Types', subtitle:'Retrieval-Augmented Generation',
  color:'#2DD4BF', dim:'rgba(45,212,191,0.1)', icon:'fa-solid fa-magnifying-glass',
  pos:{x:0,y:2,z:-92}, r:2.5, geo:'nodes',
  topics:[
    {
      name:'RAG Pipeline',
      points:[
        'Step 1 — Load: ingest documents (PDF, HTML, DB rows) into plain text',
        'Step 2 — Chunk: split text into overlapping pieces (~512 tokens typical)',
        'Step 3 — Embed: encode each chunk as a vector using an embedding model',
        'Step 4 — Store: save vectors + metadata in a vector database (Chroma, Pinecone)',
        'Step 5 — Retrieve: embed the query, find top-k most similar chunks',
        'Step 6 — Generate: send query + retrieved chunks as context to the LLM'
      ],
      code:{lang:'python', label:'Minimal RAG pipeline in ~30 lines (no external API)',
lines:`from sentence_transformers import SentenceTransformer
import numpy as np

# ── 1. Documents (source knowledge) ──
docs = [
    "Python list comprehension: [x*2 for x in range(10)]",
    "Java lambda syntax: (a, b) -> a + b",
    "SQL GROUP BY: SELECT dept, COUNT(*) FROM employees GROUP BY dept",
    "RAG stands for Retrieval-Augmented Generation",
    "Gradient descent minimises loss by updating weights in small steps"
]

# ── 2-3. Embed all chunks ──
model   = SentenceTransformer("all-MiniLM-L6-v2")   # 90MB, free
doc_emb = model.encode(docs, normalize_embeddings=True)

# ── 4-5. Retrieve top-2 for a query ──
query     = "How does SQL grouping work?"
query_emb = model.encode([query], normalize_embeddings=True)
scores    = (doc_emb @ query_emb.T).flatten()
top_k     = scores.argsort()[-2:][::-1]

print("Retrieved context:")
for idx in top_k:
    print(f"  [{scores[idx]:.3f}] {docs[idx]}")`}
    },
    {
      name:'Chunking Strategies',
      points:[
        'Fixed-size: split every N characters — simple but may cut sentences mid-way',
        'Sentence: split at "." / "!" / "?" boundaries — preserves meaning units',
        'Semantic: split where topic similarity drops — most accurate but slower',
        'Sliding window: 512-token chunks with 64-token overlap — no context lost at edges',
        'Recursive character: try paragraph → sentence → word breaks — LangChain default',
        'Too small = less context per chunk; too large = noisy, irrelevant content retrieved'
      ],
      code:{lang:'python', label:'Fixed vs sliding-window chunking — see the difference',
lines:`def chunk_fixed(text, size=100):
    """Non-overlapping fixed-size chunks."""
    return [text[i:i+size] for i in range(0, len(text), size)]

def chunk_sliding(text, size=100, overlap=30):
    """Overlapping sliding window — no context lost at edges."""
    step   = size - overlap
    chunks = []
    for i in range(0, len(text) - size + 1, step):
        chunks.append(text[i:i+size])
    return chunks

sample = (
    "Machine learning is a subset of AI. It learns from data. "
    "Deep learning uses neural networks. Transformers changed NLP. "
    "RAG combines retrieval with generation for better answers."
)

fixed   = chunk_fixed(sample, size=80)
sliding = chunk_sliding(sample, size=80, overlap=20)

print(f"Fixed   chunks : {len(fixed)}")
print(f"Sliding chunks : {len(sliding)}  (overlap preserves context)")
print(f"\\nSliding chunk 1: '{sliding[0]}'")
print(f"Sliding chunk 2: '{sliding[1]}'")`}
    },
    {
      name:'Vector Databases',
      points:[
        'Store high-dimensional float vectors + metadata for fast approximate nearest-neighbour search',
        'FLAT index: exact search — slow on large data; HNSW: graph-based — fast and accurate',
        'HNSW (Hierarchical Navigable Small World) is used by Chroma, Weaviate, and FAISS',
        'Chroma: in-process Python DB, free, persistent — best for learning and prototyping',
        'Pinecone: fully managed cloud service, scalable, free starter tier',
        'Weaviate: open-source, supports hybrid search (BM25 + vectors) out of the box'
      ],
      code:{lang:'python', label:'Chroma — create collection, add docs, query',
lines:`import chromadb                          # pip install chromadb

client     = chromadb.Client()             # in-memory (add PersistentClient for disk)
collection = client.create_collection("learnverse_kb")

# Add documents (Chroma embeds automatically with default model)
collection.add(
    documents=[
        "Supervised learning uses labelled training data",
        "Unsupervised learning finds hidden patterns without labels",
        "Reinforcement learning learns via reward signals",
        "Deep learning uses multi-layer neural networks",
    ],
    ids=["doc1","doc2","doc3","doc4"]
)

# Query: semantic search
results = collection.query(
    query_texts=["How does the model train without labels?"],
    n_results=2
)
print("Top matches:")
for doc, dist in zip(results["documents"][0], results["distances"][0]):
    print(f"  [{1-dist:.3f}] {doc}")`}
    },
    {
      name:'Retrieval Methods',
      points:[
        'Dense retrieval: cosine similarity between query embedding and all stored vectors',
        'Sparse retrieval: BM25 (Best Match 25) — keyword frequency + inverse doc frequency',
        'Hybrid retrieval: combine dense + sparse scores with RRF (Reciprocal Rank Fusion)',
        'Re-ranking: send top-k candidates to a cross-encoder → re-score and re-order',
        'MMR (Maximal Marginal Relevance): balance relevance AND diversity in results',
        'HyDE: generate a hypothetical answer first, then retrieve on that answer embedding'
      ],
      code:{lang:'python', label:'BM25 sparse retrieval vs keyword match comparison',
lines:`from rank_bm25 import BM25Okapi         # pip install rank-bm25

corpus = [
    "Python list comprehension filters elements efficiently",
    "Java Stream API filters collections with lambdas",
    "SQL WHERE clause filters rows based on conditions",
    "Decision Tree splits data based on feature conditions",
    "BM25 is a keyword-based retrieval ranking algorithm",
]
tokenised = [doc.lower().split() for doc in corpus]
bm25      = BM25Okapi(tokenised)

query  = "how to filter data"
scores = bm25.get_scores(query.lower().split())

print(f"Query: '{query}'")
print("\\nBM25 Scores:")
ranked = sorted(zip(scores, corpus), reverse=True)
for score, doc in ranked:
    print(f"  {score:.3f}  {doc[:55]}")`}
    },
    {
      name:'6 RAG Types Deep Dive',
      points:[
        'Naive RAG: load → chunk → embed → retrieve top-k → generate — fast to build, baseline',
        'Advanced RAG: adds query rewriting, smaller-to-bigger chunking, cross-encoder re-ranking',
        'Modular RAG: swap any component — plug different retrievers, readers, generators independently',
        'Hybrid RAG: combine dense (semantic) + sparse (BM25) retrieval — better keyword coverage',
        'Graph RAG: extract entities & relations into a knowledge graph — enables multi-hop reasoning',
        'Agentic RAG: LLM decides WHEN, WHAT, and HOW to retrieve dynamically — most powerful'
      ],
      code:{lang:'python', label:'Agentic RAG decision loop — LLM chooses retrieval strategy',
lines:`# Agentic RAG: the LLM decides what tool to call next

def naive_retrieve(query):    return f"[vector search: {query[:30]}...]"
def web_search(query):        return f"[web: {query[:30]}...]"
def sql_lookup(query):        return f"[SQL: {query[:30]}...]"

tools = {
    "vector_search": naive_retrieve,
    "web_search":    web_search,
    "sql_lookup":    sql_lookup,
}

def agentic_rag_router(query: str) -> str:
    """Simulate LLM tool selection based on query type."""
    q = query.lower()
    if any(w in q for w in ["latest","2026","today","news"]):
        tool = "web_search"
    elif any(w in q for w in ["count","sum","how many","average"]):
        tool = "sql_lookup"
    else:
        tool = "vector_search"

    result = tools[tool](query)
    return f"Tool: {tool}\\nResult: {result}"

queries = [
    "What is RAG?",
    "How many users signed up in 2026?",
    "Latest news about LLMs"
]
for q in queries:
    print(agentic_rag_router(q))
    print()`}
    }
  ],
  ragTypes:[
    {name:'Naive RAG',    desc:'Chunk → embed → retrieve → generate. Simple and fast to build.',  color:'#2DD4BF'},
    {name:'Advanced RAG', desc:'Query rewriting + better chunking + cross-encoder re-ranking.',    color:'#4FC3F7'},
    {name:'Modular RAG',  desc:'Swap any component independently — plug-and-play architecture.',   color:'#A78BFA'},
    {name:'Hybrid RAG',   desc:'Dense (semantic) + sparse (BM25) retrieval combined via RRF.',     color:'#00FF88'},
    {name:'Graph RAG',    desc:'Knowledge graph enables multi-hop reasoning across documents.',     color:'#F472B6'},
    {name:'Agentic RAG',  desc:'LLM dynamically decides when, what, and how to retrieve.',         color:'#FBBF24'}
  ],
  practice:[
    {title:'PDF Q&A Bot',         desc:'Load PDF → chunk → embed with sentence-transformers → Chroma → answer queries.'},
    {title:'Add a Re-Ranker',     desc:'Extend the bot with a cross-encoder re-ranker to boost precision.'},
    {title:'RAG Type Comparison', desc:'For each of the 6 RAG types, write 1 real use-case where it beats Naive RAG.'}
  ]
}

]; // end SUBJECTS

// ══════════════════════════════════════════════════════════════════
export const MINI_PROJECTS = [
  {title:'RFM Customer Segmentation', desc:'K-Means on transaction data to discover Recency, Frequency, Monetary segments.',   tags:['Python','K-Means','Pandas'],       color:'#00FF88', icon:'fa-solid fa-users'},
  {title:'PDF Q&A Bot with RAG',      desc:'Upload any PDF, embed chunks, store in Chroma, answer with natural language.',       tags:['RAG','LangChain','Python'],         color:'#2DD4BF', icon:'fa-solid fa-file-pdf'},
  {title:'Spam Email Classifier',     desc:'Train Naive Bayes + Logistic Regression on SMS spam — compare metrics.',             tags:['ML','Naive Bayes','scikit-learn'],  color:'#F472B6', icon:'fa-solid fa-envelope'},
  {title:'FrozenLake Q-Agent',        desc:'Q-table RL agent that learns to cross a frozen lake without falling in holes.',       tags:['RL','Q-Learning','Gym'],            color:'#A78BFA', icon:'fa-solid fa-robot'},
  {title:'Library Database',          desc:'Design 3NF library schema and write 5 SQL queries including joins + window fns.',    tags:['SQL','MySQL','ERD'],                color:'#00E5FF', icon:'fa-solid fa-book'},
  {title:'Employee Stream Filter',    desc:'Java 8 Streams: filter, sort, group and collect employee records with lambdas.',     tags:['Java 8','Streams','Lambda'],        color:'#FF8C42', icon:'fa-brands fa-java'}
];

export const FAQ = [
  {q:'Where do I start if I am a complete beginner?',
   a:'Start with Python — it is the most beginner-friendly language and the foundation for all AI and ML here. Work through all 5 sub-topics and 4 practice exercises before moving on.'},
  {q:'Do I need strong maths for Machine Learning?',
   a:'Basic algebra and statistics (averages, percentages, linear equations) are enough to start. Deep maths becomes natural as you apply concepts.'},
  {q:'How long does it take to finish everything?',
   a:'At 2 hours/day: Python (1 wk), Java (2 wks), SQL (1 wk), AI+ML (2 wks), Supervised Algorithms (2 wks), LLMs+Prompts (1 wk), RAG (1 wk) — roughly 10–12 weeks.'},
  {q:'Should I learn Java if I already know Python?',
   a:'Yes — Java 8+ Streams and Lambdas appear in almost every production codebase, and enterprise backend (Spring Boot) is 80% Java.'},
  {q:'What is the difference between LLMs and traditional ML?',
   a:'Traditional ML learns patterns from structured data (tables, numbers). LLMs learn language from billions of text examples and can generate, summarise, translate and reason without task-specific training.'},
  {q:'Do I need a GPU for the practice sessions?',
   a:'No. All practice sessions run on a free Google Colab CPU. Heavier LLM calls use free-tier API endpoints or small quantized models that run on CPU.'},
  {q:'When should I use RAG instead of fine-tuning?',
   a:'Use RAG when your data changes often or you cannot afford retraining. Fine-tune when you need a specific response style or behaviour baked into the model permanently.'},
  {q:'How do I track progress without an account?',
   a:'Every practice box has a "Mark as Done" checkbox saved in your browser localStorage — no account needed, persists between visits.'}
];
