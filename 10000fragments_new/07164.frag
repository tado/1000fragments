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
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.66 + ph), sin(lt * 5.0 + t * 1.23)) * 0.84;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.66) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 33.33 - t * 3.50 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 16.37 - t * 4.56 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.82;
	p = fract(p * 1.63) - 0.5;
	p = rot2(p.y * -1.58 + time * 1.00) * p;
	p = rot2(1.02) * p;
	p.x += sin(p.y * 3.40 + time * 3.92) * 0.15;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.90);
	float d = d1 + d2;
	vec3 col = palette(d * 1.19 + time * 0.29, vec3(0.47, 0.43, 0.47), vec3(0.30, 0.47, 0.46), vec3(0.93, 1.08, 1.38), vec3(0.64, 0.39, 0.77));
	col = fract(col * 2.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
