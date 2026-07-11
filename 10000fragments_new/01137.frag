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
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.45 + ph), sin(lt * 2.0 + t * 0.90)) * 0.92;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.53) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.21, t * 1.59 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	p = fract(p * 2.65) - 0.5;
	p = (floor(p * 6.4) + 0.5) / 6.4;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.54 + time * 0.22, vec3(0.41, 0.51, 0.51), vec3(0.39, 0.36, 0.44), vec3(0.83, 0.77, 1.05), vec3(0.56, 0.73, 0.24));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
