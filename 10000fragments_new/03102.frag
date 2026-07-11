uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.22 + jf * 4.0), cos(t * 0.46 * jf)) * 0.78;
        xs += sin(length(p - im) * 128.90 - t * 5.47 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.58;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.65; kp = rot2(2.53) * kp; kp *= 1.18; }
    v = sin(kp.y * 3.08 - t * 3.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.21);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.42));
	vec3 col = hue(d * 1.22 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
