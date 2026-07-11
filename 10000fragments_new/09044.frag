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
    v = sin(p.x * 13.22 + sin(p.y * 2.46 + t * 0.57) * 4.97 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 2.40, t * 2.20 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.81 - t * 4.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.55, length(q1) * 4.25 - time * 0.40); }
	q3 = fract(q3 * 2.01) - 0.5;
	q3 += vec2(-0.48, -0.22) * sin(length(q3) * 5.45 - time * 2.39) * 0.13;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.79);
	float d3 = fieldC(q3, time, 0.94);
	d2 = min(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.35));
	vec3 col = vec3(0.38, 0.59, 0.66) * (0.14 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = fract(col * 1.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
