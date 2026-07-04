uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.85 + ph), sin(lt * 3.0 + t * 0.69)) * 0.52;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.14) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.95, t * 2.61)) - 0.5) * 0.86;
    v = exp(-abs(bx) * 9.05) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p *= 1.0 + 0.24 * sin(time * 4.89);
	p = rot2(time * 1.31) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.46));
	p.x += sin(p.y * 4.62 + time * 2.89) * 0.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.81);
	float d = d1 * d2;
	vec3 col = palette(d * 1.33 + time * 0.14, vec3(0.42, 0.52, 0.42), vec3(0.43, 0.40, 0.36), vec3(1.40, 1.33, 1.25), vec3(0.48, 0.79, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
