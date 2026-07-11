uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 2.47 * sin(t * 0.60) + t * 1.10 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.49 + jf * 4.0), cos(t * 0.33 * jf)) * 0.62;
        xs += sin(length(p - im) * 103.41 - t * 6.19 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 7.87 + time * 2.55) * 0.37;
	q1 = rot2(q1.y * 1.02 + time * 1.08) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.15);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.21));
	vec3 col = vec3(0.62, 0.66, 0.44) * (0.06 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = mod(col * 2.15, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
