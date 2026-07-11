uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.36 + jf * 4.0), cos(t * 0.42 * jf)) * 0.72;
        xs += sin(length(p - im) * 61.37 - t * 4.18 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.20 * cos(sa * 4.0 + t * 1.70 + ph);
    v = sin((sr - petal) * 11.52);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 3.58 + time * 1.05) * q1;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.17, lr * 1.55 + time * -0.39); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.14);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.33));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.16, 0.15), vec3(0.76, 0.70, 0.46), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
