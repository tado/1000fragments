uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
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
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 4.34, t * 1.19 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.35;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.95); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.58, rv + 0.10 * sin(t * 1.22 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin((time * 0.77) * 1.69));
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.36 / wf * sin(wf * 1.54 * q2.y + (time * 0.77) * 1.49); q2.y += 0.36 / wf * cos(wf * 1.87 * q2.x + (time * 0.77) * 1.10); }
	q2 = rot2(length(q2) * 2.68 + (time * 0.77) * 0.88) * q2;
	float d1 = fieldA(q1, (time * 0.77), 0.0);
	float d2 = fieldB(q2, (time * 0.77), 0.98);
	float d = d1 * d2;
	vec3 col = palette((d) * 0.93 + (time * 0.77) * 0.22, vec3(0.46, 0.35, 0.41), vec3(0.22, 0.18, 0.20), vec3(0.80, 0.78, 0.78), vec3(0.06, 0.35, 0.42));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.917, 0.999, 1.037) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
