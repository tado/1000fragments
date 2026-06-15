uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.23, t * 0.70 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -2.84 + time * 0.24) * p;
	p = abs(p) - 0.46;
	p += vec2(0.81, -0.52) * sin(length(p) * 4.00 - time * 1.93) * 0.16;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.03 * p.y + time * 0.86); p.y += 0.31 / wf * cos(wf * 3.67 * p.x + time * 0.91); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.01));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
