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
    v = 0.25 * (sin(p.x * 6.11 + t * 3.64 + ph) + sin(p.y * 8.39 - t * 3.64 + ph)
        + sin((p.x + p.y) * 3.43 + t * 3.64 + ph) + sin(length(p) * 11.82 - t * 3.64 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rn = noise3(vec3(p * 6.35, t * 0.41 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.80) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.47, length(p) * 2.99 - time * 0.27); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.34 + time * 0.07, vec3(0.43, 0.60, 0.50), vec3(0.31, 0.50, 0.44), vec3(1.26, 1.07, 1.07), vec3(0.16, 0.47, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
