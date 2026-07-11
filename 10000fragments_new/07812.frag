uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.81 + jf * 4.0), cos(t * 0.35 * jf)) * 0.65;
        xs += sin(length(p - im) * 208.90 - t * 4.57 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.90 + sin(p.y * 4.81 + t * 1.89) * 3.21 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.18 * cos(sa * 9.0 + t * 1.37 + ph);
    v = sin((sr - petal) * 9.74);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(-0.17, 0.38) * sin(length(q1) * 4.19 - time * 1.91) * 0.32;
	{ float fr = length(q1); q1 *= 1.0 + -0.35 * fr * fr; }
	q3 += vec2(0.40, -0.61) * sin(length(q3) * 5.54 - time * 0.83) * 0.33;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.78);
	float d3 = fieldC(q3, time, 0.74);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.25, 0.50), vec3(0.65, 0.96, 0.71), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
