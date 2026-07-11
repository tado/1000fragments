uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.67;
    v = 0.5 * (sin(4.0 * cp.x + t * 2.67) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.07) * sin(4.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.46 + sr * 8.05 - t * 4.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.79; }
	q2 = (floor(q2 * 14.4) + 0.5) / 14.4;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.91);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.09 + time * 0.06, vec3(0.48, 0.53, 0.55), vec3(0.38, 0.48, 0.35), vec3(1.02, 0.74, 1.15), vec3(0.12, 0.19, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
