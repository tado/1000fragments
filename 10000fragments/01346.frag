uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.99 + t * 1.76 + ph) + sin(p.y * 6.09 - t * 2.26 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.84) * p;
	p = fract(p * 1.43) - 0.5;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 1.81 * p.y + time * 1.13); p.y += 0.46 / wf * cos(wf * 2.99 * p.x + time * 1.37); }
	{ p = vec2(atan(p.y, p.x) * 2.46, length(p) * 5.54 - time * 0.18); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.73), field(p, time, 1.47));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
