uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.62 + t * 4.09 + ph) + sin(p.y * 2.14 - t * 4.09 + ph)
        + sin((p.x + p.y) * 8.76 + t * 4.09 + ph) + sin(length(p) * 17.82 - t * 4.09 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.28 * p.y + time * 1.68); p.y += 0.33 / wf * cos(wf * 2.61 * p.x + time * 1.32); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.28, vec3(0.59, 0.52, 0.52), vec3(0.31, 0.49, 0.40), vec3(1.08, 1.01, 0.94), vec3(0.87, 0.15, 0.22));
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
