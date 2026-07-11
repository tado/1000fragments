uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.93 + t * 4.41 + ph) + sin(p.y * 11.59 - t * 4.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p = rot2(1.13) * p;
	p = rot2(time * -0.97) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.16 * p.y + time * 0.89); p.y += 0.46 / wf * cos(wf * 1.96 * p.x + time * 0.65); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.32, 0.72, 1.43) + vec3(0.07, 0.18, 0.24);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
