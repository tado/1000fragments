uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.95 + jf * 4.0), cos(t * 0.22 * jf)) * 0.97;
        xs += sin(length(p - im) * 152.87 - t * 7.49 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.07 * p.y + time * 1.28); p.y += 0.46 / wf * cos(wf * 2.27 * p.x + time * 1.75); }
	p *= 2.68;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.93 + time * 0.27, vec3(0.49, 0.50, 0.57), vec3(0.41, 0.47, 0.49), vec3(0.79, 1.00, 0.83), vec3(0.10, 0.56, 0.37));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
