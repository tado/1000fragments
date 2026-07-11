uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.53 * jf)) * 0.46;
        xs += sin(length(p - im) * 161.71 - t * 10.52 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.96 * p.y + time * 1.75); p.y += 0.49 / wf * cos(wf * 2.69 * p.x + time * 1.65); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.76 + time * 0.26, vec3(0.52, 0.56, 0.60), vec3(0.42, 0.31, 0.48), vec3(0.94, 0.93, 1.37), vec3(0.99, 0.57, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
