uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.94 + t * 1.02 + ph) + sin(p.y * 11.48 - t * 1.02 + ph)
        + sin((p.x + p.y) * 4.08 + t * 1.02 + ph) + sin(length(p) * 5.45 - t * 1.02 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 3.00 * p.y + time * 0.72); p.y += 0.43 / wf * cos(wf * 2.28 * p.x + time * 0.70); }
	p += vec2(-0.42, 0.07) * sin(length(p) * 4.76 - time * 1.74) * 0.20;
	p = rot2(p.y * 3.94 + time * 0.57) * p;
	p *= 2.99;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.31), field(p, time, 0.61));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
