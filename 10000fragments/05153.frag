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
    v = noise3(vec3(p * 2.68, t * 0.92 + ph)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = noise3(vec3(p * 3.29, t * 1.99 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.29, 0.44) * sin(length(p) * 2.47 - time * 1.48) * 0.30;
	{ float fr = length(p); p *= 1.0 + 0.42 * fr * fr; }
	p *= 1.39;
	p = rot2(p.y * -2.59 + time * 0.82) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.63 + time * 0.04, vec3(0.54, 0.52, 0.45), vec3(0.36, 0.41, 0.43), vec3(1.31, 1.10, 1.18), vec3(0.81, 0.94, 0.84));
	col = mod(col * 1.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
