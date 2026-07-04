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

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 10.03 - t * 5.74 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 24.51 - t * 1.22 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.43 + t * 1.13) - 0.5) * 2.0;
    v = sin((p.y * 5.58 + zx * 1.82 + t * 2.41) * 3.1415927 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 4.29, t * 0.96 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.39, lr * 1.82 + time * -0.90); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.30);
	float d3 = fieldC(q3, time, 1.39);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.89 + time * 0.65);
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
