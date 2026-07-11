uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.81 + ph), sin(lt * 3.0 + t * 1.10)) * 0.99;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.79) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	p = abs(p);
	p = (floor(p * 29.2) + 0.5) / 29.2;
	{ float fr = length(p); p *= 1.0 + -0.28 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.70, lr * 2.53 + time * -0.36); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.89, 0.59, 0.90) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
