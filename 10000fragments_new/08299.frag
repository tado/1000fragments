uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.54) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 3.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.39 + sin(p.y * 5.70 + t * 5.47) * 4.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 6.9) + 0.5) / 6.9;
	q1 = abs(q1);
	{ q2 = vec2(atan(q2.y, q2.x) * 2.64, length(q2) * 5.94 - time * 0.59); }
	q2 += vec2(0.62, -0.26) * sin(length(q2) * 3.00 - time * 2.18) * 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.33);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.60 + time * 0.08);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.23 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
