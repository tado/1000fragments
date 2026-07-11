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
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.16 + ph), sin(lt * 5.0 + t * 0.91)) * 0.82;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.97;
	p.x += sin(p.y * 7.53 + time * 3.34) * 0.10;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.71 * p.y + time * 0.78); p.y += 0.37 / wf * cos(wf * 2.17 * p.x + time * 0.67); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 3.91 + time * 0.53) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.64 + time * 0.20, vec3(0.53, 0.46, 0.54), vec3(0.47, 0.45, 0.50), vec3(1.15, 1.24, 0.87), vec3(0.64, 0.25, 0.48));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
