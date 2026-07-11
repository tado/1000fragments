uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.67 + ph), sin(lt * 1.0 + t * 1.27)) * 0.89;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.52) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	{ p = vec2(atan(p.y, p.x) * 2.50, length(p) * 2.08 - time * 0.90); }
	p = rot2(length(p) * -3.91 + time * 0.69) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.41, lr * 2.80 + time * 0.48); }
	p.y += sin(p.x * 5.25 + time * 2.24) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.77, 0.66, 0.25) * (0.07 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
