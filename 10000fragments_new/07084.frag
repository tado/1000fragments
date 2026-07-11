uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.56 + sr * 15.29 - t * 2.38 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.80 + ph), sin(lt * 4.0 + t * 1.37)) * 0.98;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.93) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.67;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.94);
	float d = d1 * d2;
	vec3 col = palette(d * 0.60 + time * 0.09, vec3(0.40, 0.45, 0.57), vec3(0.44, 0.42, 0.47), vec3(0.99, 0.94, 1.22), vec3(0.04, 0.47, 0.98));
	col = mod(col * 2.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
