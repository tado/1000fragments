uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 24.29 - t * 7.32 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 23.49 - t * 7.32 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	{ p = vec2(atan(p.y, p.x) * 1.00, length(p) * 2.30 - time * 0.11); }
	p = rot2(time * 0.71) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.40; p = rot2(1.42) * p; }
	p = fract(p * 1.37) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.11, vec3(0.41, 0.52, 0.60), vec3(0.37, 0.47, 0.42), vec3(1.24, 0.82, 1.30), vec3(0.33, 0.31, 0.84));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
