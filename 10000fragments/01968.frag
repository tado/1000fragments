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
    v = 0.5 * sin(length(p) * 28.97 - t * 8.86 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 1.40, t * 2.21 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.11; p = rot2(0.59) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = d1 + d2;
	vec3 col = palette(d * 1.58 + time * 0.11, vec3(0.58, 0.53, 0.46), vec3(0.41, 0.36, 0.34), vec3(0.89, 0.80, 1.29), vec3(0.54, 0.65, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
