uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.58) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 3.06 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 2.08 + time * 0.30) * p;
	{ p = vec2(atan(p.y, p.x) * 2.60, length(p) * 2.67 - time * 0.21); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.86 * p.y + time * 1.01); p.y += 0.21 / wf * cos(wf * 3.27 * p.x + time * 1.17); }
	p = fract(p * 1.93) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.13, vec3(0.60, 0.49, 0.52), vec3(0.33, 0.36, 0.34), vec3(0.95, 0.89, 1.31), vec3(0.45, 0.43, 0.23));
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
