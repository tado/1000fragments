uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.97 - t * 8.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.50;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.37; p = rot2(2.54) * p; }
	p = rot2(2.92) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.14, vec3(0.57, 0.58, 0.43), vec3(0.42, 0.48, 0.43), vec3(0.81, 1.32, 0.80), vec3(0.58, 0.97, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
