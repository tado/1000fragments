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

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.23 * cos(sa * 8.0 + t * 2.16 + ph);
    v = sin((sr - petal) * 13.65);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 3.89, t * 0.43 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	p += vec2(-0.80, -0.43) * sin(length(p) * 5.29 - time * 0.95) * 0.30;
	{ float fr = length(p); p *= 1.0 + -0.60 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.01 * p.y + time * 2.00); p.y += 0.31 / wf * cos(wf * 3.96 * p.x + time * 1.28); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.62 + time * 0.11, vec3(0.58, 0.47, 0.51), vec3(0.43, 0.36, 0.41), vec3(1.23, 1.04, 0.72), vec3(0.64, 0.05, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
