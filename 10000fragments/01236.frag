uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 24.03 - t * 3.46 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 10.01 - t * 3.46 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.09;
	p = rot2(1.03) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.26, vec3(0.41, 0.42, 0.59), vec3(0.39, 0.44, 0.41), vec3(0.73, 1.12, 0.96), vec3(0.65, 0.32, 0.34));
	col = clamp((col - 0.5) * 2.03 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
