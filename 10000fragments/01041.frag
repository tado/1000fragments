uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.39 + t * 1.28 + ph) + sin(p.y * 8.43 - t * 1.28 + ph)
        + sin((p.x + p.y) * 5.86 + t * 1.28 + ph) + sin(length(p) * 12.51 - t * 1.28 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.31;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.71 * p.y + time * 1.36); p.y += 0.23 / wf * cos(wf * 3.96 * p.x + time * 1.15); }
	{ float fr = length(p); p *= 1.0 + 0.27 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.21; p = rot2(1.38) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.14, vec3(0.60, 0.44, 0.53), vec3(0.36, 0.43, 0.40), vec3(1.34, 1.09, 1.39), vec3(0.22, 0.20, 0.26));
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
