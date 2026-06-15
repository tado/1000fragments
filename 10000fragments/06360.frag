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
    float rn = noise3(vec3(p * 2.77, t * 0.60 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.32 + t * 1.27 + ph) + sin(p.y * 4.39 - t * 1.27 + ph)
        + sin((p.x + p.y) * 7.80 + t * 1.27 + ph) + sin(length(p) * 15.20 - t * 1.27 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.52;
	p *= 1.70;
	p += vec2(0.31, 0.09) * sin(length(p) * 3.61 - time * 0.92) * 0.38;
	{ float fr = length(p); p *= 1.0 + 0.26 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.68);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.56 + time * 0.28, vec3(0.55, 0.40, 0.45), vec3(0.43, 0.32, 0.40), vec3(1.17, 1.32, 1.22), vec3(0.26, 0.28, 0.53));
	col = mod(col * 2.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
