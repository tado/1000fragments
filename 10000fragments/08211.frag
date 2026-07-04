uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.25;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.71; kp = rot2(1.51) * kp; kp *= 1.23; }
    v = sin(kp.y * 2.76 - t * 1.93 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.94 + jf * 4.0), cos(t * 0.39 * jf)) * 0.85;
        xs += sin(length(p - im) * 82.44 - t * 8.41 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.06, length(q2) * 3.50 - time * 0.22); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.45);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.32));
	vec3 col = hue(d * 0.69 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
