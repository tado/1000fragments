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

float field(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 7.84, t * 2.69 + ph)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.64 + t * 1.19 + ph) * 0.7;
    float wb = sin(p.y * 19.71 - t * 3.84 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.64;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.32, lr * 2.31 + time * -0.50); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.59; p = rot2(2.21) * p; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.62 * p.y + time * 0.92); p.y += 0.35 / wf * cos(wf * 3.13 * p.x + time * 1.77); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.29);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.59 + time * 0.01, vec3(0.45, 0.59, 0.51), vec3(0.40, 0.46, 0.43), vec3(1.26, 1.35, 1.04), vec3(0.83, 0.27, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
