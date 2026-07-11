uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.43;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.76; kp = rot2(0.79) * kp; kp *= 1.42; }
    v = sin(kp.x * 1.36 - t * 3.70 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.50 + jf * 4.0), cos(t * 0.60 * jf)) * 0.36;
        xs += sin(length(p - im) * 128.20 - t * 10.62 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.74 * fr * fr; }
	q1 = fract(q1 * 1.77) - 0.5;
	{ float fr = length(q2); q2 *= 1.0 + -0.31 * fr * fr; }
	q2 = rot2(time * 0.86) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.28);
	float d = d1 * d2;
	vec3 col = hue(d * 1.31 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
