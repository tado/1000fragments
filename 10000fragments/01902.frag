uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.74 + sr * 11.07 - t * 3.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.39;
	p = rot2(p.y * -3.05 + time * 0.19) * p;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 1.81 * p.y + time * 0.61); p.y += 0.47 / wf * cos(wf * 1.82 * p.x + time * 0.82); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.07), field(p, time, 2.15));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
