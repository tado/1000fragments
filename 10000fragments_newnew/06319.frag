uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.18 * pow(abs(cos(ra * 4.0 + t * 0.53)), 0.79);
    v = sin((rr - pet) * 14.10 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.98 + t * 2.97 + ph) + sin(p.y * 10.66 - t * 2.97 + ph)
        + sin((p.x + p.y) * 6.42 + t * 2.97 + ph) + sin(length(p) * 4.67 - t * 2.97 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.42 / wf * sin(wf * 2.49 * q1.y + time * 1.92); q1.y += 0.24 / wf * cos(wf * 3.14 * q1.x + time * 1.91); }
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.61;
	q2 += vec2(-0.89, -0.30) * sin(length(q2) * 2.80 - time * 0.80) * 0.11;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.37);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.41 + time * 0.15, vec3(0.56, 0.50, 0.53), vec3(0.41, 0.49, 0.47), vec3(0.92, 1.26, 1.23), vec3(0.58, 0.76, 0.53));
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 1.10 + time * 15.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
