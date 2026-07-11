uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.42 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.56) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 2.57 + time * 3.18) * 0.39;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.40; p = rot2(2.02) * p; }
	p += vec2(0.53, -0.39) * sin(length(p) * 4.40 - time * 1.94) * 0.14;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
