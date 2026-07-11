uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.57) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 3.31 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.12 + t * 0.81 + ph) + sin(p.y * 8.19 - t * 0.81 + ph)
        + sin((p.x + p.y) * 5.69 + t * 0.81 + ph) + sin(length(p) * 5.05 - t * 0.81 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.41 + 0.13 * sin(t * 1.20)) + vec2(-0.82, -0.24) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 23; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 23.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.55; q1 = rot2(0.84) * q1; }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin((time * 0.71) * 2.04));
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 1.14;
	float d1 = fieldA(q1, (time * 0.71), 0.0);
	float d2 = fieldB(q2, (time * 0.71), 1.07);
	float d3 = fieldC(q3, (time * 0.71), 0.93);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = palette((d) * 0.56 + (time * 0.71) * 0.11, vec3(0.33, 0.32, 0.35), vec3(0.15, 0.15, 0.19), vec3(0.80, 0.85, 0.82), vec3(0.70, 0.92, 0.68));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.008, 0.993, 1.018) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
