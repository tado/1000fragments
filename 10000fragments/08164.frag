uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.59 + t * 1.15 + ph) + sin(p.y * 2.92 - t * 1.15 + ph)
        + sin((p.x + p.y) * 5.98 + t * 1.15 + ph) + sin(length(p) * 13.68 - t * 1.15 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	p = rot2(0.91) * p;
	p = fract(p * 1.28) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.63 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 2.93 * p.y + time * 1.62); p.y += 0.49 / wf * cos(wf * 2.17 * p.x + time * 1.91); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.52));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
