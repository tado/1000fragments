uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.19 * cos(sa * 6 + t * 1.77 + ph);
    v = sin((sr - petal) * 11.95);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.72;
	p = abs(p);
	p += vec2(0.94, 0.57) * sin(length(p) * 2.72 - time * 0.60) * 0.40;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.65 * p.y + time * 0.72); p.y += 0.46 / wf * cos(wf * 2.76 * p.x + time * 1.89); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.65));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
