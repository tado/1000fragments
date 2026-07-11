uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.10 + sin(p.y * 1.75 + t * 5.59) * 1.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.39;
	p = rot2(time * 1.14) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 1.52 * p.y + time * 1.44); p.y += 0.27 / wf * cos(wf * 2.28 * p.x + time * 1.49); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.25));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
