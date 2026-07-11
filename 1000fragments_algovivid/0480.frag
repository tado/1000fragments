uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.87 + t * 0.95) - 0.5) * 2.0;
    v = sin((p.y * 5.50 + zx * 1.81 + t * 1.92) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.61 + t * 3.79 + ph) + sin(p.y * 3.75 - t * 3.79 + ph)
        + sin((p.x + p.y) * 10.32 + t * 3.79 + ph) + sin(length(p) * 5.92 - t * 3.79 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.89 + 0.31 * sin(t * 1.01)) + vec2(-0.65, -0.05) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.58;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.11;
	q3 += vec2(0.82, -0.67) * sin(length(q3) * 2.95 - (time * 0.57) * 1.65) * 0.36;
	float d1 = fieldA(q1, (time * 0.57), 0.0);
	float d2 = fieldB(q2, (time * 0.57), 1.91);
	float d3 = fieldC(q3, (time * 0.57), 1.81);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.57) * 1.37));
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.67, 0.52, 0.64) + vec3(0.09, 0.06, 0.09);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.57)) * 100.0) - 0.5) * 0.04;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(1.030, 0.970, 0.927) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
