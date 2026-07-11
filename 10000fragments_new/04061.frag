uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.26 * cos(sa * 6.0 + t * 1.07 + ph);
    v = sin((sr - petal) * 8.47);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.14 + jf * 4.0), cos(t * 0.14 * jf)) * 0.72;
        xs += sin(length(p - im) * 186.42 - t * 5.70 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2) - 0.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.25);
	float d = min(d1, d2);
	vec3 col = vec3(0.34, 0.89, 0.56) * (0.20 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 2.79 + time * 10.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
