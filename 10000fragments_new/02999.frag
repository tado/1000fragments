uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.77;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.29)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 10.20 - t * 2.50 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.28 + t * 0.52 + ph) + sin(p.y * 7.44 - t * 0.52 + ph)
        + sin((p.x + p.y) * 11.79 + t * 0.52 + ph) + sin(length(p) * 3.77 - t * 0.52 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.27) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.08);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.89 + time * 0.03, vec3(0.48, 0.46, 0.48), vec3(0.37, 0.42, 0.45), vec3(1.27, 1.15, 1.16), vec3(0.32, 0.39, 0.63));
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 2.27 + time * 17.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
