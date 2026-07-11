uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.93 - t * 5.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.76 * p.y + time * 1.66); p.y += 0.38 / wf * cos(wf * 2.07 * p.x + time * 1.26); }
	p = rot2(length(p) * -2.11 + time * 0.54) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.07, -0.37) * sin(length(p) * 2.41 - time * 0.81) * 0.16;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.08));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
