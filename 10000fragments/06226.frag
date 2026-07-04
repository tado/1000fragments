uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.09 * sin(mf + 3.0) + ph), cos(t * 1.04 * cos(mf + 3.0) + ph));
        ms += 0.058 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.09;
    v = 0.5 * (sin(1.0 * cp.x + t * 2.20) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 2.02) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.17);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.22 + time * 0.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
