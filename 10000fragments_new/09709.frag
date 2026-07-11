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
    float grow = floor(p.y * 21.07);
    float gsh = hash21(vec2(grow, floor(t * 6.91))) - 0.5;
    float gx = p.x + gsh * 1.05;
    v = sin(gx * 15.92 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.41));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.73 + ph), sin(lt * 4.0 + t * 1.21)) * 0.66;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.76) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p += vec2(0.93, -0.97) * sin(length(p) * 5.50 - time * 0.84) * 0.22;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * 2.22 + time * 1.24) * p;
	p *= 1.21;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = d1 * d2;
	vec3 col = palette(d * 1.45 + time * 0.16, vec3(0.45, 0.41, 0.58), vec3(0.50, 0.38, 0.39), vec3(0.89, 0.70, 0.76), vec3(0.64, 0.92, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
