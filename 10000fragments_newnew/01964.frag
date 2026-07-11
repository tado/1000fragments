uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.97;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 16.21 - t * 4.88 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.66 + ph), sin(lt * 5.0 + t * 1.16)) * 0.56;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.73) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.34;
	p = fract(p * 1.83) - 0.5;
	p *= 1.0 + 0.17 * sin(time * 3.53);
	p += vec2(0.85, -0.54) * sin(length(p) * 5.27 - time * 1.67) * 0.24;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.60 + time * 0.01, vec3(0.41, 0.42, 0.48), vec3(0.41, 0.33, 0.37), vec3(1.10, 1.25, 1.38), vec3(0.43, 0.53, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
