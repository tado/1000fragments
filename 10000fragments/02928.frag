uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.73) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 2.14 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.98 * p.y + time * 1.42); p.y += 0.42 / wf * cos(wf * 2.42 * p.x + time * 1.46); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.54; p = rot2(1.92) * p; }
	p = rot2(time * 1.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.03, vec3(0.54, 0.48, 0.45), vec3(0.36, 0.43, 0.48), vec3(0.83, 1.07, 1.10), vec3(0.96, 0.27, 0.28));
	col = clamp((col - 0.5) * 1.79 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
