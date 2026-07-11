uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.99 + 0.49 * sin(t * 0.46)) + vec2(-0.89, -0.28) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.25 + t * 1.02 + ph) * 0.7;
    float wb = sin(p.y * 15.39 - t * 3.63 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.61;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.84 + sin(p.y * 4.55 + t * 1.25) * 1.15 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.41;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 4.47 + time * 2.72) * 0.14;
	q1 = rot2(q1.y * -3.41 + time * 0.39) * q1;
	q3 = abs(q3);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d3 = fieldC(q3, time, 1.97);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.17, 0.42, 0.67) * (0.17 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
