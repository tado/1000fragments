uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.94 + t * 0.72 + ph) + sin(p.y * 14.64 - t * 1.18 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.46 * sin(mf + 3.0) + ph), cos(t * 2.35 * cos(mf + 3.0) + ph));
        ms += 0.082 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(time * -0.33) * q2;
	q2 = rot2(q2.y * -2.08 + time * 0.44) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.28);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.78 + time * 0.09, vec3(0.56, 0.56, 0.49), vec3(0.49, 0.38, 0.36), vec3(0.86, 0.90, 0.99), vec3(0.48, 0.78, 0.19));
	col *= 0.89 + 0.14 * sin(gl_FragCoord.y * 2.69 + time * 13.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
