uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 23.31 - t * 1.99 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 34.46 - t * 1.99 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.27, 0.30) * sin(length(p) * 2.92 - time * 1.58) * 0.37;
	p = rot2(1.20) * p;
	p = rot2(p.y * 2.53 + time * 0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.02, vec3(0.54, 0.44, 0.58), vec3(0.31, 0.45, 0.41), vec3(1.29, 1.09, 1.35), vec3(0.80, 0.60, 0.70));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
