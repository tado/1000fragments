uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.91 + 0.48 * sin(t * 1.31)) + vec2(-0.80, 0.06) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 23; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 23.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.64 - t * 1.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 2.61 + time * 1.62) * 1.22;
	{ float fr = length(q1); q1 *= 1.0 + -0.44 * fr * fr; }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.88));
	q2 = sin(q2 * 1.48 + time * 2.45) * 1.14;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.58);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.69, 0.24, 0.59) * (0.10 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
