uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 39.31 - t * 4.24 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 34.01 - t * 4.24 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -2.62 + time * 0.70) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.82, 0.73, 1.57) + vec3(0.19, 0.15, 0.16);
	col = fract(col * 1.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
