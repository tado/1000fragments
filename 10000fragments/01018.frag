uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 20.05 - t * 5.75 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 34.58 - t * 5.75 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 1.72 + time * 0.53) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.12, vec3(0.46, 0.41, 0.57), vec3(0.32, 0.39, 0.36), vec3(0.85, 0.73, 1.34), vec3(0.44, 0.73, 0.72));
	col = clamp((col - 0.5) * 2.16 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
