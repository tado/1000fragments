uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 34.81 - t * 2.23 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 28.78 - t * 6.12 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.80;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.41 * p.y + time * 0.62); p.y += 0.35 / wf * cos(wf * 3.28 * p.x + time * 1.24); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.59 + time * 0.12);
	col = fract(col * 1.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
