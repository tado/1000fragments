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
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.22 + ph), sin(lt * 5.0 + t * 0.99)) * 0.96;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.59) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.19, vec3(0.57, 0.44, 0.54), vec3(0.38, 0.46, 0.46), vec3(1.38, 1.35, 1.13), vec3(0.88, 0.28, 0.01));
	col = mod(col * 2.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
