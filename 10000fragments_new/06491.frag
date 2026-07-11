uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.44 + sr * 10.98 - t * 0.76 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.20 * cos(sa * 4.0 + t * 2.95 + ph);
    v = sin((sr - petal) * 18.36);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.48;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.94);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.99 + time * 0.13, vec3(0.45, 0.59, 0.56), vec3(0.36, 0.48, 0.31), vec3(1.40, 0.73, 1.37), vec3(0.90, 0.80, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
