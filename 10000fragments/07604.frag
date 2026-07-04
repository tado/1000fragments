uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.32 + vec2(t * 0.76, -t * 0.66);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.88 + 0.24 * sin(t * 1.52)) + vec2(-0.50, -0.20) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.14; vec2 jc = vec2(-0.01 + 0.3 * sin(t * 0.82 + ph), 0.65 + 0.3 * cos(t * 0.55 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 20.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.85));
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 0.91));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.44);
	float d3 = fieldC(q3, time, 0.85);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.77 + time * 0.35, vec3(0.42, 0.51, 0.48), vec3(0.30, 0.41, 0.45), vec3(0.89, 0.85, 1.32), vec3(0.73, 0.98, 0.25));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.20 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
