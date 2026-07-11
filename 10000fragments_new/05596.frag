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
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.86 + ph), sin(lt * 5.0 + t * 0.86)) * 0.65;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.63) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.38 + time * 0.34) * p;
	p += vec2(0.33, -0.65) * sin(length(p) * 4.53 - time * 1.43) * 0.19;
	p *= 2.07;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.23, vec3(0.55, 0.56, 0.50), vec3(0.41, 0.39, 0.36), vec3(1.31, 1.19, 1.29), vec3(0.77, 0.40, 0.06));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
