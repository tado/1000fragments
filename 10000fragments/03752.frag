uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.12 + ph), sin(lt * 4.0 + t * 1.08)) * 0.88;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.62) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.38, 0.44), vec3(0.77, 0.75, 0.61), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
