uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.62 + sr * 8.20 - t * 3.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.90 * p.y + time * 1.16); p.y += 0.40 / wf * cos(wf * 1.83 * p.x + time * 1.94); }
	p = fract(p * 1.51) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.54 + time * 0.00, vec3(0.48, 0.59, 0.50), vec3(0.49, 0.46, 0.33), vec3(1.18, 1.07, 1.30), vec3(0.17, 0.08, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
