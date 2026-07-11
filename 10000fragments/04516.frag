uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 37.05 - t * 7.50 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 39.34 - t * 7.50 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.88 * p.y + time * 1.77); p.y += 0.38 / wf * cos(wf * 2.58 * p.x + time * 1.46); }
	{ p = vec2(atan(p.y, p.x) * 1.35, length(p) * 4.53 - time * 0.12); }
	p = fract(p * 1.88) - 0.5;
	p = abs(p) - 0.71;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.23, vec3(0.42, 0.58, 0.57), vec3(0.33, 0.42, 0.35), vec3(0.79, 1.07, 1.01), vec3(0.10, 0.52, 0.35));
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
