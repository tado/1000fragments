uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.30 + 0.23 * pow(abs(cos(ra * 3.0 + t * 0.54)), 2.06);
    v = sin((rr - pet) * 16.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.01 * p.y + time * 1.74); p.y += 0.27 / wf * cos(wf * 1.91 * p.x + time * 1.70); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.27 + time * 0.10);
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 2.04 + time * 15.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
