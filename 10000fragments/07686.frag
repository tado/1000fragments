uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.40 + sin(p.y * 5.09 + t * 3.86) * 1.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.37 * p.y + time * 0.66); p.y += 0.27 / wf * cos(wf * 2.33 * p.x + time * 1.38); }
	p = rot2(length(p) * -2.16 + time * 0.25) * p;
	{ p = vec2(atan(p.y, p.x) * 2.60, length(p) * 3.24 - time * 0.29); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.50), field(p, time, 1.00));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
