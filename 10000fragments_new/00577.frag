uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.58);
    float gsh = hash21(vec2(grow, floor(t * 6.12))) - 0.5;
    float gx = p.x + gsh * 0.62;
    v = sin(gx * 17.62 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.26));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 17.64 - t * 7.41 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 34.62 - t * 7.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.21, length(q2) * 5.12 - time * 0.40); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.53 + time * 0.10, vec3(0.56, 0.47, 0.59), vec3(0.46, 0.46, 0.30), vec3(1.07, 0.88, 1.00), vec3(0.23, 0.68, 0.91));
	col = clamp((col - 0.5) * 2.07 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
