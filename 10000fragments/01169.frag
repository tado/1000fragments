uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.29 + t * 2.12 + ph) + sin(p.y * 3.66 - t * 2.12 + ph)
        + sin((p.x + p.y) * 5.77 + t * 2.12 + ph) + sin(length(p) * 7.68 - t * 2.12 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.28 * p.y + time * 1.86); p.y += 0.27 / wf * cos(wf * 1.78 * p.x + time * 0.75); }
	p = rot2(length(p) * 1.92 + time * 1.18) * p;
	p = fract(p * 1.18) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.25, vec3(0.51, 0.57, 0.47), vec3(0.32, 0.40, 0.31), vec3(0.96, 1.12, 0.77), vec3(0.22, 0.54, 0.47));
	col = fract(col * 2.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
