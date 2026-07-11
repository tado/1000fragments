uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 30.32 - t * 2.82 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 38.26 - t * 2.82 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.51, 0.86) * sin(length(p) * 5.04 - time * 1.42) * 0.14;
	p = rot2(length(p) * 1.75 + time * 1.07) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.10, vec3(0.59, 0.50, 0.59), vec3(0.49, 0.33, 0.30), vec3(1.01, 1.30, 1.37), vec3(0.57, 0.67, 0.78));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
