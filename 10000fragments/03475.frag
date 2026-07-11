uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.05) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 2.64 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.20, length(p) * 5.08 - time * 0.57); }
	p = rot2(length(p) * 3.81 + time * 0.78) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.63 * p.y + time * 0.86); p.y += 0.35 / wf * cos(wf * 3.60 * p.x + time * 1.88); }
	p = fract(p * 1.13) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.28, vec3(0.52, 0.55, 0.59), vec3(0.41, 0.36, 0.34), vec3(1.32, 1.05, 0.72), vec3(0.25, 0.52, 0.67));
	col = mod(col * 1.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
