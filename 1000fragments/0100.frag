uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.57, t * 1.36 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.18 + jf * 4.0), cos(t * 0.42 * jf)) * 0.39;
        xs += sin(length(p - im) * 182.40 - t * 8.85 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.95;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.19, length(q1) * 2.23 - time * 0.85); }
	q1 += vec2(0.93, -0.12) * sin(length(q1) * 5.19 - time * 1.38) * 0.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.96);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.89));
	vec3 col = hue(d * 1.23 + time * 0.27);
	col *= 0.87 + 0.10 * sin(gl_FragCoord.y * 2.14 + time * 11.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
