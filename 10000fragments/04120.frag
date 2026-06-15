uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.41 - t * 1.85 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(time * -0.96) * p;
	p = abs(p);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.21 * p.y + time * 1.55); p.y += 0.44 / wf * cos(wf * 3.02 * p.x + time * 0.71); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.15));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
