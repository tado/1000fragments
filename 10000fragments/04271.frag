uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 13.87 - t * 1.80 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 32.96 - t * 1.80 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.73;
	p = rot2(0.62) * p;
	p = fract(p * 2.46) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.09, vec3(0.41, 0.40, 0.56), vec3(0.48, 0.49, 0.49), vec3(1.14, 1.21, 0.94), vec3(0.86, 0.68, 0.01));
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
