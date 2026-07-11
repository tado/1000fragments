uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.70 + t * 1.38 + ph) + sin(p.y * 4.32 - t * 1.38 + ph)
        + sin((p.x + p.y) * 9.72 + t * 1.38 + ph) + sin(length(p) * 7.07 - t * 1.38 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.63; vec2 jc = vec2(0.27 + 0.3 * sin(t * 1.09 + ph), 0.48 + 0.3 * cos(t * 0.30 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.68;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.88; }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, (time * 0.70), 0.0);
	float d2 = fieldB(q2, (time * 0.70), 1.42);
	float d = max(d1, d2);
	vec3 col = palette((d) * 1.14 + (time * 0.70) * 0.13, vec3(0.31, 0.33, 0.24), vec3(0.32, 0.26, 0.29), vec3(0.44, 0.73, 0.77), vec3(0.81, 0.69, 0.47));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.981, 0.985) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
