uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.66 + t * 5.28 + ph) + sin(p.y * 7.06 - t * 0.76 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.52, -0.61) * sin(length(p) * 2.11 - time * 1.79) * 0.37;
	{ p = vec2(atan(p.y, p.x) * 2.02, length(p) * 5.73 - time * 0.41); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.12 * p.y + time * 1.48); p.y += 0.28 / wf * cos(wf * 2.88 * p.x + time * 0.88); }
	p = rot2(length(p) * -1.08 + time * 0.40) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.54));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
