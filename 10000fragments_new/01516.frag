uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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

float fieldA(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 7.00, t * 0.56 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.88);
    float gsh = hash21(vec2(grow, floor(t * 8.88))) - 0.5;
    float gx = p.x + gsh * 0.45;
    v = sin(gx * 10.33 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.56));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 14.5) + 0.5) / 14.5;
	q1 = abs(q1) - 0.51;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.78);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.12, 0.08), vec3(0.95, 0.63, 0.96), cc);
	col = mod(col * 2.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
