uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.58 + t * 5.20 + ph) + sin(p.y * 15.27 - t * 3.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	p = rot2(p.y * 2.68 + time * 0.89) * p;
	p = rot2(1.66) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.99 * p.y + time * 0.94); p.y += 0.30 / wf * cos(wf * 2.38 * p.x + time * 1.75); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.49));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
