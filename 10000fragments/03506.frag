uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.82 - t * 5.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.09;
	p *= 2.48;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(0.62) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.62 * p.y + time * 1.13); p.y += 0.48 / wf * cos(wf * 2.56 * p.x + time * 1.77); }
	{ float fr = length(p); p *= 1.0 + -0.21 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.52));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
