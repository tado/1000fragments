uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.16 * cos(sa * 5 + t * 1.09 + ph);
    v = sin((sr - petal) * 17.04);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.00;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.26 * p.y + time * 1.97); p.y += 0.30 / wf * cos(wf * 3.11 * p.x + time * 1.03); }
	p = rot2(p.y * 1.24 + time * 0.17) * p;
	p *= 1.56;
	p += vec2(0.84, -0.50) * sin(length(p) * 3.82 - time * 1.38) * 0.31;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.50));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
