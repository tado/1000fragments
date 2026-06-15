uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.36 + sin(p.y * 2.29 + t * 3.53) * 1.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.84) * p;
	p = rot2(p.y * 3.90 + time * 0.65) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.16 * p.y + time * 1.91); p.y += 0.24 / wf * cos(wf * 2.89 * p.x + time * 0.78); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.88), field(p, time, 1.76));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
