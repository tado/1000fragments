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
    v = 0.25 * (sin(p.x * 9.75 + t * 2.93 + ph) + sin(p.y * 13.91 - t * 2.93 + ph)
        + sin((p.x + p.y) * 10.29 + t * 2.93 + ph) + sin(length(p) * 5.43 - t * 2.93 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rn = noise3(vec3(p * 3.10, t * 0.53 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.53; p = rot2(0.97) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.07, lr * 1.24 + time * 0.73); }
	{ p = vec2(atan(p.y, p.x) * 2.78, length(p) * 3.30 - time * 0.48); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.55);
	float d = d1 * d2;
	vec3 col = palette(d * 1.58 + time * 0.21, vec3(0.41, 0.54, 0.56), vec3(0.45, 0.31, 0.45), vec3(0.75, 0.73, 0.79), vec3(0.10, 0.90, 0.47));
	col = mod(col * 1.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
