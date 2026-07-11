uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.25 - t * 7.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	p = rot2(p.y * -1.94 + time * 0.95) * p;
	p = abs(p) - 0.37;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.94 * p.y + time * 1.14); p.y += 0.24 / wf * cos(wf * 1.67 * p.x + time * 1.69); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.51; p = rot2(2.33) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.51));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
