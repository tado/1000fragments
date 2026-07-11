uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.86 + 0.50 * sin(t * 1.25)) + vec2(-0.71, 0.01) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 27; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	p.y += sin(p.x * 6.59 + time * 1.85) * 0.15;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.66 * p.y + time * 1.16); p.y += 0.20 / wf * cos(wf * 3.92 * p.x + time * 2.00); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.13, vec3(0.42, 0.42, 0.59), vec3(0.31, 0.32, 0.45), vec3(0.94, 1.02, 0.98), vec3(0.78, 0.29, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
