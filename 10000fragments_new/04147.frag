uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.29 - t * 3.13 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.84 + sr * 7.07 - t * 3.07 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.44 + 0.28 * sin(t * 1.16)) + vec2(-0.37, -0.13) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 31; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 31.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * 2.14 + time * 1.06) * q1;
	q1 = rot2(length(q1) * 1.76 + time * 0.75) * q1;
	q2.y += sin(q2.x * 5.07 + time * 3.73) * 0.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.09);
	float d3 = fieldC(q3, time, 1.74);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.53 + time * 0.21, vec3(0.59, 0.53, 0.46), vec3(0.47, 0.32, 0.37), vec3(0.75, 1.10, 1.40), vec3(0.01, 0.94, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
