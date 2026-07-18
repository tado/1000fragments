uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.93 + t * 3.66 + ph) + sin(p.y * 3.96 - t * 3.66 + ph)
        + sin((p.x + p.y) * 3.86 + t * 3.66 + ph) + sin(length(p) * 10.40 - t * 3.66 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.47, t * 0.87 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, (time * 0.83), 0.0);
	float d2 = fieldB(q2, (time * 0.83), 1.74);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette((d) * 1.04 + (time * 0.83) * 0.17, vec3(0.57, 0.48, 0.38), vec3(0.30, 0.22, 0.17), vec3(1.01, 0.95, 1.05), vec3(-0.03, 0.13, 0.24));
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.009, 0.974, 1.001);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
