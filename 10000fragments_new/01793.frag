uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.82 + t * 5.08 + ph) + sin(p.y * 15.68 - t * 5.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	p = (floor(p * 9.9) + 0.5) / 9.9;
	p = rot2(0.93) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.76 * p.y + time * 0.76); p.y += 0.36 / wf * cos(wf * 2.69 * p.x + time * 1.10); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.96, 0.81, 0.44) * (0.12 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
