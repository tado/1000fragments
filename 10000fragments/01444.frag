uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.91 - t * 3.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.61;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.50; p = rot2(1.34) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.28, vec3(0.42, 0.56, 0.55), vec3(0.45, 0.43, 0.37), vec3(1.09, 0.84, 1.36), vec3(0.38, 0.93, 0.15));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
