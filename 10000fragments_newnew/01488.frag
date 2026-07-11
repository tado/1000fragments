uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.16 - t * 0.61;
    v = sin(floor(lv * 4.0) / 4.0 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.12;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.45 * p.y + time * 1.86); p.y += 0.21 / wf * cos(wf * 3.14 * p.x + time * 0.87); }
	p = sin(p * 2.64 + time * 2.15) * 0.83;
	p = fract(p * 2.74) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.55 + time * 0.16);
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
