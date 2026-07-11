uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 20.99 - t * 4.60 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 18.16 - t * 2.26 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.06;
	{ float fr = length(p); p *= 1.0 + -0.79 * fr * fr; }
	p = rot2(time * 0.92) * p;
	p = abs(p) - 0.23;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.04 * p.y + time * 1.08); p.y += 0.42 / wf * cos(wf * 2.48 * p.x + time * 0.76); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.30));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
