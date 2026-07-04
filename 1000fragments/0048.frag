uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
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

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.09 - t * 1.96;
    v = sin(floor(lv * 5.9) / 5.9 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.77);
    float gsh = hash21(vec2(grow, floor(t * 3.35))) - 0.5;
    float gx = p.x + gsh * 0.94;
    v = sin(gx * 17.24 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.82));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 6.58, t * 0.79 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.58;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.93;
	{ float fr = length(q1); q1 *= 1.0 + -0.74 * fr * fr; }
	q2 += vec2(-0.94, -0.93) * sin(length(q2) * 4.76 - time * 0.82) * 0.12;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.94, lr * 2.20 + time * -0.28); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.37);
	float d3 = fieldC(q3, time, 0.37);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.95, 1.25, 0.53) + vec3(0.16, 0.12, 0.07);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
