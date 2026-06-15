uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 37.55 - t * 6.23 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 16.92 - t * 6.23 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.00;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.55 * p.y + time * 1.44); p.y += 0.21 / wf * cos(wf * 1.59 * p.x + time * 1.54); }
	p = rot2(time * -0.31) * p;
	p += vec2(-0.22, 0.79) * sin(length(p) * 3.98 - time * 1.39) * 0.12;
	{ float fr = length(p); p *= 1.0 + -0.59 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.46));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
