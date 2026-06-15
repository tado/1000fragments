uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.18 * cos(sa * 8 + t * 1.14 + ph);
    v = sin((sr - petal) * 13.69);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.51; p = rot2(2.50) * p; }
	p = rot2(p.y * 3.44 + time * 0.23) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.86 * p.y + time * 1.58); p.y += 0.24 / wf * cos(wf * 1.82 * p.x + time * 1.90); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.59), field(p, time, 1.17));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
