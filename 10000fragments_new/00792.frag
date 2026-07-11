uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.16 * cos(sa * 6.0 + t * 1.15 + ph);
    v = sin((sr - petal) * 17.34);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.39 + 0.20 * cos(sa * 5.0 + t * 2.17 + ph);
    v = sin((sr - petal) * 6.66);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.78);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.91));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.72 + time * 0.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
