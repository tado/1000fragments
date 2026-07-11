uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.85 + ph), sin(lt * 3.0 + t * 0.31)) * 0.89;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.92) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.84) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 1.38 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.75);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.50 + time * 0.01, vec3(0.53, 0.43, 0.58), vec3(0.30, 0.31, 0.35), vec3(1.01, 1.10, 1.06), vec3(0.65, 0.31, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
