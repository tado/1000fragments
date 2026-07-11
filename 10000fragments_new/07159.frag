uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
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

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.55);
    float gsh = hash21(vec2(grow, floor(t * 7.15))) - 0.5;
    float gx = p.x + gsh * 0.53;
    v = sin(gx * 7.93 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.22));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 5.42, t * 0.50 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 2.92 + time * 1.50) * 0.37;
	q2 = rot2(time * -0.89) * q2;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.64, lr * 2.07 + time * -0.31); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.61 + time * 0.29, vec3(0.47, 0.42, 0.48), vec3(0.38, 0.42, 0.47), vec3(1.27, 1.12, 0.72), vec3(0.72, 0.62, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
