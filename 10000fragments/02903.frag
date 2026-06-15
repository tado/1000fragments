uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.38 + sin(p.y * 3.86 + t * 2.64) * 2.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 1.48 + time * 0.22) * p;
	p = rot2(1.94) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.82 * p.y + time * 1.41); p.y += 0.44 / wf * cos(wf * 2.22 * p.x + time * 1.12); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.26), field(p, time, 2.53));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
