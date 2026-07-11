uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 22.59 - t * 7.07 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 32.15 - t * 7.07 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.03;
	p = rot2(p.y * -3.54 + time * 0.74) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.03, lr * 2.03 + time * 0.68); }
	p = rot2(length(p) * 3.87 + time * 0.74) * p;
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.10, vec3(0.56, 0.51, 0.54), vec3(0.42, 0.45, 0.49), vec3(1.23, 0.90, 1.04), vec3(0.26, 0.96, 0.60));
	col = mod(col * 1.22, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
