uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.88);
    float gsh = hash21(vec2(grow, floor(t * 2.39))) - 0.5;
    float gx = p.x + gsh * 0.96;
    v = sin(gx * 8.09 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.36));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.62 + ph), sin(lt * 4.0 + t * 1.38)) * 0.93;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.51) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.36);
	float d = d1 + d2;
	vec3 col = palette(d * 1.13 + time * 0.06, vec3(0.54, 0.51, 0.46), vec3(0.40, 0.42, 0.40), vec3(1.04, 0.99, 1.25), vec3(0.09, 0.03, 0.55));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
