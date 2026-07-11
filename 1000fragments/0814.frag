uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.25 + sr * 11.28 - t * 3.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.97, -0.60) * sin(length(p) * 2.61 - time * 0.61) * 0.22;
	p = fract(p * 2.54) - 0.5;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 2.84 * p.y + time * 1.95); p.y += 0.32 / wf * cos(wf * 1.85 * p.x + time * 1.33); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.29, vec3(0.58, 0.59, 0.50), vec3(0.41, 0.46, 0.36), vec3(1.02, 0.84, 0.82), vec3(0.71, 0.94, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
