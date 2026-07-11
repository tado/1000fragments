uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.57 + ph), sin(lt * 3.0 + t * 1.33)) * 0.86;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.10) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 5.97 + time * 3.56) * 0.23;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.62, 0.42, 0.81) * (0.13 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
