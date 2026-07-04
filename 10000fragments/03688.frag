uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.81 + ga * 2.0 - t * 1.84 + ph);
    v = arm * exp(-gr * 0.52);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.43 + sin(p.y * 4.90 + t * 3.45) * 3.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 1.09 + time * 0.71) * q1;
	q1 *= 2.33;
	q2 = rot2(time * 0.73) * q2;
	q2 = (floor(q2 * 24.8) + 0.5) / 24.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.32);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.55));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.41, 0.93, 1.44) + vec3(0.21, 0.00, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
