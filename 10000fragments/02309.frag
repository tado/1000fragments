uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.14 * cos(sa * 7 + t * 1.10 + ph);
    v = sin((sr - petal) * 8.17);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.56) * p;
	p = abs(p) - 0.24;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.32 * p.y + time * 1.17); p.y += 0.22 / wf * cos(wf * 3.95 * p.x + time * 1.50); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.91), field(p, time, 1.83));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
