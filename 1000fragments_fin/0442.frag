uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.49;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 15.71 - t * 2.93 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.45 - t * 1.95;
    v = sin(floor(lv * 5.9) / 5.9 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.15;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.38 / wf * sin(wf * 3.54 * q1.y + (time * 0.66) * 2.03); q1.y += 0.45 / wf * cos(wf * 3.28 * q1.x + (time * 0.66) * 0.78); }
	q2.y += sin(q2.x * 5.70 + (time * 0.66) * 3.51) * 0.37;
	q2 = (floor(q2 * 6.2) + 0.5) / 6.2;
	float d1 = fieldA(q1, (time * 0.66), 0.0);
	float d2 = fieldB(q2, (time * 0.66), 0.10);
	float d = min(d1, d2);
	vec3 col = palette((d) * 0.95 + (time * 0.66) * 0.20, vec3(0.29, 0.26, 0.41), vec3(0.44, 0.36, 0.48), vec3(0.96, 1.05, 0.95), vec3(0.64, 0.82, 0.09));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.984, 1.009, 0.938);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
