uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.42 + ph), sin(lt * 5.0 + t * 1.23)) * 0.88;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.03) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.47;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.42; kp = rot2(2.14) * kp; kp *= 1.28; }
    v = sin(kp.y * 1.74 - t * 1.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.27, -0.02) * sin(length(q1) * 3.34 - time * 1.42) * 0.11;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.49);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.79));
	vec3 col = hue(d * 1.31 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
