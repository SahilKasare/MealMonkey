## **Performance Comparison Report — Redis Cache vs No Cache**

### **1. Test Setup Overview**

| Feature              | Cached Run                | Non-Cached Run            |
|----------------------|---------------------------|---------------------------|
| Redis Cache          | Enabled (TTL: 2 mins)     | Disabled                  |
| Requests Sent        | 300                       | 300                       |
| Errors               | 0                         | 0                         |
| Status Codes         | All 200 OK                | All 200 OK                |

---

### **2. HTTP Response Times**

| Metric               | Cached                    | Non-Cached                | Observation                               |
|----------------------|---------------------------|---------------------------|-------------------------------------------|
| Min                  | 3 ms                      | 50 ms                     | Cached requests return almost instantly   |
| Max                  | 127 ms                    | 681 ms                    | Database access introduces overhead       |
| Mean                 | 6 ms                      | 83.7 ms                   | Non-cached requests are ~14× slower       |
| Median               | 4 ms                      | 58.6 ms                   | Significant latency reduction with Redis  |
| 95th Percentile      | 7.9 ms                    | 232.8 ms                  | Performance drops drastically without cache |
| 99th Percentile      | 44.3 ms                   | 424.2 ms                  | Higher outliers in non-cached execution   |

---

### **3. Virtual User Session Lengths**

| Metric               | Cached                    | Non-Cached                | Observation                               |
|----------------------|---------------------------|---------------------------|-------------------------------------------|
| Min                  | 5.9 ms                    | 53.9 ms                   | Redis provides faster response cycles     |
| Max                  | 176.4 ms                  | 755.4 ms                  | Longest sessions were slower withoutcache |
| Mean                 | 12.7 ms                   | 92.2 ms                   | ~7× improvement in session handling       |
| Median               | 9.5 ms                    | 64.7 ms                   | Faster interaction per user               |
| 95th Percentile      | 20.7 ms                   | 242.3 ms                  | Redis improves experience at high load    |
| 99th Percentile      | 80.6 ms                   | 497.8 ms                  | Database introduces bottlenecks           |

---

### **4. Analysis & Interpretation**

- **Cached Scenario**:
  - Response times were consistently low, with nearly all requests resolved in under 10 ms.
  - Session durations remained short and predictable, indicating quick turnarounds from server to client.
  - Redis cache offloaded the database effectively, showing excellent performance even under load.

- **Non-Cached Scenario**:
  - Each request had to query the database, leading to significantly higher and more variable response times.
  - Mean and median response times increased by an order of magnitude.
  - Peak response times showed that under load, the backend can become a bottleneck.

---

### **5. Conclusion**

Caching using Redis resulted in a dramatic improvement in system performance. With caching enabled, latency was reduced by over 80–90% across most metrics. This level of optimization not only enhances user experience but also enables the backend to scale more effectively under concurrent load.

For endpoints that serve semi-static or frequently requested data, implementing Redis caching is a critical performance enhancement strategy. In production environments, this could significantly reduce infrastructure costs and improve service reliability.