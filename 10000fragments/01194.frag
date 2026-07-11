uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.92 + t * 4.83 + ph) + sin(p.y * 12.79 - t * 4.83 + ph)
        + sin((p.x + p.y) * 9.53 + t * 4.83 + ph) + sin(length(p) * 9.23 - t * 4.83 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.40, length(p) * 3.68 - time * 0.42); }
	p = abs(p) - 0.49;
	p = rot2(p.y * -1.29 + time * 0.90) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.99 * p.y + time * 1.48); p.y += 0.24 / wf * cos(wf * 3.93 * p.x + time * 1.51); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.15, vec3(0.51, 0.51, 0.53), vec3(0.47, 0.44, 0.35), vec3(0.89, 0.84, 1.17), vec3(0.87, 0.04, 0.72));
	col = fract(col * 1.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
