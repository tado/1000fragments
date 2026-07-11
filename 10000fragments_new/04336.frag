uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.39 + ph), sin(lt * 2.0 + t * 1.02)) * 0.98;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.77) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.98 + ph), vnoise2(p * 4.98 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.98 + 3.80 * wq + vec2(1.7, 9.2) + t * 1.00),
                   vnoise2(p * 4.98 + 2.09 * wq + vec2(8.3, 2.8) - t * 1.07));
    v = vnoise2(p * 4.98 + 3.98 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.59;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.29; p = rot2(0.43) * p; }
	p = rot2(2.69) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.10);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.57 + time * 0.26, vec3(0.48, 0.41, 0.56), vec3(0.45, 0.44, 0.44), vec3(1.00, 0.80, 1.01), vec3(0.54, 0.96, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
