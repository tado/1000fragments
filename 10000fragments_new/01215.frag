uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.33 + t * 3.62 + ph) * 0.7;
    float wb = sin(p.y * 14.86 - t * 0.89 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.52;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.98 * p.y + time * 1.47); p.y += 0.27 / wf * cos(wf * 2.55 * p.x + time * 1.86); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.78 + time * 0.28);
	col = fract(col * 1.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
