uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.69);
    float gsh = hash21(vec2(grow, floor(t * 7.52))) - 0.5;
    float gx = p.x + gsh * 0.57;
    v = sin(gx * 18.37 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.53));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.59) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 3.69 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.29 * sin(time * 3.20);
	q1 += vec2(-0.17, -0.15) * sin(length(q1) * 4.43 - time * 2.30) * 0.30;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 2.29));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.68);
	float d = d1 * d2;
	vec3 col = vec3(0.33, 0.60, 0.72) * (0.24 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
