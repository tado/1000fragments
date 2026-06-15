uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.24 + vec2(t * 2.80, -t * 2.80) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.60;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.36; p = rot2(0.45) * p; }
	p = abs(p) - 0.52;
	p = rot2(time * -0.86) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.36, lr * 2.78 + time * -0.78); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.00, vec3(0.51, 0.48, 0.50), vec3(0.50, 0.35, 0.44), vec3(1.00, 1.01, 0.75), vec3(0.50, 0.30, 0.58));
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
