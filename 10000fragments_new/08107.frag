uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.45 + ph), sin(lt * 2.0 + t * 0.69)) * 0.88;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.54) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.19, lr * 2.55 + time * 0.93); }
	p *= 1.50;
	p = rot2(time * -0.82) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.16, 0.51), vec3(0.62, 0.70, 0.45), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
