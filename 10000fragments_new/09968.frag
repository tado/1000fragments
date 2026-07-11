uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.91 - t * 6.20 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.87 + 0.16 * sin(t * 1.28)) + vec2(-0.65, -0.04) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 18; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 18.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.30; q1 = rot2(2.19) * q1; }
	q1 = abs(q1) - 0.27;
	q2 = fract(q2 * 1.97) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.54);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.46 + time * 0.35, vec3(0.40, 0.46, 0.50), vec3(0.48, 0.37, 0.32), vec3(1.29, 1.18, 0.72), vec3(0.22, 0.82, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
