uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.84) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 3.23 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.10 + vec2(t * 2.88, -t * 2.88) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.25;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.85, lr * 1.54 + time * 0.12); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.34; p = rot2(1.47) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.67, length(p) * 3.68 - time * 0.78); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.78);
	float d = d1 + d2;
	vec3 col = palette(d * 1.35 + time * 0.16, vec3(0.45, 0.58, 0.51), vec3(0.40, 0.32, 0.38), vec3(1.22, 1.03, 0.94), vec3(0.91, 0.96, 0.44));
	col = mod(col * 1.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
