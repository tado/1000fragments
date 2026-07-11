uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.55 + ph), sin(lt * 1.0 + t * 1.31)) * 0.54;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.67) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.42, 0.52), vec3(1.00, 0.51, 0.48), d);
	col = mod(col * 2.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
