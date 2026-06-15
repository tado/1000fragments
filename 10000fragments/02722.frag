uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.38) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 2.58 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.38 * sin(mf + 3.0) + ph), cos(t * 1.38 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	{ p = vec2(atan(p.y, p.x) * 1.58, length(p) * 5.81 - time * 0.25); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.94);
	float d = d1 + d2;
	vec3 col = palette(d * 0.84 + time * 0.29, vec3(0.45, 0.49, 0.40), vec3(0.41, 0.44, 0.35), vec3(0.88, 0.71, 0.82), vec3(0.97, 0.65, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
