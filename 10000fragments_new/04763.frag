uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.35; vec2 jc = vec2(-0.61 + 0.3 * sin(t * 0.85 + ph), -0.69 + 0.3 * cos(t * 1.20 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.44 + ph), sin(lt * 4.0 + t * 0.50)) * 0.56;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.62) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.88);
	float d = d1 * d2;
	vec3 col = palette(d * 1.49 + time * 0.01, vec3(0.48, 0.55, 0.55), vec3(0.50, 0.46, 0.35), vec3(1.29, 1.07, 0.96), vec3(0.25, 0.51, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
