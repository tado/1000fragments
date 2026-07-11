uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.80;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 21.43 - t * 4.06 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.23 - t * 1.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.45 / wf * sin(wf * 2.72 * q1.y + time * 0.62); q1.y += 0.46 / wf * cos(wf * 1.84 * q1.x + time * 1.48); }
	q1 = fract(q1 * 2.92) - 0.5;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 0.73));
	q2 *= 1.0 + 0.18 * sin(time * 1.62);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.13 + time * 0.27, vec3(0.51, 0.47, 0.52), vec3(0.32, 0.47, 0.45), vec3(1.26, 1.06, 1.20), vec3(0.65, 0.89, 1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
