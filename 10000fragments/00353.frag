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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.78, t * 0.71 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 2.61, t * 2.08 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.10 * p.y + time * 1.73); p.y += 0.21 / wf * cos(wf * 1.71 * p.x + time * 1.48); }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.82; }
	p.y += sin(p.x * 4.24 + time * 1.76) * 0.32;
	p = rot2(2.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.97);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.78 + time * 0.28, vec3(0.47, 0.47, 0.57), vec3(0.35, 0.37, 0.34), vec3(0.74, 0.88, 1.02), vec3(0.92, 0.96, 0.93));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
