uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.28 * cos(sa * 7 + t * 2.82 + ph);
    v = sin((sr - petal) * 6.64);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	{ float fr = length(p); p *= 1.0 + -0.45 * fr * fr; }
	p = rot2(length(p) * 2.92 + time * 0.34) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.14; p = rot2(1.11) * p; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.47 * p.y + time * 0.97); p.y += 0.25 / wf * cos(wf * 2.92 * p.x + time * 1.87); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.66));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
