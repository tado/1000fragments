uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 6.42 * sin(t * 0.55) + t * 5.20 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.30 * cos(sa * 8.0 + t * 1.62 + ph);
    v = sin((sr - petal) * 16.90);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.44, 0.08) * sin(length(q1) * 5.52 - time * 1.87) * 0.12;
	q2 = (floor(q2 * 7.7) + 0.5) / 7.7;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.89);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.85 + time * 0.28, vec3(0.50, 0.60, 0.48), vec3(0.49, 0.31, 0.32), vec3(1.06, 1.18, 1.06), vec3(0.46, 0.84, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
