uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.45 + jf * 4.0), cos(t * 0.46 * jf)) * 0.82;
        xs += sin(length(p - im) * 192.47 - t * 9.97 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.93 + sr * 10.66 - t * 0.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.26;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(0.32) * q2;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.49, lr * 2.02 + time * 0.48); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.23);
	float d = d1 * d2;
	vec3 col = palette(d * 1.31 + time * 0.34, vec3(0.44, 0.45, 0.53), vec3(0.46, 0.40, 0.37), vec3(1.07, 0.76, 1.15), vec3(0.08, 0.20, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
