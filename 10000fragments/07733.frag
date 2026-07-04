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
    v = vnoise3(vec3(p * 1.60, t * 0.93 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.42;
    v = 0.5 * (sin(1.0 * cp.x + t * 0.86) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 1.54) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.37 / wf * sin(wf * 3.23 * q2.y + time * 0.84); q2.y += 0.20 / wf * cos(wf * 3.36 * q2.x + time * 0.95); }
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.84; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.46);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.61 + time * 0.17, vec3(0.55, 0.54, 0.40), vec3(0.47, 0.31, 0.36), vec3(0.73, 0.75, 0.93), vec3(0.09, 0.36, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
