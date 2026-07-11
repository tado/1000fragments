uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.37 + sin(p.y * 2.79 + t * 3.65) * 1.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.29) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.86, length(p) * 4.56 - time * 0.55); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.26 * p.y + time * 1.00); p.y += 0.27 / wf * cos(wf * 2.98 * p.x + time * 1.60); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.13; p = rot2(1.85) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.84));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
