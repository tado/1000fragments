uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.51 * sin(mf + 3.0) + ph), cos(t * 1.84 * cos(mf + 3.0) + ph));
        ms += 0.068 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.50 + sin(p.y * 5.37 + t * 2.59) * 1.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 1.27) - 0.5;
	q2.y += sin(q2.x * 2.43 + time * 3.63) * 0.22;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.56);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.93 + time * 0.25, vec3(0.44, 0.45, 0.47), vec3(0.33, 0.43, 0.33), vec3(1.02, 1.30, 1.00), vec3(0.62, 0.33, 0.34));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
