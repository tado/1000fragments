uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.13 + t * 1.50 + ph) + sin(p.y * 13.36 - t * 4.03 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 1.53 * p.y + time * 0.71); p.y += 0.39 / wf * cos(wf * 1.76 * p.x + time * 1.49); }
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	p = rot2(time * 1.20) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.19 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
