uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.55 + 0.24 * pow(abs(cos(ra * 3.0 + t * 2.17)), 1.95);
    v = sin((rr - pet) * 18.86 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.62;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.44 * p.y + time * 1.71); p.y += 0.43 / wf * cos(wf * 1.87 * p.x + time * 0.97); }
	p = rot2(3.10) * p;
	p = rot2(p.y * -1.48 + time * 0.88) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.53));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
