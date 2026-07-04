uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.48; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.10 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.69 + vec2(t * 1.29, -t * 1.10) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.03, t * 2.29 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.14, length(q1) * 2.39 - time * 0.42); }
	q1 += vec2(0.98, -0.11) * sin(length(q1) * 4.00 - time * 1.06) * 0.34;
	q2.x += sin(q2.y * 4.62 + time * 1.10) * 0.34;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.26, lr * 1.22 + time * 0.76); }
	{ q3 = vec2(atan(q3.y, q3.x) * 2.43, length(q3) * 5.36 - time * 0.23); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d3 = fieldC(q3, time, 0.93);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.84, 0.35, 0.81) * (0.15 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
