uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.52 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.53) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.12;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.23 / 3.1415927, 0.61 / r - time * 2.01);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.21 + time * 0.51);
	col *= clamp(r * 2.14, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
