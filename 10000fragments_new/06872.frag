uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.35 + t * 3.44 + ph) * 0.7;
    float wb = sin(p.y * 4.41 - t * 1.85 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.62;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.20 * p.y + time * 0.74); p.y += 0.35 / wf * cos(wf * 2.42 * p.x + time * 1.52); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.97 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
