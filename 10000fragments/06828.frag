uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
float vnoise3(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);
    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);
    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));
    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    return o4.y * d.y + o4.x * (1.0 - d.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 5.60, t * 0.43 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.61 + t * 1.32 + ph) + sin(p.y * 5.34 - t * 1.32 + ph)
        + sin((p.x + p.y) * 10.17 + t * 1.32 + ph) + sin(length(p) * 15.84 - t * 1.32 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.18 + vec2(t * 2.84, -t * 0.33) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.98;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.86, -0.90) * sin(length(q1) * 4.16 - time * 1.92) * 0.23;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.46; q1 = rot2(2.31) * q1; }
	q2 = rot2(length(q2) * -3.87 + time * 1.45) * q2;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.44 / wf * sin(wf * 2.16 * q2.y + time * 1.03); q2.y += 0.45 / wf * cos(wf * 1.52 * q2.x + time * 1.88); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.80);
	float d3 = fieldC(q3, time, 1.21);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = palette(d * 1.26 + time * 0.26, vec3(0.57, 0.43, 0.47), vec3(0.49, 0.38, 0.39), vec3(1.23, 1.19, 1.26), vec3(0.84, 0.08, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
