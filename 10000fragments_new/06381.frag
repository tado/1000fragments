uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.00) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 2.54 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.62 + sr * 8.68 - t * 3.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.48);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.31, 0.82, 0.75) * (0.20 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= 0.83 + 0.12 * sin(gl_FragCoord.y * 2.68 + time * 8.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
