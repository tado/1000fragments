uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.69 + sin(p.y * 5.70 + t * 5.41) * 1.76 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.56;
	p = rot2(2.55) * p;
	p = rot2(time * -0.67) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.14 * p.y + time * 1.63); p.y += 0.49 / wf * cos(wf * 3.31 * p.x + time * 1.47); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.24, 0.37, 0.30), vec3(0.69, 0.96, 0.44), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
