uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 28.14 - t * 6.98 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 10.24 - t * 2.06 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.46 + jf * 4.0), cos(t * 0.16 * jf)) * 0.64;
        xs += sin(length(p - im) * 190.99 - t * 6.72 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.04, length(q1) * 4.68 - time * 0.31); }
	q1 = fract(q1 * 2.65) - 0.5;
	q2 = (floor(q2 * 17.9) + 0.5) / 17.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.66);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.21, 0.41), vec3(0.70, 0.94, 0.65), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
