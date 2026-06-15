uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 26.19 - t * 7.47 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 11.50 - t * 7.47 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.89;
	p = fract(p * 2.03) - 0.5;
	p = rot2(length(p) * -3.70 + time * 0.36) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.28, vec3(0.57, 0.49, 0.50), vec3(0.44, 0.39, 0.34), vec3(1.36, 1.22, 1.09), vec3(0.09, 0.11, 0.60));
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
