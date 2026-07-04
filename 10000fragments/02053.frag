uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.57 + jf * 4.0), cos(t * 0.49 * jf)) * 0.46;
        xs += sin(length(p - im) * 113.07 - t * 12.16 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.55 + t * 4.17 + ph) + sin(p.y * 6.33 - t * 4.17 + ph)
        + sin((p.x + p.y) * 10.66 + t * 4.17 + ph) + sin(length(p) * 16.77 - t * 4.17 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.42, 0.39) * sin(length(q1) * 3.71 - time * 1.70) * 0.10;
	q1 *= 1.0 + 0.13 * sin(time * 3.52);
	q2 = rot2(q2.y * -2.61 + time * 0.21) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.48 + time * 0.49);
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 1.34 + time * 9.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
