uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.50 - t * 8.05 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.76 + ph), sin(lt * 1.0 + t * 0.92)) * 0.75;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.13) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = d1 + d2;
	vec3 col = palette(d * 1.67 + time * 0.21, vec3(0.47, 0.50, 0.55), vec3(0.43, 0.44, 0.34), vec3(1.11, 1.30, 1.16), vec3(0.76, 0.15, 0.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
