uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.13) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 2.46 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 9.42 - t * 6.03 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 12.55 - t * 2.40 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	vec2 q1 = p; vec2 q2 = p;
	q2.y += sin(q2.x * 2.26 + time * 1.09) * 0.22;
	q2 = abs(q2) - 0.43;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.91);
	float d = d1 * d2;
	vec3 col = vec3(0.90, 0.86, 0.45) * (0.12 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
