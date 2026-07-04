uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.53, t * 0.82 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.88 - t * 7.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.27 * fr * fr; }
	q1 *= 2.71;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.83, length(q2) * 4.71 - time * 0.49); }
	q2 = (floor(q2 * 27.7) + 0.5) / 27.7;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.59);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.19));
	vec3 col = hue(d * 0.82 + time * 0.32);
	col = mod(col * 2.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
