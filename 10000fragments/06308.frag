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
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.39 + ph), sin(lt * 3.0 + t * 0.74)) * 0.84;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.30) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.50;
	p *= 1.0 + 0.18 * sin(time * 4.18);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.32; }
	p = (floor(p * 19.3) + 0.5) / 19.3;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.20, vec3(0.49, 0.41, 0.53), vec3(0.33, 0.33, 0.47), vec3(1.27, 0.92, 0.79), vec3(0.85, 0.11, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
