uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.57 + sin(p.y * 4.87 + t * 5.38) * 2.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.28 * p.y + time * 1.61); p.y += 0.20 / wf * cos(wf * 1.51 * p.x + time * 1.41); }
	p = rot2(p.y * -2.51 + time * 0.61) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.13), field(p, time, 2.26));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
