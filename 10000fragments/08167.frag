uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    float wa = sin(p.x * 5.57 + t * 0.65 + ph) * 0.7;
    float wb = sin(p.y * 19.82 - t * 2.29 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.55;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.85;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.27 + 0.08 * sin(t * 3.19 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 3.73, t * 2.15 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.34, -0.75) * sin(length(q1) * 5.74 - time * 2.30) * 0.39;
	q2 = abs(q2) - 0.46;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.77);
	float d3 = fieldC(q3, time, 0.27);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.56, 0.39, 0.37) * (0.21 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = fract(col * 1.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
