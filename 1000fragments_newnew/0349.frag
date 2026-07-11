uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.49 + ph), sin(lt * 3.0 + t * 1.03)) * 0.87;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.10) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	p = abs(p) - 0.52;
	float d = field(p, (time * 0.56), 0.0);
	vec3 col = palette(d * 1.28 + (time * 0.56) * 0.23, vec3(0.55, 0.44, 0.53), vec3(0.18, 0.25, 0.22), vec3(0.86, 0.45, 0.57), vec3(0.13, 0.26, 0.56));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.940, 0.995, 1.040) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
