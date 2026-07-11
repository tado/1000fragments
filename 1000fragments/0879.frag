uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.91 * sin(mf + 3.0) + ph), cos(t * 1.91 * cos(mf + 3.0) + ph));
        ms += 0.046 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.60;
	p = fract(p * 2.29) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.30, vec3(0.58, 0.48, 0.56), vec3(0.45, 0.44, 0.46), vec3(0.88, 1.01, 1.12), vec3(0.75, 0.85, 0.14));
	col = mod(col * 2.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
