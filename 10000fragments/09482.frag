uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.29 * cos(sa * 5 + t * 2.75 + ph);
    v = sin((sr - petal) * 6.50);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	p += vec2(-0.64, 0.79) * sin(length(p) * 5.77 - time * 0.64) * 0.17;
	p = rot2(2.92) * p;
	p = rot2(length(p) * 3.39 + time * 1.06) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.17 * p.y + time * 1.62); p.y += 0.21 / wf * cos(wf * 2.64 * p.x + time * 1.42); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.67));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
