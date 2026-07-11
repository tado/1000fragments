uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.83 + t * 5.13 + ph) + sin(p.y * 14.94 - t * 2.89 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	p = rot2(p.y * -2.43 + time * 0.15) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.73 * p.y + time * 1.78); p.y += 0.22 / wf * cos(wf * 3.05 * p.x + time * 0.76); }
	p += vec2(-0.39, 0.20) * sin(length(p) * 4.87 - time * 0.79) * 0.33;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.21; p = rot2(2.48) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.62));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
