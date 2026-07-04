uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 1.73, t * 2.03)) - 0.5) * 0.71;
    v = exp(-abs(bx) * 7.51) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.79 + ga * 3.0 - t * 2.71 + ph);
    v = arm * exp(-gr * 0.99);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.46, lr * 1.44 + time * -0.82); }
	q1 = rot2(time * -0.63) * q1;
	q2 = rot2(q2.y * 3.43 + time * 0.20) * q2;
	{ float fr = length(q2); q2 *= 1.0 + -0.77 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.52);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.74, 1.37, 1.26) + vec3(0.20, 0.18, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
