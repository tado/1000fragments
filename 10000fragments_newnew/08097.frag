uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.45);
    float gsh = hash21(vec2(grow, floor(t * 3.17))) - 0.5;
    float gx = p.x + gsh * 0.39;
    v = sin(gx * 7.11 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.04));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.79;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.95 - t * 2.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.15;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.37; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.96);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.48));
	vec3 col = palette(d * 0.80 + time * 0.17, vec3(0.44, 0.40, 0.45), vec3(0.30, 0.46, 0.40), vec3(0.97, 1.00, 0.97), vec3(0.82, 0.62, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
