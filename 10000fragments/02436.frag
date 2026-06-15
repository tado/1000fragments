uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.47 - t * 5.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.82;
	p = rot2(length(p) * -2.42 + time * 0.81) * p;
	p = rot2(3.00) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.55 * p.y + time * 1.91); p.y += 0.33 / wf * cos(wf * 2.45 * p.x + time * 1.02); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.48));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
