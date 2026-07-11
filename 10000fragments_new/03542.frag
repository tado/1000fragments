uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.92 + ph), sin(lt * 2.0 + t * 1.22)) * 0.86;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.34, 0.17, 0.43), vec3(0.59, 0.93, 0.97), d);
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 1.35 + time * 12.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
