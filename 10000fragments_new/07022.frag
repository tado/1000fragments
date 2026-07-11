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
    float grow = floor(p.y * 10.47);
    float gsh = hash21(vec2(grow, floor(t * 4.69))) - 0.5;
    float gx = p.x + gsh * 0.79;
    v = sin(gx * 18.97 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.17));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 32.68 - t * 5.11 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 33.57 - t * 1.16 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.06;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.56; p = rot2(0.39) * p; }
	p = fract(p * 2.23) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.26);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.52 + time * 0.27, vec3(0.40, 0.53, 0.45), vec3(0.39, 0.47, 0.40), vec3(1.01, 1.19, 1.03), vec3(0.45, 0.55, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
