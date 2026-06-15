uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.58) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 3.75 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.73, lr * 1.59 + time * 0.24); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.20; p = rot2(2.25) * p; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.56 * p.y + time * 1.52); p.y += 0.26 / wf * cos(wf * 3.42 * p.x + time * 1.97); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.17, vec3(0.55, 0.51, 0.51), vec3(0.36, 0.45, 0.34), vec3(0.96, 0.70, 0.81), vec3(0.43, 1.00, 0.85));
	col = clamp((col - 0.5) * 1.86 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
