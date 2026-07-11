uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.23 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.27 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.26) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.60) * 0.43), cos((time * 0.60) * 0.53)) * 0.12;
	float an = atan(p.y, p.x) + (time * 0.60) * 0.67;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.32 / 3.1415927, 0.37 / r + (time * 0.60) * 2.70);
	float d = field(tv, (time * 0.60), 0.0);
	vec3 col = palette((d) * 1.17 + (time * 0.60) * 0.12, vec3(0.46, 0.44, 0.41), vec3(0.18, 0.21, 0.23), vec3(0.70, 0.59, 0.52), vec3(0.35, 0.03, 0.11));
	col *= clamp(r * 1.23, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.65));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.941, 0.988, 1.025) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
