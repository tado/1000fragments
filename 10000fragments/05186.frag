uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.32 + sin(p.y * 5.80 + t * 0.68) * 1.57 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.60 + jf * 4.0), cos(t * 0.48 * jf)) * 0.74;
        xs += sin(length(p - im) * 185.49 - t * 6.75 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.20;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.95;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.53, lr * 1.02 + time * 0.43); }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 2.48));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.00);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(1.00, 0.94, 0.83) * (0.11 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
