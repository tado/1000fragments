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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.25;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.66; kp = rot2(2.26) * kp; kp *= 1.33; }
    v = sin(kp.y * 1.82 - t * 2.88 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.67;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.56; kp = rot2(2.58) * kp; kp *= 1.19; }
    v = sin(kp.y * 1.43 - t * 2.43 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 4.71, t * 2.44 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.64;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(time * 0.57) * q2;
	q3 = (floor(q3 * 20.2) + 0.5) / 20.2;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q3.x += 0.48 / wf * sin(wf * 3.36 * q3.y + time * 1.30); q3.y += 0.28 / wf * cos(wf * 2.40 * q3.x + time * 2.10); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.01);
	float d3 = fieldC(q3, time, 0.46);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.14, 0.11), vec3(0.78, 0.95, 0.74), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.68 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
