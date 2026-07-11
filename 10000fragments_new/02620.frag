uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.47 + 0.32 * pow(abs(cos(ra * 6.0 + t * 1.31)), 1.93);
    v = sin((rr - pet) * 18.38 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.41 * sin(mf + 3.0) + ph), cos(t * 1.15 * cos(mf + 3.0) + ph));
        ms += 0.081 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	q2 = rot2(length(q2) * -2.56 + time * 1.45) * q2;
	q2 = (floor(q2 * 8.0) + 0.5) / 8.0;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.82);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.39, 0.45), vec3(0.80, 0.88, 0.67), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
