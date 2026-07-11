uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.36 + ph), sin(lt * 3.0 + t * 0.45)) * 0.84;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.88) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.27;
	p *= 2.45;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.24, lr * 1.88 + time * 0.23); }
	{ p = vec2(atan(p.y, p.x) * 1.77, length(p) * 2.92 - time * 0.22); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.15; p = rot2(1.68) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.12, 0.96, 0.75) + vec3(0.09, 0.08, 0.19);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
