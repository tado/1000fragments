uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.45 + 0.30 * sin(t * 0.53)) + vec2(-0.31, 0.21) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 25; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 25.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.39 + sin(p.y * 5.33 + t * 2.55) * 4.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.02);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.72 + time * 0.23, vec3(0.53, 0.46, 0.52), vec3(0.39, 0.32, 0.50), vec3(1.10, 1.22, 0.86), vec3(0.68, 0.68, 0.68));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
