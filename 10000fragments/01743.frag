uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.76 - t * 7.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -1.38 + time * 0.72) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.23; p = rot2(0.51) * p; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.65 * p.y + time * 1.42); p.y += 0.47 / wf * cos(wf * 2.29 * p.x + time * 1.77); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.11, vec3(0.54, 0.42, 0.45), vec3(0.41, 0.30, 0.44), vec3(0.91, 1.03, 1.12), vec3(0.51, 0.89, 0.40));
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
