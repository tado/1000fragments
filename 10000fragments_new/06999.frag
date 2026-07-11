uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.05);
    float gsh = hash21(vec2(grow, floor(t * 6.13))) - 0.5;
    float gx = p.x + gsh * 0.83;
    v = sin(gx * 11.85 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.95));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.25;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.82)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 26.42 - t * 6.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.41);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.63 + time * 0.25, vec3(0.57, 0.48, 0.53), vec3(0.38, 0.43, 0.40), vec3(1.22, 1.38, 0.92), vec3(0.17, 0.81, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
