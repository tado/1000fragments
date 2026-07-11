uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.39 - t * 4.91 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.04 + ga * 2.0 - t * 1.95 + ph);
    v = arm * exp(-gr * 1.02);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.88 + t * 0.87) - 0.5) * 2.0;
    v = sin((p.y * 7.78 + zx * 1.05 + t * 2.81) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.80, 0.23) * sin(length(q1) * 5.41 - time * 1.82) * 0.13;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.51);
	float d3 = fieldC(q3, time, 0.28);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.13 + time * 0.26, vec3(0.48, 0.50, 0.46), vec3(0.39, 0.50, 0.46), vec3(0.89, 0.96, 1.03), vec3(0.17, 0.76, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
