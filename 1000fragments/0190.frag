uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.01 + sr * 18.22 - t * 1.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.70;
	p *= 1.27;
	p = abs(p);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.49 * p.y + time * 1.24); p.y += 0.35 / wf * cos(wf * 2.62 * p.x + time * 1.54); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.16, vec3(0.51, 0.48, 0.48), vec3(0.34, 0.46, 0.48), vec3(0.97, 1.02, 0.99), vec3(0.45, 0.69, 0.52));
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
