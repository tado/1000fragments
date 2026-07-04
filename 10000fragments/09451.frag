uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.32 * vnoise2(p * 2.86 + t * 1.44);
    v = sin(wr * 10.27 - t * 2.29 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.44 + t * 2.95 + ph) + sin(p.y * 9.84 - t * 4.64 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.80 + 0.14 * sin(t * 0.68)) + vec2(-0.67, -0.17) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.49; }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.17, length(q2) * 3.33 - time * 0.43); }
	q3 = (floor(q3 * 16.6) + 0.5) / 16.6;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.51);
	float d3 = fieldC(q3, time, 1.73);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.49 + time * 0.04, vec3(0.45, 0.57, 0.49), vec3(0.43, 0.35, 0.42), vec3(1.13, 0.93, 0.93), vec3(0.21, 0.70, 0.88));
	col = fract(col * 1.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
