uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 38.60 - t * 1.40 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 33.15 - t * 1.40 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.64;
	p = rot2(length(p) * -1.89 + time * 1.11) * p;
	p = rot2(p.y * -1.01 + time * 0.69) * p;
	{ p = vec2(atan(p.y, p.x) * 1.46, length(p) * 3.82 - time * 0.67); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.28, vec3(0.43, 0.57, 0.44), vec3(0.35, 0.42, 0.46), vec3(1.33, 1.29, 1.27), vec3(0.01, 0.84, 0.74));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
