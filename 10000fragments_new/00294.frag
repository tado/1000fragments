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
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.28 + sr * 16.86 - t * 2.58 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 1.78, t * 1.76 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = (floor(p * 21.7) + 0.5) / 21.7;
	p.y += sin(p.x * 2.93 + time * 3.92) * 0.11;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 3.72 - time * 0.75); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = d1 * d2;
	vec3 col = palette(d * 0.93 + time * 0.17, vec3(0.45, 0.57, 0.49), vec3(0.31, 0.34, 0.34), vec3(0.90, 1.29, 0.81), vec3(0.94, 0.61, 0.42));
	col = fract(col * 2.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
