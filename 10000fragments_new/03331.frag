uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.23 * sin(mf + 3.0) + ph), cos(t * 2.06 * cos(mf + 3.0) + ph));
        ms += 0.034 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.30 * pow(abs(cos(ra * 4.0 + t * 2.23)), 1.14);
    v = sin((rr - pet) * 20.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.41;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.53);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.70));
	vec3 col = vec3(0.72, 0.21, 0.18) * (0.12 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
