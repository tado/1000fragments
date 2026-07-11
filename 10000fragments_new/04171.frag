uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.27 + ph), sin(lt * 4.0 + t * 1.49)) * 0.69;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.46) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	p = fract(p * 1.02) - 0.5;
	p += vec2(-0.54, -0.89) * sin(length(p) * 5.99 - time * 1.17) * 0.33;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.50), field(p, time, 1.01));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
