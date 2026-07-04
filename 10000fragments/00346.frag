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
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.58 + ph), sin(lt * 1.0 + t * 1.15)) * 0.56;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.07) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.90) - 0.5;
	p = abs(p);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.85;
	p = rot2(2.53) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.07, vec3(0.59, 0.54, 0.59), vec3(0.31, 0.31, 0.49), vec3(0.84, 0.84, 0.73), vec3(0.49, 0.04, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
