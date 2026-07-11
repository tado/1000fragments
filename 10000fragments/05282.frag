uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
float noise3(vec3 p){
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

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.32 + 0.15 * cos(sa * 8 + t * 2.88 + ph);
    v = sin((sr - petal) * 18.76);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = noise3(vec3(p * 6.66, t * 2.24 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 1.90 * p.y + time * 1.19); p.y += 0.28 / wf * cos(wf * 2.27 * p.x + time * 1.47); }
	{ float fr = length(p); p *= 1.0 + 0.66 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.47, lr * 1.36 + time * 0.15); }
	p = rot2(time * 0.45) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.22);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.77 + time * 0.27, vec3(0.45, 0.53, 0.58), vec3(0.45, 0.37, 0.46), vec3(1.31, 1.36, 1.25), vec3(0.52, 0.65, 0.51));
	col = fract(col * 1.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
