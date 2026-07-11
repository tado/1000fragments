uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.17 + t * 1.83 + ph) + sin(p.y * 4.07 - t * 1.83 + ph)
        + sin((p.x + p.y) * 7.26 + t * 1.83 + ph) + sin(length(p) * 12.73 - t * 1.83 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.49;
	p = rot2(1.88) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 1.71 * p.y + time * 1.42); p.y += 0.35 / wf * cos(wf * 2.65 * p.x + time * 2.13); }
	p += vec2(-0.86, 0.36) * sin(length(p) * 5.99 - time * 2.28) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.73, 0.44, 0.51) * (0.09 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
