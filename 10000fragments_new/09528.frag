uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.04 + t * 3.51 + ph) + sin(p.y * 11.02 - t * 3.51 + ph)
        + sin((p.x + p.y) * 8.55 + t * 3.51 + ph) + sin(length(p) * 17.21 - t * 3.51 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	p = rot2(p.y * 1.14 + time * 1.10) * p;
	p = rot2(time * 0.36) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 1.51 * p.y + time * 1.65); p.y += 0.34 / wf * cos(wf * 1.88 * p.x + time * 0.91); }
	p = abs(p) - 0.63;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.42), field(p, time, 0.83));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
