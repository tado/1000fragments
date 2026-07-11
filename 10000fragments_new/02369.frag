uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 7.58 * sin(t * 1.12) + t * 4.19 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.47 - t * 8.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.56; p = rot2(2.58) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.82 + time * 0.26, vec3(0.57, 0.53, 0.49), vec3(0.32, 0.34, 0.46), vec3(1.10, 1.38, 1.00), vec3(0.24, 0.31, 0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
