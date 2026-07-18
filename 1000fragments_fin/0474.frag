uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 25.11 - t * 4.54 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 20.18 - t * 2.44 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.51 + jf * 4.0), cos(t * 0.47 * jf)) * 0.85;
        xs += sin(length(p - im) * 92.78 - t * 10.46 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.85) - 0.5;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin((time * 0.88) * 2.45));
	float d1 = fieldA(q1, (time * 0.88), 0.0);
	float d2 = fieldB(q2, (time * 0.88), 1.92);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.88) * 0.40));
	vec3 col = vec3(1.000, 0.529, 0.262) * (0.13 / (abs((d)) + 0.09));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.036, 1.009, 0.920);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
