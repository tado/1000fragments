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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.07 * sin(mf + 3.0) + ph), cos(t * 1.21 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 6.55, t * 2.41 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	{ p = vec2(atan(p.y, p.x) * 2.85, length(p) * 2.27 - time * 0.96); }
	p += vec2(-0.79, -0.36) * sin(length(p) * 5.19 - time * 2.11) * 0.32;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.08 * p.y + time * 1.66); p.y += 0.21 / wf * cos(wf * 3.90 * p.x + time * 1.36); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.12);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.61 + time * 0.24, vec3(0.53, 0.46, 0.54), vec3(0.42, 0.42, 0.34), vec3(0.82, 0.80, 1.22), vec3(0.35, 0.48, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
