uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.56 + ph), sin(lt * 3.0 + t * 0.79)) * 0.99;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.91) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.22, 0.17), vec3(0.88, 0.76, 0.51), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
