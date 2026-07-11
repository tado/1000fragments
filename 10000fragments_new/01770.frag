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
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.54 + ph), sin(lt * 3.0 + t * 0.57)) * 0.80;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.22) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.66);
    float gsh = hash21(vec2(grow, floor(t * 4.32))) - 0.5;
    float gx = p.x + gsh * 1.05;
    v = sin(gx * 8.33 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.63));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	p = abs(p);
	p.y += sin(p.x * 7.62 + time * 2.01) * 0.39;
	{ p = vec2(atan(p.y, p.x) * 2.91, length(p) * 3.39 - time * 0.45); }
	p *= 1.81;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.70 + time * 0.13, vec3(0.56, 0.57, 0.59), vec3(0.37, 0.40, 0.46), vec3(1.08, 1.02, 1.00), vec3(0.32, 0.96, 0.18));
	col = fract(col * 1.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
