uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.53);
    float gsh = hash21(vec2(grow, floor(t * 4.79))) - 0.5;
    float gx = p.x + gsh * 0.92;
    v = sin(gx * 7.05 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.64));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 4.96 * sin(t * 1.02) + t * 3.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.39;
	p = (floor(p * 29.7) + 0.5) / 29.7;
	p = rot2(length(p) * -1.38 + time * 0.42) * p;
	{ p = vec2(atan(p.y, p.x) * 1.16, length(p) * 5.67 - time * 0.25); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.39);
	float d = d1 * d2;
	vec3 col = palette(d * 1.09 + time * 0.17, vec3(0.41, 0.42, 0.52), vec3(0.47, 0.43, 0.41), vec3(1.02, 0.79, 1.29), vec3(0.58, 0.91, 0.38));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
