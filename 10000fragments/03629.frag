uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 12.86 - t * 2.29 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 35.20 - t * 2.29 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.37 + time * 0.74) * p;
	p = fract(p * 2.96) - 0.5;
	p = rot2(1.99) * p;
	p *= 1.92;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.29, vec3(0.58, 0.59, 0.58), vec3(0.48, 0.47, 0.42), vec3(0.71, 1.17, 0.97), vec3(0.89, 0.81, 0.07));
	col = fract(col * 2.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
