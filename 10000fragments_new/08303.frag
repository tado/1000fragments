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
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.48 + ph), sin(lt * 2.0 + t * 0.59)) * 0.76;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.90) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	p = rot2(p.y * 3.88 + time * 0.31) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.17, vec3(0.42, 0.45, 0.45), vec3(0.44, 0.42, 0.38), vec3(1.21, 0.84, 1.21), vec3(0.67, 0.48, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
