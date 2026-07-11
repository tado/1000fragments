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
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.58 + 0.25 * pow(abs(cos(ra * 6.0 + t * 2.00)), 0.63);
    v = sin((rr - pet) * 12.07 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 4.77, t * 1.94 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 5.24 * sin(t * 1.13) + t * 3.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q3 = vec2(atan(q3.y, q3.x) * 1.93, length(q3) * 3.52 - time * 0.42); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q3.x += 0.38 / wf * sin(wf * 1.63 * q3.y + time * 1.12); q3.y += 0.36 / wf * cos(wf * 2.71 * q3.x + time * 2.06); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.08);
	float d3 = fieldC(q3, time, 1.47);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.20, 0.50), vec3(0.67, 0.75, 0.55), cc);
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 2.14 + time * 6.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
