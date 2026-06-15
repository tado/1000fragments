uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.60 - t * 5.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.38 * p.y + time * 0.93); p.y += 0.22 / wf * cos(wf * 2.25 * p.x + time * 1.02); }
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 5.11 - time * 0.76); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.19; p = rot2(1.07) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.21));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
