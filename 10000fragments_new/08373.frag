uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.52 + ph), sin(lt * 5.0 + t * 0.41)) * 0.62;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.58) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.97, 0.55, 0.60) * (0.24 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
