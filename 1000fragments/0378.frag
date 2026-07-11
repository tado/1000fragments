uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.58 - t * 1.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	p = rot2(length(p) * 1.85 + time * 1.14) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.00 * p.y + time * 1.88); p.y += 0.43 / wf * cos(wf * 2.70 * p.x + time * 1.23); }
	p = rot2(1.11) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.68));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
