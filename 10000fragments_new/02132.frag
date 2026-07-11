uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.73 - t * 5.39 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.94 * p.y + time * 1.12); p.y += 0.26 / wf * cos(wf * 3.82 * p.x + time * 2.00); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.68 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
