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
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.95 + ph), sin(lt * 4.0 + t * 0.75)) * 0.73;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.52) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.38; vec2 jc = vec2(-0.36 + 0.3 * sin(t * 1.56 + ph), -0.36 + 0.3 * cos(t * 0.33 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.25 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.53);
	float d = d1 * d2;
	vec3 col = palette(d * 1.23 + time * 0.25, vec3(0.54, 0.40, 0.45), vec3(0.32, 0.41, 0.49), vec3(1.18, 1.28, 0.87), vec3(0.59, 0.74, 0.99));
	col = mod(col * 1.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
