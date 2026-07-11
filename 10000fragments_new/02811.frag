uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.40 + sr * 8.64 - t * 2.69 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 2.89 * sin(t * 1.43) + t * 2.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.60;
	p = (floor(p * 14.4) + 0.5) / 14.4;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.48; p = rot2(2.12) * p; }
	p = rot2(length(p) * -2.79 + time * 0.71) * p;
	p *= 2.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.94);
	float d = d1 + d2;
	vec3 col = palette(d * 0.98 + time * 0.23, vec3(0.53, 0.50, 0.45), vec3(0.32, 0.33, 0.33), vec3(1.26, 0.82, 1.24), vec3(0.29, 0.19, 0.54));
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
