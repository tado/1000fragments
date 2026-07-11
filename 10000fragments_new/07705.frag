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
    v = 0.5 * sin(length(p) * 36.88 - t * 8.31 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 6.27, t * 2.52 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.21) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.41 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 2.10) - 0.5;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.27 / wf * sin(wf * 1.74 * q1.y + time * 1.56); q1.y += 0.32 / wf * cos(wf * 2.74 * q1.x + time * 1.69); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.42 / wf * sin(wf * 2.44 * q2.y + time * 1.22); q2.y += 0.47 / wf * cos(wf * 2.96 * q2.x + time * 1.83); }
	q3.x += sin(q3.y * 2.40 + time * 3.91) * 0.10;
	{ q3 = vec2(atan(q3.y, q3.x) * 2.39, length(q3) * 3.63 - time * 0.49); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.92);
	float d3 = fieldC(q3, time, 1.17);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = vec3(0.41, 0.60, 0.66) * (0.20 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
