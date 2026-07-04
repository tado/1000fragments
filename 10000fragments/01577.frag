uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.72;
    v = 0.5 * (sin(6.0 * cp.x + t * 2.64) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 1.83) * sin(6.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.26 + t * 3.44 + ph) + sin(p.y * 8.31 - t * 0.72 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.50;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 += vec2(-0.50, -0.63) * sin(length(q2) * 4.66 - time * 1.92) * 0.29;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.90);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.97));
	vec3 col = vec3(0.18, 0.99, 0.45) * (0.08 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
