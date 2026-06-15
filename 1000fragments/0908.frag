uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.02 - t * 2.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.80 * p.y + time * 0.78); p.y += 0.41 / wf * cos(wf * 1.77 * p.x + time * 1.49); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.21, vec3(0.50, 0.56, 0.58), vec3(0.42, 0.48, 0.45), vec3(1.21, 0.90, 1.27), vec3(0.81, 0.69, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
