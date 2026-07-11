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

float fieldA(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 6.46, t * 1.18 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.58 + t * 1.82 + ph) * 0.7;
    float wb = sin(p.y * 17.97 - t * 3.98 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.76;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.96 - t * 6.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.20;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.40 / wf * sin(wf * 3.40 * q2.y + time * 1.11); q2.y += 0.46 / wf * cos(wf * 2.83 * q2.x + time * 1.37); }
	q3 = rot2(length(q3) * 3.79 + time * 0.50) * q3;
	q3 = (floor(q3 * 27.7) + 0.5) / 27.7;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.17);
	float d3 = fieldC(q3, time, 0.11);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.43));
	vec3 col = vec3(0.34, 0.42, 0.33) * (0.17 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = mod(col * 2.08, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
