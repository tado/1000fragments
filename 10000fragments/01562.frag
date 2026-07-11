uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.00 - t * 6.05 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.97) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 1.52 * p.y + time * 1.24); p.y += 0.47 / wf * cos(wf * 1.90 * p.x + time * 0.91); }
	p *= 2.30;
	{ float fr = length(p); p *= 1.0 + -0.75 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.43 + time * 0.14);
	col = mod(col * 2.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
