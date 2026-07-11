uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.91 - t * 1.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.47 * fr * fr; }
	p += vec2(-0.57, -0.82) * sin(length(p) * 4.03 - time * 1.45) * 0.27;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.14 * p.y + time * 1.28); p.y += 0.28 / wf * cos(wf * 3.96 * p.x + time * 0.85); }
	p = rot2(2.48) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.01 + time * 0.27);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
