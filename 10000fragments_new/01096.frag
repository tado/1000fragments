uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.28 * cos(sa * 3.0 + t * 2.64 + ph);
    v = sin((sr - petal) * 16.71);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.51 * sin(mf + 3.0) + ph), cos(t * 2.29 * cos(mf + 3.0) + ph));
        ms += 0.038 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.96, length(q2) * 5.50 - time * 0.90); }
	q2.y += sin(q2.x * 4.13 + time * 3.30) * 0.27;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.09);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.95 + time * 0.17);
	col = fract(col * 2.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
