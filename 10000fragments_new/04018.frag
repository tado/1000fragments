uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.20);
    float gsh = hash21(vec2(grow, floor(t * 2.00))) - 0.5;
    float gx = p.x + gsh * 0.94;
    v = sin(gx * 19.91 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.07));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.89 + 0.25 * sin(t * 0.75)) + vec2(-0.44, 0.17) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 17; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 17.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.92 + t * 0.91 + ph) + sin(p.y * 5.29 - t * 0.91 + ph)
        + sin((p.x + p.y) * 8.61 + t * 0.91 + ph) + sin(length(p) * 3.97 - t * 0.91 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 *= 1.85;
	q3 += vec2(-0.94, 0.80) * sin(length(q3) * 2.99 - time * 0.96) * 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.61);
	float d3 = fieldC(q3, time, 1.30);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.79 + time * 0.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
