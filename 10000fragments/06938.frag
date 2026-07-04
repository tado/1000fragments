uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.81 + sin(p.y * 3.65 + t * 4.04) * 3.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.50 * p.y + time * 0.73); p.y += 0.35 / wf * cos(wf * 2.42 * p.x + time * 1.16); }
	p = rot2(p.y * 1.42 + time * 0.97) * p;
	p += vec2(0.36, 0.03) * sin(length(p) * 2.47 - time * 1.55) * 0.10;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.37));
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.69, 0.35, 0.55) * (0.20 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
