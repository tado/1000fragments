uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.52 + sr * 17.05 - t * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.72 * p.y + time * 0.75); p.y += 0.36 / wf * cos(wf * 1.63 * p.x + time * 1.04); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.28, vec3(0.47, 0.50, 0.45), vec3(0.34, 0.34, 0.39), vec3(1.16, 1.39, 1.40), vec3(0.78, 0.31, 0.34));
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
