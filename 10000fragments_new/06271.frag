uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.59 * jf)) * 0.80;
        xs += sin(length(p - im) * 71.69 - t * 9.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.07 + sin(p.y * 3.31 + t * 3.49) * 1.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.17, -0.28) * sin(length(q1) * 2.33 - time * 2.10) * 0.36;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.61);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.44 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
