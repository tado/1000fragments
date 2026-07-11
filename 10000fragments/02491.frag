uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.23 * cos(sa * 9 + t * 2.00 + ph);
    v = sin((sr - petal) * 7.83);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	{ p = vec2(atan(p.y, p.x) * 1.83, length(p) * 2.20 - time * 0.17); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.77 * p.y + time * 1.14); p.y += 0.49 / wf * cos(wf * 3.12 * p.x + time * 1.13); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.37; p = rot2(0.85) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.74));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
