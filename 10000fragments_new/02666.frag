uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.71 + t * 2.64 + ph) * 0.7;
    float wb = sin(p.y * 9.21 - t * 3.46 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.52;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.63 * sin(mf + 3.0) + ph), cos(t * 1.30 * cos(mf + 3.0) + ph));
        ms += 0.048 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.66 * fr * fr; }
	q1 = (floor(q1 * 20.4) + 0.5) / 20.4;
	q2 = fract(q2 * 1.06) - 0.5;
	q2.x += sin(q2.y * 5.69 + time * 1.38) * 0.24;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.29);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.66 + time * 0.14, vec3(0.41, 0.57, 0.52), vec3(0.41, 0.47, 0.33), vec3(1.34, 1.16, 0.75), vec3(0.91, 0.93, 0.96));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
