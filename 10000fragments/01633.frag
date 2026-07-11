uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.12 - t * 7.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(1.05) * p; }
	p += vec2(0.84, -0.45) * sin(length(p) * 5.60 - time * 1.34) * 0.18;
	p = fract(p * 2.19) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.33, length(p) * 4.72 - time * 0.28); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.15, 0.21), vec3(0.64, 0.57, 0.52), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
