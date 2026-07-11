uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.56 + 0.30 * sin(t * 0.72)) + vec2(-0.33, 0.25) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.95 + vec2(t * 2.41, -t * 2.08) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.84) * q1;
	{ float fr = length(q1); q1 *= 1.0 + -0.56 * fr * fr; }
	q2 *= 1.55;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.13, length(q2) * 5.18 - time * 0.90); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.60);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.36 + time * 0.01, vec3(0.55, 0.55, 0.49), vec3(0.50, 0.32, 0.36), vec3(1.13, 1.34, 1.08), vec3(0.18, 0.30, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
