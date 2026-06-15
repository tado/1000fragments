uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.65 - t * 4.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.01) - 0.5;
	p = rot2(length(p) * -1.37 + time * 0.72) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.69 * p.y + time * 0.95); p.y += 0.35 / wf * cos(wf * 2.34 * p.x + time * 1.62); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 0.94, 1.37) + vec3(0.12, 0.04, 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
