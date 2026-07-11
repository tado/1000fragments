uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.54 + sin(p.y * 1.31 + t * 4.17) * 3.02 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.15 + jf * 4.0), cos(t * 0.21 * jf)) * 0.88;
        xs += sin(length(p - im) * 178.49 - t * 13.62 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 5.83 + time * 3.74) * 0.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.33);
	float d = min(d1, d2);
	vec3 col = vec3(0.40, 0.34, 0.41) * (0.05 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.03 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
