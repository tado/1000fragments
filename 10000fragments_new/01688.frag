uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.36);
    float gsh = hash21(vec2(grow, floor(t * 8.19))) - 0.5;
    float gx = p.x + gsh * 0.89;
    v = sin(gx * 12.54 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.30));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.53 + ph), sin(lt * 1.0 + t * 1.01)) * 0.93;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.98) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	{ float fr = length(p); p *= 1.0 + -0.79 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.42);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.62 + time * 0.09, vec3(0.44, 0.40, 0.44), vec3(0.33, 0.49, 0.44), vec3(0.99, 0.92, 0.86), vec3(0.53, 0.03, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
