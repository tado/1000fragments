uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.49 + t * 3.83 + ph) + sin(p.y * 8.16 - t * 5.32 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.12 - t * 7.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	p = fract(p * 1.63) - 0.5;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.13; p = rot2(1.86) * p; }
	p += vec2(0.27, -0.53) * sin(length(p) * 2.88 - time * 0.69) * 0.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.92);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.62 + time * 0.27, vec3(0.60, 0.52, 0.57), vec3(0.33, 0.37, 0.39), vec3(1.32, 0.74, 1.30), vec3(0.03, 0.14, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
