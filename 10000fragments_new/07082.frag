uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.69 + ph), vnoise2(p * 1.69 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.69 + 3.09 * wq + vec2(1.7, 9.2) + t * 1.19),
                   vnoise2(p * 1.69 + 3.08 * wq + vec2(8.3, 2.8) - t * 0.91));
    v = vnoise2(p * 1.69 + 3.01 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 5.65, t * 2.11 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.19 * p.y + time * 0.81); p.y += 0.38 / wf * cos(wf * 2.57 * p.x + time * 1.74); }
	{ float fr = length(p); p *= 1.0 + 0.22 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.78);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.05 + time * 0.29, vec3(0.52, 0.49, 0.56), vec3(0.48, 0.31, 0.40), vec3(0.91, 1.28, 1.12), vec3(0.58, 0.83, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
