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
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.30 + ph), sin(lt * 2.0 + t * 0.37)) * 0.79;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.92) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 3.40 + time * 0.56) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.20, vec3(0.53, 0.59, 0.60), vec3(0.36, 0.35, 0.47), vec3(1.31, 1.02, 0.75), vec3(0.27, 0.80, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
