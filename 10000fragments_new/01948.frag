uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.44 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.21 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.93) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	p = fract(p * 2.46) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.53));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
