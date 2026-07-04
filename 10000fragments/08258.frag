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
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.35 + ph), sin(lt * 4.0 + t * 0.97)) * 0.81;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.50) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	{ float fr = length(p); p *= 1.0 + 0.23 * fr * fr; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.57));
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.16, vec3(0.47, 0.43, 0.41), vec3(0.43, 0.44, 0.37), vec3(0.80, 1.03, 0.80), vec3(0.27, 0.34, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
