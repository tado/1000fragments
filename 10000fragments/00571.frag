uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.80 + sin(p.y * 4.18 + t * 5.56) * 3.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.85 * p.y + time * 0.80); p.y += 0.34 / wf * cos(wf * 3.60 * p.x + time * 1.08); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.11 + time * 0.04);
	col = fract(col * 2.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
