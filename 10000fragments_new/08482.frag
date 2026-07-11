uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.81 + 0.20 * sin(t * 0.53)) + vec2(-0.32, -0.05) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 18; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 18.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 21.79 - t * 1.15 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 39.84 - t * 2.73 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 27.9) + 0.5) / 27.9;
	q2 *= 2.62;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.24);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.56 + time * 0.08, vec3(0.56, 0.59, 0.55), vec3(0.41, 0.41, 0.34), vec3(1.21, 0.81, 0.79), vec3(1.00, 0.13, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
