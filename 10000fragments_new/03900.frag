uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.66 + ph), sin(lt * 5.0 + t * 0.51)) * 0.68;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.04) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.22, vec3(0.46, 0.47, 0.45), vec3(0.40, 0.33, 0.33), vec3(1.14, 1.18, 0.96), vec3(0.21, 0.49, 0.41));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.53 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
