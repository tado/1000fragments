uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.00 + t * 1.75 + ph) + sin(p.y * 11.40 - t * 4.23 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.16);
    float gsh = hash21(vec2(grow, floor(t * 7.89))) - 0.5;
    float gx = p.x + gsh * 1.12;
    v = sin(gx * 9.39 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.12));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.20 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.29 / wf * sin(wf * 3.75 * q1.y + (time * 0.65) * 1.84); q1.y += 0.44 / wf * cos(wf * 2.43 * q1.x + (time * 0.65) * 1.10); }
	q2 = rot2(q2.y * 2.28 + (time * 0.65) * 0.37) * q2;
	float d1 = fieldA(q1, (time * 0.65), 0.0);
	float d2 = fieldB(q2, (time * 0.65), 1.38);
	float d = abs(d1 - d2);
	vec3 col = palette((d) * 1.13 + (time * 0.65) * 0.10, vec3(0.44, 0.42, 0.41), vec3(0.15, 0.17, 0.17), vec3(0.82, 0.60, 0.60), vec3(0.25, 0.00, 0.19));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.991, 0.958, 1.023) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
