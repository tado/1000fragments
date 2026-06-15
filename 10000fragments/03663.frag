uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.54 + vec2(t * 1.06, -t * 1.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	p += vec2(-0.31, 0.43) * sin(length(p) * 4.02 - time * 0.84) * 0.21;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.53 * p.y + time * 0.65); p.y += 0.39 / wf * cos(wf * 2.59 * p.x + time * 1.51); }
	p = rot2(2.42) * p;
	p = abs(p) - 0.24;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.17), field(p, time, 2.34));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
