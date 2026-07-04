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
    vec2 cw = p * 3.87 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.30 + t * 2.40 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 5.12, t * 1.11 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.45;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 2.95 + time * 1.56) * 0.76;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.90, lr * 1.00 + time * -0.90); }
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.95);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.95));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.23, 0.12, 0.51), vec3(0.80, 0.89, 0.72), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
