uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.00 + t * 4.62 + ph) + sin(p.y * 14.84 - t * 4.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.99 * p.y + time * 0.73); p.y += 0.33 / wf * cos(wf * 1.72 * p.x + time * 1.00); }
	p = rot2(p.y * 3.77 + time * 0.27) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.19));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
