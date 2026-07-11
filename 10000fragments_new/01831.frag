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
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.02 + ph), sin(lt * 4.0 + t * 1.00)) * 0.81;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.79) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 23.50 - t * 3.85 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 36.16 - t * 1.14 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	p = rot2(length(p) * -3.36 + time * 0.77) * p;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.22);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.28 + time * 0.15, vec3(0.45, 0.45, 0.57), vec3(0.46, 0.34, 0.32), vec3(1.30, 0.83, 1.08), vec3(0.48, 0.57, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
