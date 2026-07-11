uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.47 + ph), sin(lt * 3.0 + t * 0.40)) * 0.87;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.72) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	{ p = vec2(atan(p.y, p.x) * 2.65, length(p) * 2.64 - time * 0.25); }
	p *= 1.50;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.46, 0.23), vec3(0.89, 0.57, 0.98), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
