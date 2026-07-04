uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.31 + jf * 4.0), cos(t * 0.40 * jf)) * 0.78;
        xs += sin(length(p - im) * 135.15 - t * 10.62 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.76 + t * 1.14 + ph) + sin(p.y * 7.65 - t * 1.14 + ph)
        + sin((p.x + p.y) * 11.27 + t * 1.14 + ph) + sin(length(p) * 6.31 - t * 1.14 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.67;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.28) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 1.07) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.82;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 3.16;
	q2 = fract(q2 * 2.51) - 0.5;
	q2 = rot2(length(q2) * 3.68 + time * 0.43) * q2;
	q3 = (floor(q3 * 6.3) + 0.5) / 6.3;
	q3 = sin(q3 * 1.59 + time * 2.40) * 1.49;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d3 = fieldC(q3, time, 0.25);
	d2 = d2 * d3;
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.27, 0.52, 0.38) * (0.07 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
