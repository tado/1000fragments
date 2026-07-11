uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.18);
    float gsh = hash21(vec2(grow, floor(t * 3.44))) - 0.5;
    float gx = p.x + gsh * 0.79;
    v = sin(gx * 15.87 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.05));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.23) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 2.13 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 8.26 - t * 6.06 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 15.12 - t * 6.83 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = rot2(1.13) * q3;
	q3 = rot2(time * 0.96) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d3 = fieldC(q3, time, 0.54);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.89));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.11, 0.22), vec3(1.00, 0.84, 0.96), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
