uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.70 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.22 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.46 / 3.1415927, 1.27 / r + time * 0.58);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.51, 0.23, 0.79) * (0.07 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.87, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
