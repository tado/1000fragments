uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 10.43 - t * 7.74 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 24.55 - t * 7.74 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	p *= 2.14;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.55 * p.y + time * 0.76); p.y += 0.45 / wf * cos(wf * 3.14 * p.x + time * 1.55); }
	{ float fr = length(p); p *= 1.0 + -0.48 * fr * fr; }
	p = fract(p * 2.40) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.75 + time * 0.17);
	col = clamp((col - 0.5) * 2.08 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
