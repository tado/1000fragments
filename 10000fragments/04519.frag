uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.45, 0.0)) * 12.37 - t * 7.07 + ph);
    float mb = sin(length(p + vec2(0.45, 0.0)) * 9.78 - t * 7.07 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	{ p = vec2(atan(p.y, p.x) * 1.44, length(p) * 5.77 - time * 0.80); }
	p = rot2(time * -1.09) * p;
	p = rot2(length(p) * -3.80 + time * 0.61) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.17 * p.y + time * 0.88); p.y += 0.49 / wf * cos(wf * 3.47 * p.x + time * 1.18); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.98 + time * 0.25);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
