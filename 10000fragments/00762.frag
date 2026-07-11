uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.40 + sin(p.y * 2.85 + t * 3.68) * 4.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.50) - 0.5;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.77 * p.y + time * 1.44); p.y += 0.32 / wf * cos(wf * 3.71 * p.x + time * 1.90); }
	p = rot2(length(p) * 3.93 + time * 0.57) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
