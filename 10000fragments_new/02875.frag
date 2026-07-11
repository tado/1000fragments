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
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.45 + ph), sin(lt * 4.0 + t * 1.16)) * 0.62;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.70) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.41 + time * 0.06, vec3(0.43, 0.52, 0.42), vec3(0.39, 0.46, 0.48), vec3(1.04, 0.88, 1.36), vec3(0.76, 0.46, 0.03));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
