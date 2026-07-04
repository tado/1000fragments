uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.92; vec2 jc = vec2(0.07 + 0.3 * sin(t * 1.53 + ph), -0.38 + 0.3 * cos(t * 1.00 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 36.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 30.07 - t * 7.96 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 14.48 - t * 3.90 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.82 + 0.41 * sin(t * 0.92)) + vec2(-0.40, 0.02) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.56));
	{ float fr = length(q3); q3 *= 1.0 + -0.40 * fr * fr; }
	q3 = abs(q3) - 0.60;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.77);
	float d3 = fieldC(q3, time, 1.88);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = vec3(0.26, 0.35, 0.87) * (0.14 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
