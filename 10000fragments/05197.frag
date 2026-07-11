uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
float noise3(vec3 p){
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
    v = noise3(vec3(p * 6.51, t * 2.16 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.44 * p.y + time * 0.85); p.y += 0.42 / wf * cos(wf * 2.88 * p.x + time * 0.70); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.02, lr * 2.84 + time * -0.74); }
	p = abs(p) - 0.38;
	{ p = vec2(atan(p.y, p.x) * 1.62, length(p) * 4.96 - time * 0.41); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.15 + time * 0.17, vec3(0.49, 0.57, 0.57), vec3(0.39, 0.45, 0.44), vec3(1.01, 1.19, 0.77), vec3(0.66, 0.19, 0.12));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
