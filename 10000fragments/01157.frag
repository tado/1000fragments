uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.17 + ph), sin(lt * 5.0 + t * 0.98)) * 0.65;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.57; p = rot2(0.36) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.28, vec3(0.54, 0.57, 0.45), vec3(0.44, 0.38, 0.36), vec3(1.03, 0.79, 0.85), vec3(0.36, 0.37, 0.16));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
