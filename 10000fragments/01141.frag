uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.29 + t * 1.02 + ph) + sin(p.y * 13.49 - t * 1.02 + ph)
        + sin((p.x + p.y) * 3.53 + t * 1.02 + ph) + sin(length(p) * 9.75 - t * 1.02 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.17;
	p = abs(p);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.35 * p.y + time * 1.95); p.y += 0.46 / wf * cos(wf * 2.97 * p.x + time * 1.34); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.59 + time * 0.12);
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
