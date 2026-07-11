uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    v = noise3(vec3(p * 1.24, t * 2.14 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	{ p = vec2(atan(p.y, p.x) * 1.20, length(p) * 5.87 - time * 0.57); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.85 * p.y + time * 0.92); p.y += 0.43 / wf * cos(wf * 1.95 * p.x + time * 1.84); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.85, lr * 2.95 + time * 0.76); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.15, vec3(0.51, 0.47, 0.46), vec3(0.31, 0.46, 0.38), vec3(1.35, 1.39, 1.32), vec3(0.98, 0.08, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
