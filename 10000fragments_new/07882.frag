uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.72 + ph), sin(lt * 5.0 + t * 0.42)) * 0.75;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.97) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.26;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.39), field(p, time, 0.78));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
