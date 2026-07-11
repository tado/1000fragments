uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.61 * sin(mf + 3.0) + ph), cos(t * 0.67 * cos(mf + 3.0) + ph));
        ms += 0.036 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.34, t * 0.97 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.71, t * 1.33 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3.x += sin(q3.y * 3.30 + time * 1.93) * 0.16;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.12);
	float d3 = fieldC(q3, time, 0.44);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = vec3(0.76, 0.76, 0.54) * (0.11 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = fract(col * 1.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
