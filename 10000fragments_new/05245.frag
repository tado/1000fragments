uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.92 + 0.19 * sin(t * 1.00)) + vec2(-0.37, -0.18) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.78) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 2.55 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.05 - t * 3.79 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = abs(q2);
	q2 += vec2(-0.24, 0.82) * sin(length(q2) * 4.83 - time * 1.11) * 0.31;
	q3 = rot2(q3.y * 2.03 + time * 0.85) * q3;
	q3 = rot2(2.78) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.18);
	float d3 = fieldC(q3, time, 1.95);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.45));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.81, 1.29, 1.47) + vec3(0.13, 0.23, 0.16);
	col = clamp((col - 0.5) * 1.70 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
