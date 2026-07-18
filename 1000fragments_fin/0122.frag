uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.49 + ph), sin(lt * 5.0 + t * 1.19)) * 0.76;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	p = rot2(p.y * -3.21 + (time * 0.75) * 0.92) * p;
	p *= 2.19;
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, (time * 0.75), 0.0);
	vec3 col = mix(vec3(0.117, 0.046, 0.169), vec3(0.672, 0.943, 0.792), d);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.017, 0.962, 1.018);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
