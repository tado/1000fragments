uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.65 - t * 6.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	p = rot2(p.y * -3.17 + time * 0.79) * p;
	p = fract(p * 1.26) - 0.5;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.24; p = rot2(2.06) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.86, length(p) * 2.63 - time * 0.57); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.09, vec3(0.43, 0.52, 0.48), vec3(0.33, 0.32, 0.31), vec3(1.13, 1.40, 1.34), vec3(0.21, 0.53, 0.31));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
