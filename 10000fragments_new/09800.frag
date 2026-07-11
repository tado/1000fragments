uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.41 + 0.38 * sin(t * 1.35)) + vec2(-0.79, 0.04) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.38, 0.0)) * 8.47 - t * 3.54 + ph);
    float mb = sin(length(p + vec2(0.38, 0.0)) * 31.26 - t * 1.30 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.33;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.31;
	q1 = rot2(length(q1) * 1.55 + time * 1.09) * q1;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.24, lr * 1.36 + time * -0.76); }
	q2 = (floor(q2 * 18.5) + 0.5) / 18.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.70);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.94 + time * 0.68);
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 1.84 + time * 6.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
