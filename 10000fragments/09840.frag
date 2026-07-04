uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.52 + ph), sin(lt * 2.0 + t * 0.85)) * 0.56;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.88) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	p = (floor(p * 18.6) + 0.5) / 18.6;
	p = rot2(2.89) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.10) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.28, vec3(0.49, 0.57, 0.56), vec3(0.41, 0.46, 0.31), vec3(1.27, 1.04, 0.96), vec3(0.37, 0.41, 0.18));
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
