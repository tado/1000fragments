uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.37 - t * 1.51;
    v = sin(floor(lv * 2.3) / 2.3 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 6.18;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.32 + 0.06 * sin(t * 2.25 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.90;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.40 / wf * sin(wf * 1.85 * q2.y + (time * 0.55) * 0.93); q2.y += 0.41 / wf * cos(wf * 3.44 * q2.x + (time * 0.55) * 0.98); }
	{ float fr = length(q2); q2 *= 1.0 + 0.29 * fr * fr; }
	float d1 = fieldA(q1, (time * 0.55), 0.0);
	float d2 = fieldB(q2, (time * 0.55), 0.66);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.55) * 0.78));
	vec3 col = palette((d) * 0.61 + (time * 0.55) * 0.18, vec3(0.45, 0.49, 0.47), vec3(0.19, 0.25, 0.27), vec3(0.62, 0.45, 0.81), vec3(0.91, 0.41, 0.32));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.936, 0.970, 1.049) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
