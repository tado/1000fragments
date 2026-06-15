uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.94 + vec2(t * 1.44, -t * 1.44) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	p = fract(p * 1.71) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.44, length(p) * 5.95 - time * 0.16); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.10 * p.y + time * 1.09); p.y += 0.49 / wf * cos(wf * 3.22 * p.x + time * 1.74); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.21, vec3(0.41, 0.45, 0.49), vec3(0.42, 0.32, 0.31), vec3(0.96, 1.18, 0.93), vec3(0.90, 0.68, 0.93));
	col = mod(col * 2.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
