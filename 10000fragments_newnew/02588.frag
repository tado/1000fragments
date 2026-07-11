uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.12 + ph), sin(lt * 3.0 + t * 1.18)) * 0.55;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.46) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.07, vec3(0.46, 0.43, 0.47), vec3(0.36, 0.36, 0.49), vec3(1.12, 0.73, 0.90), vec3(0.13, 0.20, 0.43));
	col = mod(col * 1.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
