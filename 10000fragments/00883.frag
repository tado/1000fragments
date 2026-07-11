uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.92 + sin(p.y * 3.10 + t * 5.68) * 2.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.08) * p;
	p = rot2(length(p) * 1.15 + time * 0.63) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.90 * p.y + time * 1.77); p.y += 0.47 / wf * cos(wf * 3.73 * p.x + time * 1.45); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.20), field(p, time, 0.40));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
