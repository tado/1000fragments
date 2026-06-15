uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 22.71 - t * 3.60 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 21.02 - t * 3.60 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p = rot2(time * -0.81) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.18, vec3(0.42, 0.51, 0.44), vec3(0.30, 0.47, 0.42), vec3(0.87, 0.72, 0.77), vec3(0.64, 0.10, 0.71));
	col = fract(col * 1.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
