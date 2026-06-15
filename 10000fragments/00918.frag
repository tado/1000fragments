uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.93 - t * 8.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	p = rot2(time * 1.25) * p;
	p = fract(p * 1.15) - 0.5;
	p = rot2(length(p) * 1.86 + time * 0.63) * p;
	{ float fr = length(p); p *= 1.0 + 0.54 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.62 + time * 0.06, vec3(0.41, 0.56, 0.53), vec3(0.31, 0.48, 0.42), vec3(0.89, 1.07, 1.06), vec3(0.08, 0.74, 0.14));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
