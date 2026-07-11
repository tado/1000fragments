uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.49 + ph), sin(lt * 3.0 + t * 0.92)) * 0.96;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.35) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.37, 0.66, 0.85) + vec3(0.20, 0.29, 0.22);
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 1.72 + time * 10.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
