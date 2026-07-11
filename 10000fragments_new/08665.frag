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
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.37 + ph), sin(lt * 3.0 + t * 0.55)) * 0.99;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.80) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.21, vec3(0.51, 0.51, 0.57), vec3(0.44, 0.47, 0.48), vec3(0.71, 0.91, 0.95), vec3(0.44, 0.12, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
