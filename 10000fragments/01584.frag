uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.12 - t * 5.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.61;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.29 * p.y + time * 1.66); p.y += 0.32 / wf * cos(wf * 2.95 * p.x + time * 1.20); }
	p = fract(p * 1.19) - 0.5;
	p = rot2(time * 0.91) * p;
	p = rot2(p.y * -3.30 + time * 0.37) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.99), field(p, time, 1.99));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
