uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.19 * cos(sa * 6.0 + t * 2.52 + ph);
    v = sin((sr - petal) * 13.60);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.98;
	p = rot2(2.08) * p;
	p.x += sin(p.y * 7.03 + time * 3.88) * 0.18;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 1.73 * p.y + time * 1.85); p.y += 0.27 / wf * cos(wf * 1.53 * p.x + time * 0.68); }
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 3.71 - time * 0.48); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.18), field(p, time, 2.35));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
