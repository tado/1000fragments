uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.87 - t * 7.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.82;
	p = rot2(p.y * 2.03 + time * 1.14) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.72 * p.y + time * 0.92); p.y += 0.41 / wf * cos(wf * 3.26 * p.x + time * 2.04); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.46; p = rot2(1.46) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.77 + time * 0.27);
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
