uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.72) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 0.54 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.53; p = rot2(0.81) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.82 * p.y + time * 1.31); p.y += 0.46 / wf * cos(wf * 3.63 * p.x + time * 1.33); }
	p.y += sin(p.x * 2.69 + time * 1.10) * 0.22;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.20, vec3(0.51, 0.48, 0.58), vec3(0.32, 0.47, 0.39), vec3(1.35, 1.15, 1.15), vec3(0.77, 0.15, 0.61));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.42 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
