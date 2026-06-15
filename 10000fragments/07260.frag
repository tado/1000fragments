uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.85) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 3.89 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.60;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.35; p = rot2(2.59) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 1.84 * p.y + time * 0.79); p.y += 0.30 / wf * cos(wf * 1.80 * p.x + time * 1.92); }
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.07, vec3(0.57, 0.55, 0.54), vec3(0.31, 0.42, 0.41), vec3(0.77, 0.80, 1.17), vec3(0.74, 0.07, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
