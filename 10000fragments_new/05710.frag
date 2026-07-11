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
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.62 + ph), sin(lt * 4.0 + t * 0.80)) * 0.92;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.85) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.87);
    float gsh = hash21(vec2(grow, floor(t * 7.22))) - 0.5;
    float gx = p.x + gsh * 0.76;
    v = sin(gx * 15.18 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.94));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * 1.43) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = d1 * d2;
	vec3 col = palette(d * 0.73 + time * 0.29, vec3(0.51, 0.42, 0.42), vec3(0.30, 0.41, 0.50), vec3(0.87, 1.30, 0.93), vec3(0.94, 0.47, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
