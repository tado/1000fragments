uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.27 + sin(p.y * 5.70 + t * 5.66) * 4.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 2.72 + time * 0.51) * p;
	{ float fr = length(p); p *= 1.0 + -0.53 * fr * fr; }
	p *= 1.24;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.30 * p.y + time * 1.02); p.y += 0.49 / wf * cos(wf * 4.00 * p.x + time * 1.06); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.00), field(p, time, 2.01));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.87 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
