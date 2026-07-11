uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.44;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.65; kp = rot2(0.56) * kp; kp *= 1.28; }
    v = sin(kp.x * 2.59 - t * 4.96 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.99 + ph), sin(lt * 2.0 + t * 1.35)) * 0.72;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.84) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 3.24 + time * 1.23) * 0.29;
	q2 += vec2(0.21, 0.84) * sin(length(q2) * 2.78 - time * 1.27) * 0.27;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.50 / wf * sin(wf * 3.26 * q2.y + time * 2.04); q2.y += 0.25 / wf * cos(wf * 3.67 * q2.x + time * 1.76); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.51);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.68));
	vec3 col = palette(d * 1.18 + time * 0.22, vec3(0.52, 0.51, 0.53), vec3(0.48, 0.46, 0.32), vec3(1.39, 0.79, 0.80), vec3(0.48, 0.17, 0.80));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
