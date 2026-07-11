uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.53 + sin(p.y * 2.29 + t * 3.32) * 1.29 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.87);
    float gsh = hash21(vec2(grow, floor(t * 8.32))) - 0.5;
    float gx = p.x + gsh * 0.46;
    v = sin(gx * 7.56 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.06));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.78 + t * 2.87 + ph) + sin(p.y * 5.66 - t * 1.76 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.69;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(q2.y * 3.67 + time * 1.06) * q2;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q3.x += 0.49 / wf * sin(wf * 2.16 * q3.y + time * 1.15); q3.y += 0.34 / wf * cos(wf * 2.94 * q3.x + time * 1.93); }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.86);
	float d3 = fieldC(q3, time, 1.58);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.42 + time * 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
