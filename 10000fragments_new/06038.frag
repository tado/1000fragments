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

float field(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 6.03, t * 1.26 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	p += vec2(-0.17, -0.58) * sin(length(p) * 2.17 - time * 0.98) * 0.12;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.14, lr * 2.01 + time * -0.96); }
	p = rot2(length(p) * -2.88 + time * 0.62) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.56; p = rot2(1.94) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.75, 0.82, 0.61) * (0.17 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 1.17 + time * 13.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
