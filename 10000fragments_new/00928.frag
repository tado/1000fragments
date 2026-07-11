uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.36 + ph), sin(lt * 2.0 + t * 0.51)) * 0.93;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.73) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.35) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.14 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.40, 0.12) * sin(length(q1) * 5.54 - time * 1.23) * 0.32;
	q1 = rot2(1.83) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.03);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.11, 0.48), vec3(0.73, 0.59, 0.76), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
