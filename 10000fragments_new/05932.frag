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
    float grow = floor(p.y * 16.51);
    float gsh = hash21(vec2(grow, floor(t * 3.11))) - 0.5;
    float gx = p.x + gsh * 1.06;
    v = sin(gx * 8.02 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.13));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.83);
    float gsh = hash21(vec2(grow, floor(t * 6.22))) - 0.5;
    float gx = p.x + gsh * 1.07;
    v = sin(gx * 11.48 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.39));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.89;
	p = (floor(p * 13.8) + 0.5) / 13.8;
	p = rot2(p.y * -1.82 + time * 0.23) * p;
	p += vec2(0.44, -0.93) * sin(length(p) * 3.99 - time * 1.86) * 0.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.01 + time * 0.04, vec3(0.46, 0.41, 0.50), vec3(0.44, 0.43, 0.36), vec3(1.06, 1.20, 1.38), vec3(0.24, 0.54, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
