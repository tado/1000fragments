uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.81 + t * 3.74 + ph) + sin(p.y * 12.92 - t * 3.74 + ph)
        + sin((p.x + p.y) * 5.32 + t * 3.74 + ph) + sin(length(p) * 17.39 - t * 3.74 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.19 + jf * 4.0), cos(t * 0.14 * jf)) * 0.86;
        xs += sin(length(p - im) * 181.88 - t * 13.01 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.34);
	float d = max(d1, d2);
	vec3 col = hue(d * 0.65 + time * 0.37);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
