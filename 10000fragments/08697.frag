uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.35 + sr * 13.38 - t * 2.29 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.28 * sin(mf + 3.0) + ph), cos(t * 2.28 * cos(mf + 3.0) + ph));
        ms += 0.055 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.17, length(p) * 3.64 - time * 0.68); }
	p = abs(p) - 0.55;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.05);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.25 + time * 0.09, vec3(0.56, 0.49, 0.53), vec3(0.44, 0.48, 0.50), vec3(0.85, 0.71, 0.90), vec3(0.74, 0.42, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
