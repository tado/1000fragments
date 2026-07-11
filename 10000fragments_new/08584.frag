uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.38; vec2 jc = vec2(-0.14 + 0.3 * sin(t * 0.90 + ph), 0.17 + 0.3 * cos(t * 0.93 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 24.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.71 + ph), sin(lt * 3.0 + t * 0.99)) * 0.92;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.70) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.11));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.35, 0.53), vec3(0.92, 0.87, 0.40), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
