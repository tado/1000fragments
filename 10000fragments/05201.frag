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
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.66 + jf * 4.0), cos(t * 0.38 * jf)) * 0.79;
        xs += sin(length(p - im) * 113.60 - t * 7.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 4.42, t * 0.31 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	p *= 1.0 + 0.18 * sin(time * 3.66);
	p = (floor(p * 20.0) + 0.5) / 20.0;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.01;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.47);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.63 + time * 0.26, vec3(0.53, 0.52, 0.58), vec3(0.43, 0.43, 0.30), vec3(0.93, 1.05, 1.30), vec3(0.46, 0.85, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
