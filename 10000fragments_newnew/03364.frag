uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.31);
    float gsh = hash21(vec2(grow, floor(t * 6.98))) - 0.5;
    float gx = p.x + gsh * 0.68;
    v = sin(gx * 12.21 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.48));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.29;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 20.22 - t * 1.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = sin(p * 2.66 + time * 1.77) * 1.30;
	p *= 2.74;
	{ float fr = length(p); p *= 1.0 + 0.26 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.74);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.16 + time * 0.20, vec3(0.51, 0.52, 0.49), vec3(0.43, 0.48, 0.35), vec3(0.78, 1.12, 0.89), vec3(0.66, 0.22, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
