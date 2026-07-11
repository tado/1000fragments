uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.89 + jf * 4.0), cos(t * 0.39 * jf)) * 0.65;
        xs += sin(length(p - im) * 190.22 - t * 13.48 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.49 + t * 2.21 + ph) + sin(p.y * 7.99 - t * 2.21 + ph)
        + sin((p.x + p.y) * 4.11 + t * 2.21 + ph) + sin(length(p) * 7.87 - t * 2.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.50; q1 = rot2(0.40) * q1; }
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.11; q2 = rot2(1.10) * q2; }
	q2 = rot2(length(q2) * 1.25 + time * 0.93) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.40);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.19, 0.24), vec3(0.97, 0.76, 0.89), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
