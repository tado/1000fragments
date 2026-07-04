uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.35 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.17 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.06) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.58;
	p = sin(p * 2.90 + time * 1.71) * 0.91;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.0 + 0.14 * sin(time * 3.25);
	p = rot2(0.43) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.11, vec3(0.48, 0.52, 0.40), vec3(0.46, 0.40, 0.49), vec3(1.37, 0.92, 1.26), vec3(0.18, 0.17, 0.34));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
