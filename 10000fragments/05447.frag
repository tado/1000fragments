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

float fieldA(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 7.37, t * 0.87 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 2.78, t * 1.65 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.01;
    v = 0.5 * (sin(1.0 * cp.x + t * 0.72) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 2.29) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.x += sin(q1.y * 4.51 + time * 3.81) * 0.25;
	{ float fr = length(q1); q1 *= 1.0 + -0.27 * fr * fr; }
	q3 = fract(q3 * 1.58) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d3 = fieldC(q3, time, 1.97);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.43 + time * 0.05, vec3(0.43, 0.59, 0.50), vec3(0.31, 0.34, 0.37), vec3(1.24, 0.92, 1.05), vec3(0.45, 0.52, 0.17));
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 1.40 + time * 16.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
