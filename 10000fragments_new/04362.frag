uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.33 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.15 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.63) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.10), cos(time * 1.09)) * 0.24;
	float an = atan(p.y, p.x) + time * 0.23;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.36 / 3.1415927, 1.41 / r + time * 2.71);
	tv.x += tv.y * 0.15;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.38, vec3(0.58, 0.52, 0.57), vec3(0.40, 0.49, 0.34), vec3(1.35, 1.05, 1.02), vec3(0.54, 0.85, 0.81));
	col *= clamp(r * 2.97, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
